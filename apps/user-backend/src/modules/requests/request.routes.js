const express = require('express')
const RequestController = require('./request.controller')
const authMiddleware = require('../../middlewares/auth.middleware')
const { validateDocumentsRequired, validateStatusTransition } = require('../../middlewares/request-status.middleware')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/documents/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1])
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image files are allowed!'), false)
  }
})

const router = express.Router()

// Create request - no status validation needed (starts as DRAFT)
router.post('/create', authMiddleware, RequestController.create)

// Upload documents - validates request is modifiable
router.post('/upload-documents/:id', authMiddleware, upload.fields([
  { name: 'national_id_image', maxCount: 1 },
  { name: 'medical_proof_image', maxCount: 1 }
]), RequestController.uploadDocuments)

// Send to bank - validates documents are uploaded and status transition is valid
router.post('/send-to-bank/:id', authMiddleware, validateDocumentsRequired, RequestController.sendToBank)

// Get user requests
router.get('/my-requests', authMiddleware, RequestController.getUserRequests)

module.exports = router
