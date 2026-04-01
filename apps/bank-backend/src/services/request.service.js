const { transaction } = require('../utils/db.utils')
const RequestModel = require('../modules/requests/request.model')
const InventoryService = require('./inventory.service')
const NotificationService = require('./notification.service')
const OrderNumberGenerator = require('../utils/order-number.utils')

class RequestService {
  static async approveRequest(requestId, bankId) {
    try {
      const request = await RequestModel.findById(requestId)
      if (!request) throw new Error('Request not found')
      if (request.status !== 'SENT_TO_BANK') throw new Error(`Request is already ${request.status}`)
      if (request.bank_id && request.bank_id !== bankId) throw new Error('Request does not belong to this bank')
      const availability = await InventoryService.checkAvailability(bankId, request.blood_type, request.quantity)
      if (!availability.canFulfill) throw new Error(`Insufficient inventory: ${availability.message}`)
      
      // Generate unique order number using the proper generator
      let orderNumber = OrderNumberGenerator.generate()
      let isUnique = false
      let attempts = 0
      const maxAttempts = 10
      
      while (!isUnique && attempts < maxAttempts) {
        const existingCheck = await RequestModel.findByOrderNumber(orderNumber)
        if (!existingCheck) {
          isUnique = true
        } else {
          orderNumber = OrderNumberGenerator.generate()
          attempts++
        }
      }
      
      if (!isUnique) {
        throw new Error('Failed to generate unique order number')
      }
      const queries = [
        {
          text: `
            UPDATE requests 
            SET status = 'APPROVED', bank_id = $1, order_number = $2, updated_at = CURRENT_TIMESTAMP
            WHERE id = $3 AND status = 'SENT_TO_BANK'
            RETURNING *
          `,
          params: [bankId, orderNumber, requestId]
        },
        {
          text: `
            UPDATE blood_inventory 
            SET quantity = quantity - $1, updated_at = CURRENT_TIMESTAMP
            WHERE bank_id = $2 AND blood_type = $3
            RETURNING *
          `,
          params: [request.quantity, bankId, request.blood_type]
        }
      ]
      const results = await transaction(queries)
      const updatedRequest = results[0].rows[0]
      if (!updatedRequest) throw new Error('Request could not be approved - may have been processed already')
      const updatedInventory = results[1].rows[0]
      try {
        await NotificationService.createApprovalNotification(
          request.user_id,
          requestId,
          orderNumber,
          { blood_type: request.blood_type, quantity: request.quantity }
        )
      } catch {}
      return { request: updatedRequest, inventory: updatedInventory, order_number: orderNumber, message: 'Request approved successfully' }
    } catch (error) {
      throw new Error(`Approval failed: ${error.message}`)
    }
  }

  static async rejectRequest(requestId, bankId, reason = null) {
    try {
      const request = await RequestModel.findById(requestId)
      if (!request) throw new Error('Request not found')
      if (request.status !== 'SENT_TO_BANK') throw new Error(`Request is already ${request.status}`)
      if (request.bank_id && request.bank_id !== bankId) throw new Error('Request does not belong to this bank')
      
      // Validate rejection reason is provided
      const rejectionReason = reason || 'Invalid documents'
      
      const queries = [
        {
          text: `
            UPDATE requests
            SET status = 'REJECTED', bank_id = $1, rejection_reason = $2, updated_at = CURRENT_TIMESTAMP
            WHERE id = $3 AND status = 'SENT_TO_BANK'
            RETURNING *
          `,
          params: [bankId, rejectionReason, requestId]
        }
      ]
      const results = await transaction(queries)
      const updatedRequest = results[0].rows[0]
      if (!updatedRequest) throw new Error('Request could not be rejected - may have been processed already')
      try {
        await NotificationService.createRejectionNotification(
          request.user_id,
          requestId,
          rejectionReason,
          { blood_type: request.blood_type, quantity: request.quantity }
        )
      } catch {}
      return { request: updatedRequest, reason: rejectionReason, message: 'Request rejected successfully' }
    } catch (error) {
      throw new Error(`Rejection failed: ${error.message}`)
    }
  }

  static async getPendingRequestsForBank(bankId) {
    try {
      return await RequestModel.findPendingByBankId(bankId)
    } catch (error) {
      throw new Error(`Failed to retrieve pending requests: ${error.message}`)
    }
  }
}

module.exports = RequestService
