const NotificationModel = require('../modules/notifications/notification.model')

class NotificationService {
  static async createRequestSentToBankUserNotification(userId, requestId, requestData = {}) {
    const notificationData = {
      user_id: userId,
      request_id: requestId,
      type: 'REQUEST_SENT_TO_BANK',
      title: 'Request Sent to Bank',
      message: 'Your blood request has been sent to the selected blood bank and is currently under review. You will be notified once your request is confirmed.'
    }
    return await NotificationModel.create(notificationData)
  }

  static async createPaymentSuccessNotification(userId, paymentId, amount, requestData) {
    const { blood_type, quantity } = requestData
    const notificationData = {
      user_id: userId,
      payment_id: paymentId,
      type: 'PAYMENT_SUCCESS',
      title: 'Payment Successful',
      message: `Your payment of $${Number(amount || 0).toFixed(2)} for ${quantity} unit(s) of ${blood_type} blood has been processed successfully. Administration will contact you shortly.`
    }
    return await NotificationModel.create(notificationData)
  }

  static async createPaymentFailureNotification(userId, requestId, reason, paymentId = null) {
    const notificationData = {
      user_id: userId,
      request_id: requestId,
      payment_id: paymentId,
      type: 'PAYMENT_FAILED',
      title: 'Payment Failed',
      message: `Your payment attempt failed. Reason: ${reason}. Please try again or contact support.`
    }
    return await NotificationModel.create(notificationData)
  }

  static async createNewRequestForBankAdminNotification(bankAdminUserId, requestId, requestData = {}) {
    const { blood_type, quantity, patient_name, governorate, city } = requestData
    const context = []
    if (quantity) context.push(`${quantity} unit(s)`)
    if (blood_type) context.push(`${blood_type}`)
    const qtyType = context.length ? ` (${context.join(' of ')})` : ''
    const location = [governorate, city].filter(Boolean).join(', ')
    const locationSuffix = location ? ` Location: ${location}.` : ''

    const notificationData = {
      user_id: bankAdminUserId,
      request_id: requestId,
      type: 'BANK_NEW_REQUEST',
      title: 'New Blood Request Received',
      message: `A new blood request has been received${qtyType}.${locationSuffix}`
    }
    return await NotificationModel.create(notificationData)
  }

  static async getUserNotifications(userId, options = {}) {
    return await NotificationModel.getByUserId(userId, options)
  }

  static async getNotificationById(id) {
    return await NotificationModel.getById(id)
  }

  static async markAsRead(id) {
    return await NotificationModel.markAsRead(id)
  }

  static async markAllAsRead(userId) {
    return await NotificationModel.markAllAsRead(userId)
  }

  static async getUnreadCount(userId) {
    return await NotificationModel.getUnreadCount(userId)
  }
}

module.exports = NotificationService
