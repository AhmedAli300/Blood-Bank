const { query } = require('../../utils/db.utils')

class BloodBankModel {
  static async findAll() {
    const result = await query('SELECT * FROM blood_banks ORDER BY name')
    return result.rows
  }

  static async findById(id) {
    const result = await query('SELECT * FROM blood_banks WHERE id = $1', [id])
    return result.rows[0] || null
  }

  static async findByLocation(governorate, city) {
    const result = await query(
      `SELECT bb.*, 
              json_agg(json_build_object('blood_type', bi.blood_type, 'quantity', bi.quantity)) as inventory
       FROM blood_banks bb
       LEFT JOIN blood_inventory bi ON bb.id = bi.bank_id
       WHERE bb.governorate = $1 AND bb.city = $2
       GROUP BY bb.id
       ORDER BY bb.name`,
      [governorate, city]
    )
    return result.rows
  }

  static async findByGovernorate(governorate) {
    const result = await query(
      `SELECT bb.*, 
              json_agg(json_build_object('blood_type', bi.blood_type, 'quantity', bi.quantity)) as inventory
       FROM blood_banks bb
       LEFT JOIN blood_inventory bi ON bb.id = bi.bank_id
       WHERE bb.governorate = $1
       GROUP BY bb.id
       ORDER BY bb.name`,
      [governorate]
    )
    return result.rows
  }
}

module.exports = BloodBankModel
