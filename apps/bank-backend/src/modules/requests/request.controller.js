const RequestService = require('../../services/request.service')
const RequestStatusMiddleware = require('../../middlewares/request-status.middleware')
const authMiddleware = require('../../middlewares/auth.middleware')
const roleMiddleware = require('../../middlewares/role.middleware')

class RequestController {
  static async getBankRequests(req, res) {
    try {
      const bankAdminUserId = req.user.userId
      const UserModel = require('../users/user.model')
      const bankAdmin = await UserModel.findById(bankAdminUserId)
      const bankId = bankAdmin?.bank_id
      if (!bankId) return res.status(400).json({ error: 'Bank admin user is not associated with a bank' })
      const requests = await RequestService.getPendingRequestsForBank(bankId)
      res.status(200).json({ message: 'Bank requests retrieved successfully', data: requests, count: requests.length })
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve bank requests', message: error.message })
    }
  }

  static async approveRequest(req, res) {
    try {
      const { id } = req.params
      const bankAdminUserId = req.user.userId
      const UserModel = require('../users/user.model')
      const bankAdmin = await UserModel.findById(bankAdminUserId)
      const bankId = bankAdmin?.bank_id
      if (!bankId) return res.status(400).json({ error: 'Bank admin user is not associated with a bank' })
      const result = await RequestService.approveRequest(Number(id), bankId)
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ error: 'Approval failed', message: error.message })
    }
  }

  static async rejectRequest(req, res) {
    try {
      const { id } = req.params
      const { reason } = req.body
      const bankAdminUserId = req.user.userId
      const UserModel = require('../users/user.model')
      const bankAdmin = await UserModel.findById(bankAdminUserId)
      const bankId = bankAdmin?.bank_id
      if (!bankId) return res.status(400).json({ error: 'Bank admin user is not associated with a bank' })
      const result = await RequestService.rejectRequest(Number(id), bankId, reason || null)
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ error: 'Rejection failed', message: error.message })
    }
  }
}

const express = require('express')
const router = express.Router()
router.get('/bank-requests', authMiddleware, roleMiddleware('BANK_ADMIN'), RequestController.getBankRequests)
router.put('/approve/:id', authMiddleware, roleMiddleware('BANK_ADMIN'), RequestStatusMiddleware.validateForApproval(), RequestController.approveRequest)
router.put('/reject/:id', authMiddleware, roleMiddleware('BANK_ADMIN'), RequestStatusMiddleware.validateForApproval(), RequestController.rejectRequest)
module.exports = router
