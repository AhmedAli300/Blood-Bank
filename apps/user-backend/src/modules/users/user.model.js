const { query } = require('../../utils/db.utils')

class UserModel {
  static async createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('SUPER_ADMIN', 'BANK_ADMIN', 'USER')),
        bank_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        token VARCHAR(500),
        phone VARCHAR(20)
      )
    `

    try {
      await query(createTableQuery)
      console.log('✅ Users table created successfully')

      await this.createDefaultSuperAdmin()
    } catch (error) {
      console.error('❌ Error creating users table:', error)
      throw error
    }
  }

  static async createDefaultSuperAdmin() {
    const checkQuery = 'SELECT id, email FROM users WHERE email = $1'
    const result = await query(checkQuery, ['super@gmail.com'])

    if (result.rows.length === 0) {
      const bcrypt = require('bcryptjs')
      const hashedPassword = await bcrypt.hash('super123', 10)

      const insertQuery = `
        INSERT INTO users (name, email, password, role, phone)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `

      const insertResult = await query(insertQuery, ['Super Admin', 'super@gmail.com', hashedPassword, 'SUPER_ADMIN', '+1234567890'])
      console.log('✅ Default super admin user created')

      const jwt = require('jsonwebtoken')
      const token = jwt.sign(
        {
          userId: insertResult.rows[0].id,
          email: 'super@gmail.com',
          role: 'SUPER_ADMIN'
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      )

      await query('UPDATE users SET token = $1 WHERE id = $2', [token, insertResult.rows[0].id])
    }

    const testUserResult = await query(checkQuery, ['user@test.com'])
    if (testUserResult.rows.length === 0) {
      const bcrypt = require('bcryptjs')
      const hashedPassword = await bcrypt.hash('user123', 10)

      const insertQuery = `
        INSERT INTO users (name, email, password, role, phone)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `

      const insertResult = await query(insertQuery, ['Test User', 'user@test.com', hashedPassword, 'USER', '+0987654321'])
      console.log('✅ Default test user created')

      const jwt = require('jsonwebtoken')
      const token = jwt.sign(
        {
          userId: insertResult.rows[0].id,
          email: 'user@test.com',
          role: 'USER'
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      )

      await query('UPDATE users SET token = $1 WHERE id = $2', [token, insertResult.rows[0].id])
    }

    const bankAdminResult = await query(checkQuery, ['bankadmin@test.com'])
    if (bankAdminResult.rows.length === 0) {
      const bcrypt = require('bcryptjs')
      const hashedPassword = await bcrypt.hash('admin123', 10)

      const insertQuery = `
        INSERT INTO users (name, email, password, role, phone)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `

      const insertResult = await query(insertQuery, ['Bank Admin', 'bankadmin@test.com', hashedPassword, 'BANK_ADMIN', '+1122334455'])
      console.log('✅ Default bank admin user created')

      const jwt = require('jsonwebtoken')
      const token = jwt.sign(
        {
          userId: insertResult.rows[0].id,
          email: 'bankadmin@test.com',
          role: 'BANK_ADMIN'
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      )

      await query('UPDATE users SET token = $1 WHERE id = $2', [token, insertResult.rows[0].id])
    }
  }

  static async create(userData) {
  const { name, email, password, role, bank_id = null, phone = null } = userData

  const result = await query(
    `INSERT INTO users (name, email, password, role, bank_id, phone)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, name, email, role, bank_id, phone, created_at`,
    [name, email, password, role, bank_id, phone]
  )

  return result.rows[0]
}

  static async findByEmail(email) {
    const result = await query('SELECT * FROM users WHERE email = $1', [email])
    return result.rows[0] || null
  }

  static async findAll() {
    const result = await query('SELECT id, name, email, role, bank_id, phone, created_at FROM users ORDER BY id')
    return result.rows
  }

  static async findByBankId(bankId) {
    const result = await query('SELECT * FROM users WHERE bank_id = $1 AND role = $2', [bankId, 'BANK_ADMIN'])
    return result.rows[0] || null
  }

  static async findById(id) {
    const result = await query('SELECT id, name, email, role, bank_id, phone, created_at FROM users WHERE id = $1', [id])
    return result.rows[0] || null
  }

  static async findByBankId(bankId) {
    const result = await query('SELECT * FROM users WHERE bank_id = $1 AND role = $2', [bankId, 'BANK_ADMIN'])
    return result.rows[0] || null
  }

  static async updateToken(id, token) {
    const result = await query(
      'UPDATE users SET token = $1 WHERE id = $2 RETURNING id, name, email, role, bank_id, created_at',
      [token, id]
    )
    return result.rows[0] || null
  }

  static async findByToken(token) {
    const result = await query(
      'SELECT id, name, email, role, bank_id, created_at FROM users WHERE token = $1',
      [token]
    )
    return result.rows[0] || null
  }
// ===================== Password Reset Functions =====================
static async createPasswordReset(userId, token, expiresAt) {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS password_resets (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      token VARCHAR(10) NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `
  await query(createTableQuery)

  const insertQuery = `
    INSERT INTO password_resets (user_id, token, expires_at)
    VALUES ($1, $2, $3)
  `
  await query(insertQuery, [userId, token, expiresAt])
}

static async findPasswordReset(token) {
  const result = await query(
    `SELECT * FROM password_resets WHERE token = $1 AND expires_at > NOW()`,
    [token]
  )
  return result.rows[0] || null
}

static async updatePassword(userId, hashedPassword) {
  await query(
    `UPDATE users SET password = $1 WHERE id = $2`,
    [hashedPassword, userId]
  )
}

static async deletePasswordReset(token) {
  await query(
    `DELETE FROM password_resets WHERE token = $1`,
    [token]
  )
}



}

module.exports = UserModel
