const { query } = require('../../utils/db.utils')

class InventoryModel {
  static async createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS blood_inventory (
        id SERIAL PRIMARY KEY,
        bank_id INTEGER NOT NULL,
        blood_type VARCHAR(10) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(bank_id, blood_type)
      )
    `

    try {
      await query(createTableQuery)
      console.log('✅ Blood inventory table created successfully')
    } catch (error) {
      console.error('❌ Error creating blood inventory table:', error)
      throw error
    }
  }

  static async findByBankId(bankId) {
    const result = await query('SELECT * FROM blood_inventory WHERE bank_id = $1 ORDER BY blood_type', [bankId])
    return result.rows
  }

  static async findByBankIdAndBloodType(bankId, bloodType) {
    const result = await query(
      'SELECT * FROM blood_inventory WHERE bank_id = $1 AND blood_type = $2',
      [bankId, bloodType]
    )
    return result.rows[0] || null
  }

  static async create(bankId, bloodType, quantity) {
    const result = await query(
      `INSERT INTO blood_inventory (bank_id, blood_type, quantity)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [bankId, bloodType, quantity]
    )
    return result.rows[0]
  }

  static async update(id, quantity) {
    const result = await query(
      `UPDATE blood_inventory
       SET quantity = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [quantity, id]
    )
    return result.rows[0] || null
  }

  static async delete(id) {
    const result = await query(
      'DELETE FROM blood_inventory WHERE id = $1 RETURNING *',
      [id]
    )
    return result.rows[0] || null
  }
}

module.exports = InventoryModel
