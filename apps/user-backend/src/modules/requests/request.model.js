const { query } = require('../../utils/db.utils')

class RequestModel {
  static async createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS requests (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        blood_type VARCHAR(10) NOT NULL,
        quantity INTEGER NOT NULL,
        governorate VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        patient_name VARCHAR(100),
        reason TEXT,
        status VARCHAR(50) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'CREATED', 'SENT_TO_BANK', 'APPROVED', 'REJECTED', 'PAYMENT_PENDING', 'PAID')),
        national_id_image_url VARCHAR(255),
        medical_proof_image_url VARCHAR(255),
        bank_id INTEGER,
        order_number VARCHAR(50),
        rejection_reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        sent_to_bank_at TIMESTAMP,
        payment_initiated_at TIMESTAMP
      )
    `

    try {
      await query(createTableQuery)
      console.log('✅ Requests table created successfully')
    } catch (error) {
      console.error('❌ Error creating requests table:', error)
      throw error
    }
  }

  static async create(data) {
    const {
      user_id, blood_type, quantity, governorate, city,
      patient_name, reason
    } = data

    const result = await query(
      `INSERT INTO requests (
        user_id, blood_type, quantity, governorate, city,
        patient_name, reason, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'DRAFT')
      RETURNING *`,
      [user_id, blood_type, quantity, governorate, city, patient_name, reason]
    )
    return result.rows[0]
  }

  static async findById(id) {
    const result = await query('SELECT * FROM requests WHERE id = $1', [id])
    return result.rows[0] || null
  }

  static async updateWithDocuments(id, docData) {
    const { national_id_image_url, medical_proof_image_url } = docData
    const result = await query(
      `UPDATE requests
       SET national_id_image_url = $1,
           medical_proof_image_url = $2,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING *`,
      [national_id_image_url, medical_proof_image_url, id]
    )
    return result.rows[0] || null
  }

  static async updateStatus(id, status, bankId = null) {
    let queryText = `UPDATE requests SET status = $1, updated_at = CURRENT_TIMESTAMP`
    const params = [status]
    if (status === 'PAYMENT_PENDING') {
      queryText += `, payment_initiated_at = CURRENT_TIMESTAMP`
    } else if (status === 'SENT_TO_BANK') {
      queryText += `, sent_to_bank_at = CURRENT_TIMESTAMP`
    }
    if (bankId !== null) {
      queryText += `, bank_id = $2`
      params.push(bankId)
    }
    queryText += ` WHERE id = $${params.length + 1} RETURNING *`
    params.push(id)
    const result = await query(queryText, params)
    return result.rows[0] || null
  }

  static async sendToBank(id, bankId) {
    const result = await query(
      `UPDATE requests 
       SET status = $1, bank_id = $2, sent_to_bank_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3 AND status = $4
       RETURNING *`,
      ['SENT_TO_BANK', bankId, id, 'CREATED']
    )
    return result.rows[0] || null
  }

  static async findByUserId(userId) {
    const result = await query(
      'SELECT * FROM requests WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    )
    return result.rows
  }
}

module.exports = RequestModel
