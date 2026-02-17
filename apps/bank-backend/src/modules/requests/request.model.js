const { query } = require('../../utils/db.utils')

class RequestModel {
  static async findById(id) {
    const result = await query('SELECT * FROM requests WHERE id = $1', [id])
    return result.rows[0] || null
  }

  static async findByOrderNumber(orderNumber) {
    const result = await query('SELECT * FROM requests WHERE order_number = $1', [orderNumber])
    return result.rows[0] || null
  }

  static async findPendingByBankId(bankId) {
    const result = await query(
      `SELECT r.*, u.name as user_name, u.email as user_email, u.phone as user_phone
       FROM requests r
       JOIN users u ON r.user_id = u.id
       WHERE r.bank_id = $1 AND r.status = 'SENT_TO_BANK'
       ORDER BY r.created_at DESC`,
      [bankId]
    )
    return result.rows
  }

  static async updateRejectionReason(id, reason) {
    const result = await query(
      `UPDATE requests
       SET rejection_reason = $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [reason, id]
    )
    return result.rows[0] || null
  }

  static async findByBankId(bankId, options = {}) {
    const { status, limit = 50, offset = 0 } = options
    let queryText = `SELECT r.*, u.name as user_name, u.email as user_email, u.phone as user_phone
       FROM requests r
       JOIN users u ON r.user_id = u.id
       WHERE r.bank_id = $1`
    const params = [bankId]
    
    if (status) {
      queryText += ` AND r.status = $2`
      params.push(status)
    }
    
    queryText += ` ORDER BY r.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
    params.push(limit, offset)
    
    const result = await query(queryText, params)
    return result.rows
  }

  static async getRequestCountsByBank() {
    const result = await query(
      `SELECT 
        bank_id,
        COUNT(*) as total_requests,
        COUNT(CASE WHEN status = 'SENT_TO_BANK' THEN 1 END) as pending_requests,
        COUNT(CASE WHEN status = 'APPROVED' THEN 1 END) as approved_requests,
        COUNT(CASE WHEN status = 'REJECTED' THEN 1 END) as rejected_requests,
        COUNT(CASE WHEN status = 'PAID' THEN 1 END) as paid_requests
       FROM requests
       WHERE bank_id IS NOT NULL
       GROUP BY bank_id`
    )
    return result.rows
  }
}

module.exports = RequestModel
