const { query } = require('../../utils/db.utils')

class UserModel {
  static async findById(id) {
    const result = await query('SELECT id, name, email, role, bank_id, phone, created_at FROM users WHERE id = $1', [id])
    return result.rows[0] || null
  }

  static async findByBankId(bankId) {
    const result = await query('SELECT * FROM users WHERE bank_id = $1 AND role = $2', [bankId, 'BANK_ADMIN'])
    return result.rows[0] || null
  }

  static async findByToken(token) {
    const result = await query('SELECT id, name, email, role, bank_id, created_at FROM users WHERE token = $1', [token])
    return result.rows[0] || null
  }

  static async findAll() {
    const result = await query(
      'SELECT id, name, email, role, bank_id, phone, created_at FROM users ORDER BY id'
    )
    return result.rows
  }

  static async createBankAdmin(userData) {
    const { name, email, password, phone, bank_id } = userData
    const bcrypt = require('bcryptjs')
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await query(
      `INSERT INTO users (name, email, password, role, bank_id, phone)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, email, role, bank_id, phone, created_at`,
      [name, email, hashedPassword, 'BANK_ADMIN', bank_id, phone]
    )
    return result.rows[0]
  }

  static async findByEmail(email) {
    const result = await query('SELECT * FROM users WHERE email = $1', [email])
    return result.rows[0] || null
  }
}

module.exports = UserModel
