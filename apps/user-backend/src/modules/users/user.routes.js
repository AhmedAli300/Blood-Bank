const express = require('express')
const UserController = require('./user.controller')
const authMiddleware = require('../../middlewares/auth.middleware')
const roleMiddleware = require('../../middlewares/role.middleware')

const router = express.Router()

router.get('/', authMiddleware, roleMiddleware('SUPER_ADMIN'), UserController.getAllUsers)
router.get('/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), UserController.getUserById)
router.get('/profile/me', authMiddleware, UserController.getProfile)

module.exports = router
