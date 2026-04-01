const RequestModel = require('../modules/requests/request.model')
const UserModel = require('../modules/users/user.model')

// Valid status transitions for bank-service
const VALID_BANK_TRANSITIONS = {
  'SENT_TO_BANK': ['APPROVED', 'REJECTED']
}

/**
 * Validate status transition is allowed
 */
const isValidBankTransition = (currentStatus, newStatus) => {
  if (currentStatus === newStatus) return true
  const allowedTransitions = VALID_BANK_TRANSITIONS[currentStatus] || []
  return allowedTransitions.includes(newStatus)
}

class RequestStatusMiddleware {
  static validateForApproval() {
    return async (req, res, next) => {
      try {
        const { id } = req.params
        const bankAdminUserId = req.user.userId

        if (!id || isNaN(id)) {
          return res.status(400).json({ error: 'Valid request ID is required' })
        }

        const request = await RequestModel.findById(id)
        if (!request) {
          return res.status(404).json({ error: 'Request not found' })
        }

        // Validate current status is SENT_TO_BANK
        if (request.status !== 'SENT_TO_BANK') {
          return res.status(400).json({
            error: `Cannot approve/reject request with status: ${request.status}`,
            allowed_status: 'SENT_TO_BANK',
            current_status: request.status
          })
        }

        // Validate bank admin ownership
        const bankAdminUser = await UserModel.findById(bankAdminUserId)
        const adminBankId = bankAdminUser?.bank_id

        if (!adminBankId || request.bank_id !== adminBankId) {
          if (req.user.role !== 'SUPER_ADMIN') {
            return res.status(403).json({ error: 'You can only approve/reject requests for your assigned bank' })
          }
        }

        req.validatedRequest = request
        next()

      } catch (e) {
        return res.status(500).json({ error: 'Status validation failed', message: e.message })
      }
    }
  }

  static validateRejectionReason() {
    return async (req, res, next) => {
      try {
        const { reason } = req.body
        const { id } = req.params

        if (!id || isNaN(id)) {
          return res.status(400).json({ error: 'Valid request ID is required' })
        }

        // Only validate rejection reason for reject operations
        // Check if this is a reject request (can be determined by route or body flag)
        const isRejectOperation = req.path?.includes('reject') || req.body?.action === 'reject'

        if (isRejectOperation) {
          // Reason is recommended but not strictly required - default will be provided
          if (!reason || reason.trim().length === 0) {
            console.warn(`Rejecting request ${id} without a reason - will use default`)
          }

          // Validate reason length if provided
          if (reason && reason.trim().length > 500) {
            return res.status(400).json({
              error: 'Rejection reason too long',
              message: 'Rejection reason must be less than 500 characters'
            })
          }
        }

        next()

      } catch (e) {
        return res.status(500).json({ error: 'Rejection validation failed', message: e.message })
      }
    }
  }
}

module.exports = RequestStatusMiddleware
