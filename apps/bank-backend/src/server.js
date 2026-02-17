require('dotenv').config()
const app = require('./app')
const pool = require('./config/db.config')

const PORT = process.env.BANK_PORT || 5000

// Import models for table initialization
const BloodBankModel = require('./modules/blood-banks/bank.model')
const InventoryModel = require('./modules/inventory/inventory.model')
const { query } = require('./utils/db.utils')

const initializeDatabase = async () => {
  try {
    // Create users table (read-only for bank-service)
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('SUPER_ADMIN', 'BANK_ADMIN', 'USER')),
        bank_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        token VARCHAR(500),
        phone VARCHAR(20)
      )
    `)
    console.log('✅ Users table created/verified')

    // Create requests table (bank-service manages approval/rejection)
    await query(`
      CREATE TABLE IF NOT EXISTS requests (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        blood_type VARCHAR(10) NOT NULL,
        quantity INTEGER NOT NULL,
        governorate VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        patient_name VARCHAR(100),
        reason TEXT,
        status VARCHAR(50) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'CREATED', 'SENT_TO_BANK', 'APPROVED', 'REJECTED', 'PAYMENT_PENDING', 'PAID')),
        national_id_image_url VARCHAR(255),
        medical_proof_image_url VARCHAR(255),
        bank_id INTEGER,
        order_number VARCHAR(50),
        rejection_reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        sent_to_bank_at TIMESTAMP,
        payment_initiated_at TIMESTAMP
      )
    `)
    console.log('✅ Requests table created/verified')

    // Create notifications table (bank-service creates notifications)
    await query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        request_id INTEGER,
        payment_id INTEGER,
        type VARCHAR(50) NOT NULL CHECK (type IN ('REQUEST_APPROVED', 'REQUEST_REJECTED', 'PAYMENT_SUCCESS', 'BANK_PAYMENT_RECEIVED', 'PAYMENT_FAILED', 'REQUEST_SENT_TO_BANK', 'BANK_NEW_REQUEST')),
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Notifications table created/verified')

    // Initialize tables through models (proper separation of concerns)
    await BloodBankModel.createTable()
    await InventoryModel.createTable()

    console.log('✅ All database tables initialized')
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    throw error
  }
}

const start = async () => {
  try {
    await pool.query('SELECT 1')
    await initializeDatabase()
    app.listen(PORT, () => {
      console.log(`bank-service running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Database connection failed:', error.message)
    process.exit(1)
  }
}

start()
