require('dotenv').config();
const PaymentService = require('../../services/payment.service')
const PaymentModel = require('./payment.model');

class PaymentController {
  static async createPaymentIntent(req, res) {
    try {
      const { request_id, amount, bank_id } = req.body
      const userId = req.user.userId

      if (!request_id || !amount) {
        return res.status(400).json({
          error: 'Request ID and amount are required'
        })
      }

      const numericAmount = Number(amount)
      if (isNaN(numericAmount) || numericAmount <= 0) {
        return res.status(400).json({
          error: 'Amount must be a positive number'
        })
      }

      if (!Number.isInteger(Number(request_id)) || Number(request_id) <= 0) {
        return res.status(400).json({
          error: 'Valid request ID is required'
        })
      }

      if (bank_id && (!Number.isInteger(Number(bank_id)) || Number(bank_id) <= 0)) {
        return res.status(400).json({
          error: 'Valid bank ID is required'
        })
      }

      const RequestModel = require('../requests/request.model')
      const request = await RequestModel.findById(request_id)
      if (!request) {
        return res.status(404).json({
          error: 'Request not found'
        })
      }

      if (request.user_id !== userId) {
        return res.status(403).json({
          error: 'You can only create payments for your own requests'
        })
      }

      if (request.status !== 'APPROVED') {
        return res.status(400).json({
          error: `Cannot create payment for request with status: ${request.status}`,
          allowed_status: 'APPROVED'
        })
      }

      if (bank_id) {
        await RequestModel.updateStatus(request_id, 'PAYMENT_PENDING', parseInt(bank_id))
      } else if (request.bank_id) {
        await RequestModel.updateStatus(request_id, 'PAYMENT_PENDING')
      } else {
        return res.status(400).json({
          error: 'Bank selection is required before payment'
        })
      }

      const result = await PaymentService.createPaymentIntent(
        parseInt(request_id),
        userId,
        numericAmount,
        {
          user_email: req.user.email,
          created_at: new Date().toISOString(),
          bank_id: bank_id || request.bank_id
        }
      )

      res.status(201).json({
        message: 'Payment intent created successfully',
        data: {
          payment_id: result.payment_record.id,
          client_secret: result.client_secret,
          amount: result.payment_record.amount,
          currency: result.payment_record.currency,
          status: result.payment_record.status,
          request_status_updated: 'PAYMENT_PENDING'
        }
      })

    } catch (error) {
      console.error('Create payment intent error:', error)
      res.status(500).json({
        error: 'Failed to create payment intent',
        message: error.message
      })
    }
  }

  static async confirmPayment(req, res) {
    try {
      const { payment_intent_id } = req.body

      if (!payment_intent_id) {
        return res.status(400).json({
          error: 'Payment intent ID is required'
        })
      }

      const confirmedPayment = await PaymentService.confirmPayment(payment_intent_id)

      if (confirmedPayment.status === 'COMPLETED') {
        await PaymentService.handleSuccessfulPayment(confirmedPayment)
      }

      res.status(200).json({
        message: 'Payment confirmed successfully',
        data: {
          payment_id: confirmedPayment.id,
          status: confirmedPayment.status,
          amount: confirmedPayment.amount,
          updated_at: confirmedPayment.updated_at,
          request_status: confirmedPayment.status === 'COMPLETED' ? 'PAID' : 'PAYMENT_PENDING'
        }
      })

    } catch (error) {
      console.error('Confirm payment error:', error)
      res.status(500).json({
        error: 'Failed to confirm payment',
        message: error.message
      })
    }
  }

  static async getPayment(req, res) {
    try {
      const { id } = req.params
      const userId = req.user.userId

      if (!id || isNaN(id)) {
        return res.status(400).json({
          error: 'Valid payment ID is required'
        })
      }

      const paymentDetails = await PaymentService.getPaymentDetails(parseInt(id))

      if (paymentDetails.payment.user_id !== userId) {
        return res.status(403).json({
          error: 'Access denied - not your payment'
        })
      }

      res.status(200).json({
        message: 'Payment details retrieved successfully',
        data: {
          payment: paymentDetails.payment,
          stripe_status: paymentDetails.stripe_data?.status || null
        }
      })

    } catch (error) {
      console.error('Get payment error:', error)
      res.status(500).json({
        error: 'Failed to retrieve payment details',
        message: error.message
      })
    }
  }

  static async getUserPayments(req, res) {
    try {
      const userId = req.user.userId
      const { status, limit = 20, offset = 0 } = req.query

      const payments = await PaymentModel.findByUserId(userId, {
        status: status || null,
        limit: parseInt(limit),
        offset: parseInt(offset)
      })

      const stats = await PaymentModel.getStatistics(userId)

      res.status(200).json({
        message: 'Payment history retrieved successfully',
        data: {
          payments: payments,
          statistics: stats,
          pagination: {
            limit: parseInt(limit),
            offset: parseInt(offset),
            total: payments.length
          }
        }
      })

    } catch (error) {
      console.error('Get user payments error:', error)
      res.status(500).json({
        error: 'Failed to retrieve payment history',
        message: error.message
      })
    }
  }

  static async handleWebhook(req, res) {
    try {
      const sig = req.headers['stripe-signature']
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

      if (!webhookSecret) {
        console.error('Stripe webhook secret not configured')
        return res.status(500).json({ error: 'Webhook configuration error' })
      }

      let event
      try {
        event = PaymentService.verifyWebhookSignature(req.body, sig, webhookSecret)
      } catch (err) {
        console.error('Webhook signature verification failed:', err)
        return res.status(400).json({ error: 'Invalid signature' })
      }

      const result = await PaymentService.handleWebhook(event)

      res.status(200).json(result)

    } catch (error) {
      console.error('Webhook handling error:', error)
      res.status(500).json({
        error: 'Webhook processing failed',
        message: error.message
      })
    }
  }

  static async refundPayment(req, res) {
    try {
      const { payment_id, amount } = req.body

      if (!payment_id) {
        return res.status(400).json({
          error: 'Payment ID is required'
        })
      }

      const refundResult = await PaymentService.refundPayment(
        payment_id,
        amount ? Number(amount) : null
      )

      res.status(200).json({
        message: 'Payment refunded successfully',
        data: {
          refund_id: refundResult.refund.id,
          amount_refunded: refundResult.refund.amount / 100,
          payment_status: refundResult.updated_payment.status
        }
      })

    } catch (error) {
      console.error('Refund payment error:', error)
      res.status(500).json({
        error: 'Failed to process refund',
        message: error.message
      })
    }
  }

  static async initiate(req, res) {
    try {
      const { request_id } = req.body
      const userId = req.user.userId
      if (!request_id || isNaN(request_id)) return res.status(400).json({ error: 'Valid request ID is required' })
      const result = await PaymentService.initiatePayment(Number(request_id), userId)
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ error: 'Payment initiation failed', message: error.message })
    }
  }

  static async confirm(req, res) {
    try {
      const { request_id, amount } = req.body
      const userId = req.user.userId
      if (!request_id || isNaN(request_id)) return res.status(400).json({ error: 'Valid request ID is required' })
      const result = await PaymentService.confirmPaymentSimplified(Number(request_id), userId, amount || null)
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ error: 'Payment confirmation failed', message: error.message })
    }
  }
}

module.exports = PaymentController
