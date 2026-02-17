const { query } = require('../../utils/db.utils')

class PaymentModel {
  static async createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        request_id INTEGER,
        user_id INTEGER NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(3) DEFAULT 'USD',
        status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
          CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED')),
        stripe_payment_intent_id VARCHAR(255) UNIQUE,
        stripe_payment_method_id VARCHAR(255),
        payment_method_type VARCHAR(50),
        client_secret VARCHAR(255),
        error_message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    try {
      await query(createTableQuery)
      console.log('✅ Payments table created/verified successfully')
    } catch (error) {
      console.error('❌ Error creating payments table:', error)
      throw error
    }
  }

  static async create(paymentData) {
    const {
      request_id,
      user_id,
      amount,
      currency = 'USD',
      status = 'PENDING',
      stripe_payment_intent_id,
      stripe_payment_method_id,
      payment_method_type,
      client_secret
    } = paymentData

    const queryText = `
      INSERT INTO payments (
        request_id, user_id, amount, currency, status,
        stripe_payment_intent_id, stripe_payment_method_id,
        payment_method_type, client_secret
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `

    const result = await query(queryText, [
      request_id, user_id, amount, currency, status,
      stripe_payment_intent_id, stripe_payment_method_id,
      payment_method_type, client_secret
    ])

    return result.rows[0]
  }

  static async findById(id) {
    const queryText = 'SELECT * FROM payments WHERE id = $1'
    const result = await query(queryText, [id])
    return result.rows[0] || null
  }

  static async findByPaymentIntentId(paymentIntentId) {
    const queryText = 'SELECT * FROM payments WHERE stripe_payment_intent_id = $1'
    const result = await query(queryText, [paymentIntentId])
    return result.rows[0] || null
  }

  static async findByRequestId(requestId) {
    const queryText = 'SELECT * FROM payments WHERE request_id = $1 ORDER BY created_at DESC'
    const result = await query(queryText, [requestId])
    return result.rows
  }

  static async findByUserId(userId, options = {}) {
    const { status, limit = 50, offset = 0 } = options

    let queryText = 'SELECT * FROM payments WHERE user_id = $1'
    const params = [userId]

    if (status) {
      queryText += ' AND status = $2'
      params.push(status)
    }

    queryText += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
    params.push(limit, offset)

    const result = await query(queryText, params)
    return result.rows
  }

  static async updateStatus(id, status, additionalData = {}) {
    const {
      stripe_payment_intent_id,
      stripe_payment_method_id,
      payment_method_type,
      error_message
    } = additionalData

    const queryText = `
      UPDATE payments
      SET status = $1,
          stripe_payment_intent_id = COALESCE($2, stripe_payment_intent_id),
          stripe_payment_method_id = COALESCE($3, stripe_payment_method_id),
          payment_method_type = COALESCE($4, payment_method_type),
          error_message = COALESCE($5, error_message),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `

    const result = await query(queryText, [
      status,
      stripe_payment_intent_id,
      stripe_payment_method_id,
      payment_method_type,
      error_message,
      id
    ])

    return result.rows[0] || null
  }

  static async updateFromStripeWebhook(paymentIntentId, status, stripeData) {
    const queryText = `
      UPDATE payments
      SET status = $1,
          stripe_payment_method_id = COALESCE($2, stripe_payment_method_id),
          payment_method_type = COALESCE($3, payment_method_type),
          updated_at = CURRENT_TIMESTAMP
      WHERE stripe_payment_intent_id = $4
      RETURNING *
    `

    const result = await query(queryText, [
      status,
      stripeData.payment_method,
      stripeData.payment_method_type,
      paymentIntentId
    ])

    return result.rows[0] || null
  }

  static async getStatistics(userId = null) {
    let queryText = `
      SELECT
        COUNT(*) as total_payments,
        COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) as completed_payments,
        COUNT(CASE WHEN status = 'FAILED' THEN 1 END) as failed_payments,
        COUNT(CASE WHEN status = 'PENDING' THEN 1 END) as pending_payments,
        COALESCE(SUM(CASE WHEN status = 'COMPLETED' THEN amount END), 0) as total_revenue,
        COALESCE(AVG(CASE WHEN status = 'COMPLETED' THEN amount END), 0) as average_payment
      FROM payments
    `

    const params = []
    if (userId) {
      queryText += ' WHERE user_id = $1'
      params.push(userId)
    }

    const result = await query(queryText, params)
    return result.rows[0]
  }

  static async delete(id) {
    const queryText = 'DELETE FROM payments WHERE id = $1'
    const result = await query(queryText, [id])
    return result.rowCount > 0
  }
}

module.exports = PaymentModel
