const express = require('express')
const authMiddleware = require('../../middlewares/auth.middleware')
const roleMiddleware = require('../../middlewares/role.middleware')
const { uploadBankImage } = require('../../middlewares/upload.middleware')
const BloodBankController = require('./bank.controller')

const router = express.Router()

const handleUpload = (req, res, next) => {
  uploadBankImage(req, res, (err) => {
    if (err) return res.status(400).json({ error: 'Upload failed', message: err.message })
    next()
  })
}

// Public routes (for bank search functionality)
router.get('/', BloodBankController.getAll)
router.get('/:id', BloodBankController.getById)

// Protected routes - Super Admin only (form-data: name, governorate, city, address, working_hours, image)
router.post('/create', authMiddleware, roleMiddleware('SUPER_ADMIN'), handleUpload, BloodBankController.create)
router.put('/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), handleUpload, BloodBankController.update)
router.delete('/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), BloodBankController.delete)

// Create bank admin for a specific bank - Super Admin only
router.post('/:bankId/admin', authMiddleware, roleMiddleware('SUPER_ADMIN'), BloodBankController.createBankAdmin)

module.exports = router
