const UserModel = require('./user.model')

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll()

      res.status(200).json({
        message: 'Users retrieved successfully',
        data: {
          users: users,
          total_count: users.length
        }
      })

    } catch (error) {
      console.error('Get all users error:', error)
      res.status(500).json({
        error: error.message || 'Internal server error'
      })
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params

      if (!id || isNaN(id)) {
        return res.status(400).json({
          error: 'Valid user ID is required'
        })
      }

      const user = await UserModel.findById(parseInt(id))

      if (!user) {
        return res.status(404).json({
          error: 'User not found'
        })
      }

      res.status(200).json({
        message: 'User retrieved successfully',
        data: user
      })

    } catch (error) {
      console.error('Get user by ID error:', error)
      res.status(500).json({
        error: error.message || 'Internal server error'
      })
    }
  }

  static async getProfile(req, res) {
    try {
      const user = req.user

      const fullUser = await UserModel.findById(user.userId)

      if (!fullUser) {
        return res.status(404).json({
          error: 'User not found'
        })
      }

      res.status(200).json({
        message: 'Profile retrieved successfully',
        user: {
          id: fullUser.id,
          name: fullUser.name,
          email: fullUser.email,
          role: fullUser.role,
          phone: fullUser.phone,
          created_at: fullUser.created_at
        }
      })

    } catch (error) {
      console.error('Get profile error:', error)
      res.status(500).json({
        error: error.message || 'Internal server error'
      })
    }
  }
}

module.exports = UserController
