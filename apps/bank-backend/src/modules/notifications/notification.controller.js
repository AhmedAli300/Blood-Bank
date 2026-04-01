const NotificationService = require('../../services/notification.service')

class NotificationController {
  static async getUserNotifications(req, res) {
    try {
      const userId = req.user.userId
      const { limit, offset, is_read } = req.query

      const options = {}
      if (limit) options.limit = parseInt(limit)
      if (offset) options.offset = parseInt(offset)
      if (is_read !== undefined) options.is_read = is_read === 'true'

      const notifications = await NotificationService.getUserNotifications(userId, options)
      const unreadCount = await NotificationService.getUnreadCount(userId)

      res.status(200).json({
        message: 'Notifications retrieved successfully',
        data: {
          notifications,
          unread_count: unreadCount,
          total_count: notifications.length
        }
      })

    } catch (error) {
      console.error('Get notifications error:', error)
      res.status(500).json({
        error: error.message || 'Internal server error'
      })
    }
  }

  static async getNotificationById(req, res) {
    try {
      const { id } = req.params
      const userId = req.user.userId

      if (!id || isNaN(id)) {
        return res.status(400).json({
          error: 'Valid notification ID is required'
        })
      }

      const notification = await NotificationService.getNotificationById(parseInt(id))

      if (!notification) {
        return res.status(404).json({
          error: 'Notification not found'
        })
      }

      if (notification.user_id !== userId) {
        return res.status(403).json({
          error: 'Access denied'
        })
      }

      res.status(200).json({
        message: 'Notification retrieved successfully',
        data: notification
      })

    } catch (error) {
      console.error('Get notification by ID error:', error)
      res.status(500).json({
        error: error.message || 'Internal server error'
      })
    }
  }

  static async markAsRead(req, res) {
    try {
      const { id } = req.params
      const userId = req.user.userId

      if (!id || isNaN(id)) {
        return res.status(400).json({
          error: 'Valid notification ID is required'
        })
      }

      const notification = await NotificationService.getNotificationById(parseInt(id))

      if (!notification) {
        return res.status(404).json({
          error: 'Notification not found'
        })
      }

      if (notification.user_id !== userId) {
        return res.status(403).json({
          error: 'Access denied'
        })
      }

      const updatedNotification = await NotificationService.markAsRead(parseInt(id))

      res.status(200).json({
        message: 'Notification marked as read',
        data: updatedNotification
      })

    } catch (error) {
      console.error('Mark as read error:', error)
      res.status(500).json({
        error: error.message || 'Internal server error'
      })
    }
  }

  static async markAllAsRead(req, res) {
    try {
      const userId = req.user.userId

      const updatedCount = await NotificationService.markAllAsRead(userId)

      res.status(200).json({
        message: 'All notifications marked as read',
        data: {
          updated_count: updatedCount
        }
      })

    } catch (error) {
      console.error('Mark all as read error:', error)
      res.status(500).json({
        error: error.message || 'Internal server error'
      })
    }
  }

  static async getUnreadCount(req, res) {
    try {
      const userId = req.user.userId

      const unreadCount = await NotificationService.getUnreadCount(userId)

      res.status(200).json({
        message: 'Unread count retrieved successfully',
        data: {
          unread_count: unreadCount
        }
      })

    } catch (error) {
      console.error('Get unread count error:', error)
      res.status(500).json({
        error: error.message || 'Internal server error'
      })
    }
  }
}

module.exports = NotificationController
