const RequestModel = require('./request.model')
const UserModel = require('../users/user.model')
const NotificationService = require('../../services/notification.service')

class RequestController {
  static async create(req, res) {
    try {
      const { blood_type, quantity, governorate, city, patient_name, reason } = req.body
      const userId = req.user.userId
      const requestData = {
        user_id: userId,
        blood_type: blood_type?.toUpperCase(),
        quantity: Number(quantity),
        governorate,
        city,
        patient_name,
        reason
      }
      const newRequest = await RequestModel.create(requestData)
      let rankedBanks = []
      try {
        const BankSearchService = require('../../services/bank-search.service')
        const searchResults = await BankSearchService.searchBanks({
          blood_type: newRequest.blood_type,
          quantity: newRequest.quantity,
          governorate: newRequest.governorate,
          city: newRequest.city
        })
        rankedBanks = searchResults.banks || []
      } catch {}
      res.status(201).json({
        message: 'Blood request created successfully',
        data: {
          id: newRequest.id,
          blood_type: newRequest.blood_type,
          quantity: newRequest.quantity,
          governorate: newRequest.governorate,
          city: newRequest.city,
          patient_name: newRequest.patient_name,
          reason: newRequest.reason,
          status: newRequest.status
        },
        banks: rankedBanks.map(b => ({
          id: b.id,
          name: b.name,
          governorate: b.governorate,
          city: b.city,
          blood_type: newRequest.blood_type,
          requested_quantity: newRequest.quantity,
          available_quantity: b.available_quantity ?? 0,
          availability_status: b.availability_status,
          priority_level: b.priority_level
        }))
      })
    } catch (error) {
      res.status(500).json({ error: 'Internal server error', message: error.message })
    }
  }

  static async uploadDocuments(req, res) {
    try {
      const { id } = req.params
      const userId = req.user.userId
      const { national_id_image, medical_proof_image } = req.files || {}
      if (!id || isNaN(id)) return res.status(400).json({ error: 'Valid request ID is required' })
      const request = await RequestModel.findById(id)
      if (!request) return res.status(404).json({ error: 'Request not found' })
      if (request.user_id !== userId && req.user.role !== 'SUPER_ADMIN') return res.status(403).json({ error: 'You can only upload documents for your own requests' })
      if (!national_id_image || !medical_proof_image) return res.status(400).json({ error: 'Both national ID and medical proof documents are required' })
      const documentData = {
        national_id_image_url: `/uploads/documents/${national_id_image[0].filename}`,
        medical_proof_image_url: `/uploads/documents/${medical_proof_image[0].filename}`
      }
      await RequestModel.updateWithDocuments(id, documentData)
      const createdStatusRequest = await RequestModel.updateStatus(id, 'CREATED')
      res.status(200).json({
        message: 'Documents uploaded successfully',
        data: {
          request_id: createdStatusRequest.id,
          national_id_image_url: createdStatusRequest.national_id_image_url,
          medical_proof_image_url: createdStatusRequest.medical_proof_image_url,
          status: createdStatusRequest.status
        }
      })
    } catch (error) {
      res.status(500).json({ error: 'Document upload failed', message: error.message })
    }
  }

  static async sendToBank(req, res) {
    try {
      const { id } = req.params
      const { bank_id } = req.body
      const userId = req.user.userId
      if (!id || isNaN(id)) return res.status(400).json({ error: 'Valid request ID is required' })
      if (!bank_id || isNaN(bank_id)) return res.status(400).json({ error: 'Valid bank ID is required' })
      const request = await RequestModel.findById(id)
      if (!request) return res.status(404).json({ error: 'Request not found' })
      if (request.user_id !== userId && req.user.role !== 'SUPER_ADMIN') return res.status(403).json({ error: 'You can only send your own requests to bank' })
      if (!request.national_id_image_url || !request.medical_proof_image_url) return res.status(400).json({ error: 'Request must have both national ID and medical proof documents before sending to bank' })
      const InventoryService = require('../../services/inventory.service')
      const availability = await InventoryService.checkAvailability(Number(bank_id), request.blood_type, request.quantity)
      if (!availability.canFulfill) {
        try {
          const BankSearchService = require('../../services/bank-search.service')
          const searchResults = await BankSearchService.searchBanks({
            blood_type: request.blood_type,
            quantity: request.quantity,
            governorate: request.governorate,
            city: request.city
          })
          const alternativeBanks = (searchResults.banks || [])
            .filter(b => b.id !== Number(bank_id))
            .filter(b => b.availability_status !== 'NOT_AVAILABLE')
            .map(b => ({
              id: b.id,
              name: b.name,
              governorate: b.governorate,
              city: b.city,
              blood_type: request.blood_type,
              requested_quantity: request.quantity,
              available_quantity: b.available_quantity ?? 0,
              availability_status: b.availability_status,
              priority_level: b.priority_level
            }))
          return res.status(400).json({
            error: 'Selected bank does not have the required blood type. Please choose another bank.',
            alternatives: alternativeBanks
          })
        } catch {
          return res.status(400).json({
            error: 'Selected bank does not have the required blood type. Please choose another bank.',
            alternatives: []
          })
        }
      }
      const updatedRequest = await RequestModel.sendToBank(id, bank_id)
      if (!updatedRequest) return res.status(400).json({ error: 'Could not send request to bank. Request may already be in a different status.' })
      
      // Notify user that request was sent to bank
      try {
        await NotificationService.createRequestSentToBankUserNotification(
          request.user_id,
          request.id,
          { blood_type: request.blood_type, quantity: request.quantity }
        )
      } catch {}
      
      // Notify bank admin about new request
      try {
        const bankAdmin = await UserModel.findByBankId(Number(bank_id))
        if (bankAdmin) {
          await NotificationService.createNewRequestForBankAdminNotification(
            bankAdmin.id,
            request.id,
            { 
              blood_type: request.blood_type, 
              quantity: request.quantity,
              patient_name: request.patient_name,
              governorate: request.governorate,
              city: request.city
            }
          )
        }
      } catch {}
      res.status(200).json({
        message: 'Request sent to bank successfully',
        data: {
          request: updatedRequest,
          status_updated: 'SENT_TO_BANK'
        }
      })
    } catch (error) {
      res.status(500).json({ error: 'Failed to send request to bank', message: error.message })
    }
  }

  static async getUserRequests(req, res) {
    try {
      const userId = req.user.userId
      const requests = await RequestModel.findByUserId(userId)
      res.status(200).json({ message: 'User requests retrieved successfully', data: requests, count: requests.length })
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user requests', message: error.message })
    }
  }
}

module.exports = RequestController
