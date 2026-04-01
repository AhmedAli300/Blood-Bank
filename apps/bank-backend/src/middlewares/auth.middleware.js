const jwt = require('jsonwebtoken')
const UserModel = require('../modules/users/user.model')

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required' })
    }
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await UserModel.findByToken(token)
    if (!user) return res.status(401).json({ error: 'Invalid or expired token' })
    req.user = decoded
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') return res.status(401).json({ error: 'Token expired' })
    if (error.name === 'JsonWebTokenError') return res.status(401).json({ error: 'Invalid token' })
    return res.status(500).json({ error: 'Authentication failed' })
  }
}

module.exports = authMiddleware
