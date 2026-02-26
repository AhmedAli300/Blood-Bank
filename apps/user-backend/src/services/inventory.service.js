const InventoryModel = require('../modules/inventory/inventory.model')

class InventoryService {
  static validateBloodType(bloodType) {
    const valid = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    if (!valid.includes(bloodType)) {
      throw new Error(`Invalid blood type: ${bloodType}`)
    }
  }

  static validateQuantity(quantity) {
    if (quantity <= 0 || !Number.isInteger(quantity)) {
      throw new Error('Quantity must be a positive integer')
    }
  }

  static async checkAvailability(bankId, bloodType, requestedQuantity) {
    this.validateBloodType(bloodType)
    this.validateQuantity(requestedQuantity)
    const inventory = await InventoryModel.findByBankId(bankId)
    const item = inventory.find(i => i.blood_type === bloodType)
    if (!item) {
      return { status: 'NOT_AVAILABLE', availableQuantity: 0, requestedQuantity, canFulfill: false, message: `Blood type ${bloodType} not available at this bank` }
    }
    const q = item.quantity
    if (q >= requestedQuantity) {
      return { status: 'ENOUGH', availableQuantity: q, requestedQuantity, canFulfill: true, message: 'Sufficient inventory available' }
    }
    if (q > 0) {
      return { status: 'LIMITED', availableQuantity: q, requestedQuantity, canFulfill: false, message: `Limited inventory: ${q} units available out of ${requestedQuantity} requested` }
    }
    return { status: 'NOT_AVAILABLE', availableQuantity: 0, requestedQuantity, canFulfill: false, message: 'No inventory available for this blood type' }
  }
}

module.exports = InventoryService
