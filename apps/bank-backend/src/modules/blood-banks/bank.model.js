const { query } = require('../../utils/db.utils')

class BloodBankModel {
  static async createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS blood_banks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        governorate VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        address TEXT,
        working_hours VARCHAR(255),
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    const addImageColumnQuery = `
      ALTER TABLE blood_banks ADD COLUMN IF NOT EXISTS image VARCHAR(255)
    `

    try {
      await query(createTableQuery)
      await query(addImageColumnQuery)
      console.log('✅ Blood banks table created successfully')
    } catch (error) {
      console.error('❌ Error creating blood banks table:', error)
      throw error
    }
  }

  static async findAll() {
    const result = await query('SELECT * FROM blood_banks ORDER BY name')
    return result.rows
  }

  static async findById(id) {
    const result = await query('SELECT * FROM blood_banks WHERE id = $1', [id])
    return result.rows[0] || null
  }

  static async create(data) {
    const { name, governorate, city, address, working_hours, image } = data
    const result = await query(
      `INSERT INTO blood_banks (name, governorate, city, address, working_hours, image)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, governorate, city, address || null, working_hours || null, image || null]
    )
    return result.rows[0]
  }

  static async update(id, data) {
    const { name, governorate, city, address, working_hours, image } = data
    const result = await query(
      `UPDATE blood_banks
       SET name = $1, governorate = $2, city = $3, address = $4, working_hours = $5, image = COALESCE($6, image), updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [name, governorate, city, address || null, working_hours || null, image || null, id]
    )
    return result.rows[0]
  }

  static async delete(id) {
    const result = await query('DELETE FROM blood_banks WHERE id = $1 RETURNING id', [id])
    return result.rows[0]
  }
}

module.exports = BloodBankModel
