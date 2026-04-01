require('dotenv').config();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PaymentModel = require('../modules/payments/payment.model');
const RequestModel = require('../modules/requests/request.model');
const NotificationService = require('./notification.service');

class PaymentService {
  static async createPaymentIntent(requestId, userId, amount, metadata = {}) {
    try {
      if (amount <= 0) {
        throw new Error('Amount must be greater than 0')
      }
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: 'usd',
        metadata: {
          request_id: requestId,
          user_id: userId,
          ...metadata
        },
        automatic_payment_methods: {
          enabled: true,
        },
      })

      const paymentData = {
        request_id: requestId,
        user_id: userId,
        amount: amount,
        currency: 'USD',
        status: 'PENDING',
        stripe_payment_intent_id: paymentIntent.id,
        client_secret: paymentIntent.client_secret
      }

      const paymentRecord = await PaymentModel.create(paymentData)

      return {
        payment_intent: paymentIntent,
        payment_record: paymentRecord,
        client_secret: paymentIntent.client_secret
      }

    } catch (error) {
      console.error('Error creating payment intent:', error)
      throw new Error(`Failed to create payment intent: ${error.message}`)
    }
  }

  static async confirmPayment(paymentIntentId) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
      const existingPayment = await PaymentModel.findByPaymentIntentId(paymentIntentId)

      if (!existingPayment) {
        throw new Error('Payment record not found')
      }

      const updatedPayment = await PaymentModel.updateStatus(
        existingPayment.id,
        this.mapStripeStatusToInternal(paymentIntent.status),
        {
          stripe_payment_intent_id: paymentIntent.id,
          stripe_payment_method_id: paymentIntent.payment_method,
          payment_method_type: paymentIntent.payment_method_types?.[0] || null
        }
      )

      if (!updatedPayment) {
        throw new Error('Payment update failed')
      }

      return updatedPayment

    } catch (error) {
      console.error('Error confirming payment:', error)
      throw new Error(`Failed to confirm payment: ${error.message}`)
    }
  }

  static async handleWebhook(event) {
    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntentSucceeded = event.data.object

          const completedPayment = await PaymentModel.updateFromStripeWebhook(
            paymentIntentSucceeded.id,
            'COMPLETED',
            {
              payment_method: paymentIntentSucceeded.payment_method,
              payment_method_type: paymentIntentSucceeded.payment_method_types?.[0]
            }
          )

          if (completedPayment) {
            await this.handleSuccessfulPayment(completedPayment)
          }

          return { success: true, message: 'Payment succeeded processed' }

        case 'payment_intent.payment_failed':
          const paymentIntentFailed = event.data.object

          const failedPayment = await PaymentModel.updateFromStripeWebhook(
            paymentIntentFailed.id,
            'FAILED',
            {
              payment_method: paymentIntentFailed.payment_method,
              payment_method_type: paymentIntentFailed.payment_method_types?.[0]
            }
          )

          console.error('Payment failed:', {
            payment_id: paymentIntentFailed.id,
            error: paymentIntentFailed.last_payment_error?.message
          })

          if (failedPayment && failedPayment.request_id) {
            const failureReason = paymentIntentFailed.last_payment_error?.message || 'Payment failed'
            await this.handlePaymentFailure(failedPayment.request_id, failureReason, failedPayment.id)
          }

          return { success: true, message: 'Payment failure processed' }

        case 'payment_intent.canceled':
          const paymentIntentCanceled = event.data.object

          await PaymentModel.updateFromStripeWebhook(
            paymentIntentCanceled.id,
            'CANCELLED',
            {}
          )

          return { success: true, message: 'Payment cancellation processed' }

        default:
          console.log(`Unhandled event type: ${event.type}`)
          return { success: true, message: 'Event not handled' }
      }

    } catch (error) {
      console.error('Error handling webhook:', error)
      throw new Error(`Webhook processing failed: ${error.message}`)
    }
  }

  static async handleSuccessfulPayment(payment) {
    try {
      const request = await RequestModel.findById(payment.request_id)
      if (!request) {
        throw new Error('Associated request not found')
      }

      if (request.status !== 'PAID') {
        await RequestModel.updateStatus(payment.request_id, 'PAID')

        await NotificationService.createPaymentSuccessNotification(
          request.user_id,
          payment.id,
          payment.amount,
          {
            blood_type: request.blood_type,
            quantity: request.quantity
          }
        )
      }

    } catch (error) {
      console.error('Error handling successful payment:', error)
    }
  }

  static async handlePaymentFailure(requestId, reason, paymentId = null) {
    try {
      await RequestModel.updateStatus(requestId, 'APPROVED')

      const request = await RequestModel.findById(requestId)
      if (request) {
        await NotificationService.createPaymentFailureNotification(
          request.user_id,
          requestId,
          reason,
          paymentId
        )
      }

    } catch (error) {
      console.error('Error handling payment failure:', error)
    }
  }

  static async refundPayment(paymentIntentId, amount = null) {
    try {
      const payment = await PaymentModel.findByPaymentIntentId(paymentIntentId)
      if (!payment) {
        throw new Error('Payment not found')
      }

      if (payment.status !== 'COMPLETED') {
        throw new Error('Only completed payments can be refunded')
      }

      const refundAmount = amount ? Math.round(amount * 100) : undefined

      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: refundAmount
      })

      const updatedPayment = await PaymentModel.updateStatus(
        payment.id,
        'REFUNDED',
        { error_message: `Refunded: ${refund.reason || 'Requested by admin'}` }
      )

      return {
        refund: refund,
        updated_payment: updatedPayment
      }

    } catch (error) {
      console.error('Error refunding payment:', error)
      throw new Error(`Refund failed: ${error.message}`)
    }
  }

  static async getPaymentDetails(paymentId) {
    try {
      const payment = await PaymentModel.findById(paymentId)
      if (!payment) {
        throw new Error('Payment not found')
      }

      let stripePaymentIntent = null
      if (payment.stripe_payment_intent_id) {
        try {
          stripePaymentIntent = await stripe.paymentIntents.retrieve(payment.stripe_payment_intent_id)
        } catch (stripeError) {
          console.error('Error retrieving Stripe payment intent:', stripeError)
        }
      }

      return {
        payment: payment,
        stripe_data: stripePaymentIntent
      }

    } catch (error) {
      console.error('Error getting payment details:', error)
      throw new Error(`Failed to get payment details: ${error.message}`)
    }
  }

  static mapStripeStatusToInternal(stripeStatus) {
    const statusMap = {
      'succeeded': 'COMPLETED',
      'processing': 'PENDING',
      'requires_action': 'PENDING',
      'requires_confirmation': 'PENDING',
      'requires_payment_method': 'PENDING',
      'canceled': 'CANCELLED',
      'requires_capture': 'PENDING'
    }

    return statusMap[stripeStatus] || 'FAILED'
  }

  static verifyWebhookSignature(payload, signature, secret) {
    try {
      return stripe.webhooks.constructEvent(payload, signature, secret)
    } catch (error) {
      console.error('Webhook signature verification failed:', error)
      throw new Error('Invalid webhook signature')
    }
  }

  static async initiatePayment(requestId, userId) {
    const request = await RequestModel.findById(requestId)
    if (!request) throw new Error('Request not found')
    if (request.user_id !== userId) throw new Error('Access denied')
    if (request.status !== 'APPROVED') throw new Error(`Cannot initiate payment for status: ${request.status}`)

    const updated = await RequestModel.updateStatus(requestId, 'PAYMENT_PENDING')
    return { request: updated, message: 'Payment initiated' }
  }

  static async confirmPaymentSimplified(requestId, userId, amount = null) {
    const request = await RequestModel.findById(requestId)
    if (!request) throw new Error('Request not found')
    if (request.user_id !== userId) throw new Error('Access denied')
    if (request.status !== 'PAYMENT_PENDING') throw new Error(`Cannot confirm payment for status: ${request.status}`)

    const updated = await RequestModel.updateStatus(requestId, 'PAID')

    try {
      await NotificationService.createPaymentSuccessNotification(
        userId,
        null,
        amount || 0,
        { blood_type: request.blood_type, quantity: request.quantity }
      )
    } catch {}

    return { request: updated, message: 'Payment confirmed' }
  }
}

module.exports = PaymentService
