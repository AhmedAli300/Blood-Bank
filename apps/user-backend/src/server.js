// server.js

require('dotenv').config({ path: '.env' });

const app = require('./app'); // لازم يكون قبل أي استخدام لـ app
const pool = require('./config/db.config');
const bodyParser = require('body-parser');

// parse JSON
app.use(bodyParser.json());

// parse URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.USER_PORT || 4000

// Import models for table initialization
const UserModel = require('./modules/users/user.model')
const RequestModel = require('./modules/requests/request.model')
const PaymentModel = require('./modules/payments/payment.model')
const NotificationModel = require('./modules/notifications/notification.model')
const { query } = require('./utils/db.utils')

const initializeDatabase = async () => {
  try {
    // Create blood_banks table (read-only for user-service)
    await query(`
      CREATE TABLE IF NOT EXISTS blood_banks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        governorate VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        address TEXT,
        working_hours VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Blood banks table created/verified')

    // Create blood_inventory table (read-only for user-service)
    await query(`
      CREATE TABLE IF NOT EXISTS blood_inventory (
        id SERIAL PRIMARY KEY,
        bank_id INTEGER NOT NULL,
        blood_type VARCHAR(10) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Blood inventory table created/verified')

    // Initialize tables through models (proper separation of concerns)
    await UserModel.createTable()
    await RequestModel.createTable()
    await PaymentModel.createTable()
    await NotificationModel.createTable()

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
      console.log(`user-service running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Database connection failed:', error.message)
    process.exit(1)
  }
}

start()
