const express = require('express')
const authMiddleware = require('../../middlewares/auth.middleware')
const roleMiddleware = require('../../middlewares/role.middleware')
const PaymentController = require('./payment.controller')

const router = express.Router()

router.post('/create', authMiddleware, PaymentController.createPaymentIntent)
router.post('/confirm', authMiddleware, PaymentController.confirmPayment)
router.get('/:id', authMiddleware, PaymentController.getPayment)
router.get('/', authMiddleware, PaymentController.getUserPayments)
router.post('/refund', authMiddleware, roleMiddleware('SUPER_ADMIN'), PaymentController.refundPayment)
router.post('/webhooks/stripe', express.raw({ type: 'application/json' }), PaymentController.handleWebhook)

router.post('/initiate', authMiddleware, PaymentController.initiate)
router.post('/confirm-simplified', authMiddleware, PaymentController.confirm)

module.exports = router
