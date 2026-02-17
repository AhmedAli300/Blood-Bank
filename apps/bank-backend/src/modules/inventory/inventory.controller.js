const InventoryService = require('../../services/inventory.service')
const InventoryModel = require('./inventory.model')
const UserModel = require('../users/user.model')

// Helper to validate bank admin ownership (standalone function)
const validateBankAdminAccess = async (userId, requestedBankId) => {
  const admin = await UserModel.findById(userId)
  if (!admin || admin.role !== 'BANK_ADMIN') {
    throw new Error('Access denied: Bank Admin role required')
  }
  if (admin.bank_id !== parseInt(requestedBankId)) {
    throw new Error('Access denied: You can only manage your own bank\'s inventory')
  }
  return admin
}

class InventoryController {
  static async create(req, res) {
    try {
      const { bank_id } = req.params
      const { blood_type, quantity, items } = req.body
      const userId = req.user.userId

      if (!bank_id || isNaN(bank_id)) {
        return res.status(400).json({ error: 'Valid bank ID is required' })
      }

      // Validate bank admin ownership
      await validateBankAdminAccess(userId, bank_id)

      // Handle bulk creation (multiple blood types)
      if (items && Array.isArray(items)) {
        if (items.length === 0) {
          return res.status(400).json({ error: 'Items array cannot be empty' })
        }

        const results = []
        const errors = []

        for (const item of items) {
          if (!item.blood_type || item.quantity === undefined) {
            errors.push({ item, error: 'blood_type and quantity are required for each item' })
            continue
          }

          try {
            const result = await InventoryService.createInventory(
              Number(bank_id),
              item.blood_type.toUpperCase(),
              Number(item.quantity)
            )
            results.push(result)
          } catch (err) {
            errors.push({ item, error: err.message })
          }
        }

        return res.status(201).json({
          message: `Created ${results.length} inventory items, ${errors.length} failed`,
          data: { created: results, errors }
        })
      }

      // Handle single creation
      if (!blood_type || quantity === undefined) {
        return res.status(400).json({ error: 'blood_type and quantity are required, or provide items array for bulk creation' })
      }

      const result = await InventoryService.createInventory(
        Number(bank_id),
        blood_type.toUpperCase(),
        Number(quantity)
      )

      res.status(201).json({ message: 'Inventory item created successfully', data: result })
    } catch (error) {
      console.error('Create inventory error:', error)
      if (error.message.includes('Access denied')) {
        return res.status(403).json({ error: error.message })
      }
      res.status(400).json({ error: 'Failed to create inventory', message: error.message })
    }
  }

  static async update(req, res) {
    try {
      const { bank_id, id } = req.params
      const { quantity } = req.body
      const userId = req.user.userId

      if (!bank_id || isNaN(bank_id)) {
        return res.status(400).json({ error: 'Valid bank ID is required' })
      }

      if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Valid inventory ID is required' })
      }

      if (quantity === undefined) {
        return res.status(400).json({ error: 'quantity is required' })
      }

      // Validate bank admin ownership
      await validateBankAdminAccess(userId, bank_id)

      const result = await InventoryService.updateInventory(
        Number(id),
        Number(bank_id),
        Number(quantity)
      )

      res.status(200).json({ message: 'Inventory item updated successfully', data: result })
    } catch (error) {
      console.error('Update inventory error:', error)
      if (error.message.includes('Access denied')) {
        return res.status(403).json({ error: error.message })
      }
      res.status(400).json({ error: 'Failed to update inventory', message: error.message })
    }
  }

  static async delete(req, res) {
    try {
      const { bank_id, id } = req.params
      const userId = req.user.userId

      if (!bank_id || isNaN(bank_id)) {
        return res.status(400).json({ error: 'Valid bank ID is required' })
      }

      if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Valid inventory ID is required' })
      }

      // Validate bank admin ownership
      await validateBankAdminAccess(userId, bank_id)

      const result = await InventoryService.deleteInventory(Number(id), Number(bank_id))

      if (!result) {
        return res.status(404).json({ error: 'Inventory item not found' })
      }

      res.status(200).json({ message: 'Inventory item deleted successfully', data: result })
    } catch (error) {
      console.error('Delete inventory error:', error)
      if (error.message.includes('Access denied')) {
        return res.status(403).json({ error: error.message })
      }
      res.status(400).json({ error: 'Failed to delete inventory', message: error.message })
    }
  }

  static async getByBankId(req, res) {
    try {
      const { bank_id } = req.params
      const userId = req.user.userId

      if (!bank_id || isNaN(bank_id)) {
        return res.status(400).json({ error: 'Valid bank ID is required' })
      }

      // Validate bank admin ownership
      await validateBankAdminAccess(userId, bank_id)

      const inventory = await InventoryModel.findByBankId(Number(bank_id))
      res.status(200).json({ message: 'Inventory retrieved successfully', data: inventory, count: inventory.length })
    } catch (error) {
      console.error('Get inventory error:', error)
      if (error.message.includes('Access denied')) {
        return res.status(403).json({ error: error.message })
      }
      res.status(500).json({ error: 'Failed to retrieve inventory', message: error.message })
    }
  }
}

module.exports = InventoryController
