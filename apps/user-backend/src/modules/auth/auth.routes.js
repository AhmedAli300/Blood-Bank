
const express = require('express')
const AuthController = require('./auth.controller')

const router = express.Router()

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

// forgot password
router.post('/forgot-password', AuthController.forgotPassword)

// reset password
router.post('/reset-password', AuthController.resetPassword) 

module.exports = router
