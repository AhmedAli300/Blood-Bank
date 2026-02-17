const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

const requestRoutes = require('./modules/requests/request.controller')
app.use('/requests', requestRoutes)
const inventoryRoutes = require('./modules/inventory/inventory.routes')
app.use('/inventory', inventoryRoutes)
const bloodBankRoutes = require('./modules/blood-banks/bank.routes')
app.use('/blood-banks', bloodBankRoutes)
const notificationRoutes = require('./modules/notifications/notification.routes')
app.use('/notifications', notificationRoutes)

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'bank-service',
    timestamp: new Date().toISOString()
  })
})

module.exports = app
