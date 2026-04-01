const NotificationModel = require('../modules/notifications/notification.model')

class NotificationService {
  static async createApprovalNotification(userId, requestId, orderNumber, requestData) {
    const { blood_type, quantity } = requestData
    const notificationData = {
      user_id: userId,
      request_id: requestId,
      type: 'REQUEST_APPROVED',
      title: 'Request Approved',
      message: `Your blood request for ${quantity} unit(s) of ${blood_type} has been approved. Order number: ${orderNumber}. Please proceed to payment to complete your request.`
    }
    return await NotificationModel.create(notificationData)
  }

  static async createRejectionNotification(userId, requestId, reason, requestData) {
    const { blood_type, quantity } = requestData
    const notificationData = {
      user_id: userId,
      request_id: requestId,
      type: 'REQUEST_REJECTED',
      title: 'Request Rejected',
      message: `Your blood request for ${quantity} unit(s) of ${blood_type} has been rejected. Reason: ${reason}`
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
