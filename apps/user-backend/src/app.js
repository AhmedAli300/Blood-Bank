const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

const authRoutes = require('./modules/auth/auth.routes')
const userRoutes = require('./modules/users/user.routes')
const requestRoutes = require('./modules/requests/request.routes')
const paymentRoutes = require('./modules/payments/payment.routes')
const notificationRoutes = require('./modules/notifications/notification.routes')

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/requests', requestRoutes)
app.use('/payments', paymentRoutes)
app.use('/notifications', notificationRoutes)

app.get('/', (req, res) => {
  res.redirect('/health')
})

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'user-service',
    timestamp: new Date().toISOString()
  })
})

module.exports = app
