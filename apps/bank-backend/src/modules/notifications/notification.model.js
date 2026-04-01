const { query } = require('../../utils/db.utils')

class NotificationModel {
  static async create(notificationData) {
    const { user_id, request_id, payment_id, type, title, message } = notificationData

    const queryText = `
      INSERT INTO notifications (user_id, request_id, payment_id, type, title, message)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `

    const result = await query(queryText, [user_id, request_id, payment_id, type, title, message])
    return result.rows[0]
  }

  static async getByUserId(userId, options = {}) {
    const { limit = 50, offset = 0, is_read } = options

    let queryText = `
      SELECT n.*, r.blood_type, r.quantity, r.status as request_status
      FROM notifications n
      LEFT JOIN requests r ON n.request_id = r.id
      WHERE n.user_id = $1
    `
    const params = [userId]

    if (is_read !== undefined) {
      queryText += ` AND n.is_read = $${params.length + 1}`
      params.push(is_read)
    }

    queryText += ` ORDER BY n.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
    params.push(limit, offset)

    const result = await query(queryText, params)
    return result.rows
  }

  static async getById(id) {
    const queryText = `
      SELECT n.*, r.blood_type, r.quantity, r.status as request_status
      FROM notifications n
      LEFT JOIN requests r ON n.request_id = r.id
      WHERE n.id = $1
    `

    const result = await query(queryText, [id])
    return result.rows[0] || null
  }

  static async markAsRead(id) {
    const queryText = `
      UPDATE notifications
      SET is_read = TRUE, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `

    const result = await query(queryText, [id])
    return result.rows[0]
  }

  static async markAllAsRead(userId) {
    const queryText = `
      UPDATE notifications
      SET is_read = TRUE, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $1 AND is_read = FALSE
      RETURNING id
    `

    const result = await query(queryText, [userId])
    return result.rows.length
  }

  static async getUnreadCount(userId) {
    const queryText = `
      SELECT COUNT(*) as count
      FROM notifications
      WHERE user_id = $1 AND is_read = FALSE
    `

    const result = await query(queryText, [userId])
    return parseInt(result.rows[0].count)
  }
}

module.exports = NotificationModel
