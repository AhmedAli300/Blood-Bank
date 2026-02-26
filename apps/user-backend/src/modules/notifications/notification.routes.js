const express = require('express')
const NotificationController = require('./notification.controller')
const authMiddleware = require('../../middlewares/auth.middleware')

const router = express.Router()

router.get('/', authMiddleware, NotificationController.getUserNotifications)
router.get('/unread-count', authMiddleware, NotificationController.getUnreadCount)
router.get('/:id', authMiddleware, NotificationController.getNotificationById)
router.patch('/:id/read', authMiddleware, NotificationController.markAsRead)
router.patch('/read-all', authMiddleware, NotificationController.markAllAsRead)
router.delete('/cleanup', authMiddleware, NotificationController.cleanupAllNotifications)

module.exports = router
