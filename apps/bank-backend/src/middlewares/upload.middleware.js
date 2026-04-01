const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadsDir = path.join(__dirname, '..', '..', 'uploads')
const banksDir = path.join(uploadsDir, 'banks')

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
if (!fs.existsSync(banksDir)) fs.mkdirSync(banksDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, banksDir),
  filename: (req, file, cb) => {
    const ext = (path.extname(file.originalname) || '.jpg').toLowerCase()
    const name = `bank-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`
    cb(null, name)
  }
})

const fileFilter = (req, file, cb) => {
  const allowed = /\.(jpe?g|png|gif|webp)$/i
  if (allowed.test(file.originalname)) return cb(null, true)
  cb(new Error('Only images (jpg, jpeg, png, gif, webp) are allowed'), false)
}

const uploadBankImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
}).single('image')

module.exports = { uploadBankImage, banksDir, uploadsDir }
