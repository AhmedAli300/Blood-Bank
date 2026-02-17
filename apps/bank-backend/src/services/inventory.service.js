const { withTransaction } = require('../utils/db.utils')
const InventoryModel = require('../modules/inventory/inventory.model')

class InventoryService {
  static validateBloodType(bloodType) {
    const valid = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    if (!valid.includes(bloodType)) throw new Error(`Invalid blood type: ${bloodType}`)
  }

  static validateQuantity(quantity) {
    if (quantity <= 0 || !Number.isInteger(quantity)) throw new Error('Quantity must be a positive integer')
  }

  static validateNonNegativeQuantity(quantity) {
    if (quantity < 0 || !Number.isInteger(quantity)) throw new Error('Quantity must be a non-negative integer')
  }

  static async checkAvailability(bankId, bloodType, requestedQuantity) {
    this.validateBloodType(bloodType)
    this.validateQuantity(requestedQuantity)
    const inventory = await InventoryModel.findByBankId(bankId)
    const item = inventory.find(i => i.blood_type === bloodType)
    if (!item) return { status: 'NOT_AVAILABLE', availableQuantity: 0, requestedQuantity, canFulfill: false, message: `Blood type ${bloodType} not available at this bank` }
    const q = item.quantity
    if (q >= requestedQuantity) return { status: 'ENOUGH', availableQuantity: q, requestedQuantity, canFulfill: true, message: 'Sufficient inventory available' }
    if (q > 0) return { status: 'LIMITED', availableQuantity: q, requestedQuantity, canFulfill: false, message: `Limited inventory: ${q} units available out of ${requestedQuantity} requested` }
    return { status: 'NOT_AVAILABLE', availableQuantity: 0, requestedQuantity, canFulfill: false, message: 'No inventory available for this blood type' }
  }

  static async decreaseInventory(bankId, bloodType, quantity) {
    this.validateQuantity(quantity)
    this.validateBloodType(bloodType)
    return await withTransaction(async (client) => {
      const res = await client.query(
        `UPDATE blood_inventory 
         SET quantity = quantity - $1
         WHERE bank_id = $2 AND blood_type = $3 AND quantity >= $1
         RETURNING *`,
        [quantity, bankId, bloodType]
      )
      if (res.rows.length === 0) throw new Error('Insufficient inventory')
      return res.rows[0]
    })
  }

  static async createInventory(bankId, bloodType, quantity) {
    this.validateBloodType(bloodType)
    this.validateNonNegativeQuantity(quantity)
    
    // Check if blood type already exists for this bank
    const existing = await InventoryModel.findByBankIdAndBloodType(bankId, bloodType)
    if (existing) {
      throw new Error(`Blood type ${bloodType} already exists for this bank. Use update instead.`)
    }
    
    return await InventoryModel.create(bankId, bloodType, quantity)
  }

  static async updateInventory(inventoryId, bankId, quantity) {
    this.validateNonNegativeQuantity(quantity)
    
    // Verify the inventory item belongs to the bank
    const inventory = await InventoryModel.findByBankId(bankId)
    const item = inventory.find(i => i.id === parseInt(inventoryId))
    if (!item) {
      throw new Error('Inventory item not found or does not belong to this bank')
    }
    
    return await InventoryModel.update(inventoryId, quantity)
  }

  static async deleteInventory(inventoryId, bankId) {
    // Verify the inventory item belongs to the bank
    const inventory = await InventoryModel.findByBankId(bankId)
    const item = inventory.find(i => i.id === parseInt(inventoryId))
    if (!item) {
      throw new Error('Inventory item not found or does not belong to this bank')
    }
    
    return await InventoryModel.delete(inventoryId)
  }
}

module.exports = InventoryService
