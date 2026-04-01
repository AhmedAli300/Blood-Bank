const express = require('express')
const authMiddleware = require('../../middlewares/auth.middleware')
const roleMiddleware = require('../../middlewares/role.middleware')
const InventoryController = require('./inventory.controller')

const router = express.Router()

// Bank Admin Inventory Control - All routes require BANK_ADMIN role
// The controller validates that the admin can only manage their own bank's inventory

// Create new inventory item (blood type) for the bank
router.post('/banks/:bank_id', authMiddleware, roleMiddleware('BANK_ADMIN'), InventoryController.create)

// Update inventory item quantity
router.put('/banks/:bank_id/:id', authMiddleware, roleMiddleware('BANK_ADMIN'), InventoryController.update)

// Delete inventory item
router.delete('/banks/:bank_id/:id', authMiddleware, roleMiddleware('BANK_ADMIN'), InventoryController.delete)

// Get all inventory for the bank
router.get('/banks/:bank_id', authMiddleware, roleMiddleware('BANK_ADMIN'), InventoryController.getByBankId)

module.exports = router
