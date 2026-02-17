


const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
 const UserModel = require('../users/user.model')
const nodemailer = require("nodemailer")

class AuthController {

  // ================= REGISTER =================
  static async register(req, res) {
    try {
      const { name, email, password, phone } = req.body

      if (!name || !email || !password || !phone) {
        return res.status(400).json({ error: 'Name, email, password, and phone are required' })
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' })
      }

      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
        return res.status(400).json({ error: 'Invalid phone number format' })
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' })
      }

      const existingUser = await UserModel.findByEmail(email)
      if (existingUser) {
        return res.status(409).json({ error: 'User with this email already exists' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const userData = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: 'USER',
        phone: phone.trim()
      }

      const newUser = await UserModel.create(userData)

      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      )

      await UserModel.updateToken(newUser.id, token)

      const { password: _, ...userWithoutPassword } = newUser

      res.status(201).json({
        message: 'Registration successful',
        token,
        user: userWithoutPassword
      })

    } catch (error) {
      console.error('Registration error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // ================= LOGIN =================
  static async login(req, res) {
  try {
    let { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    email = email.toLowerCase().trim()

    const user = await UserModel.findByEmail(email)
    if (!user) return res.status(401).json({ error: 'Invalid credentials (email)' })

    if (!user.password) {
      return res.status(500).json({ error: "Password missing in database" })
    }

    console.log("INPUT:", password)
    console.log("DB:", user.password)

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid)
      return res.status(401).json({ error: 'Invalid credentials (password)' })

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    )

    await UserModel.updateToken(user.id, token)

    const { password: _, ...userWithoutPassword } = user

    res.status(200).json({
      message: 'Login successful',
      token,
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// ================= FORGOT PASSWORD =================
static async forgotPassword(req, res) {
  const { email } = req.body
  try {
    const user = await UserModel.findByEmail(email)
    if (!user) return res.status(400).json({ message: "Email does not exist" })

    const otp = Math.floor(100000 + Math.random() * 900000)
    const expires = new Date(Date.now() + 10 * 60 * 1000)

    await UserModel.createPasswordReset(user.id, otp, expires)

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.SMTP_PASS },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your password reset code: ${otp}\nValid for 10 minutes`
    })

    res.json({ message: "OTP sent to your email" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// ================= RESET PASSWORD =================
static async resetPassword(req, res) {
  const { otp, password, confirm_password } = req.body
  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match" })
  }

  try {
    const reset = await UserModel.findPasswordReset(otp)
    if (!reset) return res.status(400).json({ message: "Invalid or expired OTP" })

    const hashedPassword = await bcrypt.hash(password, 10)
    await UserModel.updatePassword(reset.user_id, hashedPassword)
    await UserModel.deletePasswordReset(otp)

    res.json({ message: "Password changed successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

}

module.exports = AuthController
