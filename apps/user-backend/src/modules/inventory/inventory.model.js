const { query } = require('../../utils/db.utils')

class InventoryModel {
  static async findByBankId(bankId) {
    const result = await query('SELECT * FROM blood_inventory WHERE bank_id = $1 ORDER BY blood_type', [bankId])
    return result.rows
  }

  static async findAll() {
    const result = await query('SELECT * FROM blood_inventory ORDER BY bank_id, blood_type')
    return result.rows
  }
}

module.exports = InventoryModel
