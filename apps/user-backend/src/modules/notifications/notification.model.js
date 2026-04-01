const { query } = require('../../utils/db.utils')

class NotificationModel {
  static async createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        request_id INTEGER,
        payment_id INTEGER,
        type VARCHAR(50) NOT NULL CHECK (type IN ('REQUEST_APPROVED', 'REQUEST_REJECTED', 'PAYMENT_SUCCESS', 'BANK_PAYMENT_RECEIVED', 'PAYMENT_FAILED', 'REQUEST_SENT_TO_BANK', 'BANK_NEW_REQUEST')),
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    try {
      await query(createTableQuery)
      console.log('✅ Notifications table created successfully')
    } catch (error) {
      console.error('❌ Error creating notifications table:', error)
      throw error
    }
  }

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

  static async getByRequestId(requestId) {
    const queryText = `
      SELECT n.*, r.blood_type, r.quantity, r.status as request_status
      FROM notifications n
      LEFT JOIN requests r ON n.request_id = r.id
      WHERE n.request_id = $1
      ORDER BY n.created_at DESC
    `
    const result = await query(queryText, [requestId])
    return result.rows
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

  static async delete(id) {
    const queryText = 'DELETE FROM notifications WHERE id = $1'
    const result = await query(queryText, [id])
    return result.rowCount > 0
  }

  static async deleteAll() {
    const queryText = 'DELETE FROM notifications'
    const result = await query(queryText)
    return result.rowCount
  }

  static async getCount() {
    const queryText = 'SELECT COUNT(*) as count FROM notifications'
    const result = await query(queryText)
    return parseInt(result.rows[0].count)
  }
}

module.exports = NotificationModel
