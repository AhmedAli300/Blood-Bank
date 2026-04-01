const BloodBankModel = require('./bank.model')
const UserModel = require('../users/user.model')

class BloodBankController {
  static async getAll(req, res) {
    try {
      const banks = await BloodBankModel.findAll()
      res.status(200).json({ message: 'Blood banks retrieved successfully', data: banks, count: banks.length })
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve blood banks', message: error.message })
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params
      if (!id || isNaN(id)) return res.status(400).json({ error: 'Valid bank ID is required' })
      const bank = await BloodBankModel.findById(Number(id))
      if (!bank) return res.status(404).json({ error: 'Blood bank not found' })
      res.status(200).json({ message: 'Blood bank retrieved successfully', data: bank })
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve blood bank', message: error.message })
    }
  }

  static async create(req, res) {
    try {
      const { name, governorate, city, address, working_hours } = req.body
      if (!name || !governorate || !city) return res.status(400).json({ error: 'name, governorate and city are required' })
      const imagePath = req.file ? `banks/${req.file.filename}` : null
      const bank = await BloodBankModel.create({ name, governorate, city, address, working_hours, image: imagePath })
      res.status(201).json({ message: 'Blood bank created successfully', data: bank })
    } catch (error) {
      res.status(400).json({ error: 'Failed to create blood bank', message: error.message })
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params
      const { name, governorate, city, address, working_hours } = req.body
      if (!id || isNaN(id)) return res.status(400).json({ error: 'Valid bank ID is required' })
      const imagePath = req.file ? `banks/${req.file.filename}` : undefined
      const bank = await BloodBankModel.update(Number(id), { name, governorate, city, address, working_hours, image: imagePath })
      res.status(200).json({ message: 'Blood bank updated successfully', data: bank })
    } catch (error) {
      res.status(400).json({ error: 'Failed to update blood bank', message: error.message })
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params
      if (!id || isNaN(id)) return res.status(400).json({ error: 'Valid bank ID is required' })
      const deleted = await BloodBankModel.delete(Number(id))
      if (!deleted) return res.status(404).json({ error: 'Blood bank not found' })
      res.status(200).json({ message: 'Blood bank deleted successfully', data: deleted })
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete blood bank', message: error.message })
    }
  }

  static async createBankAdmin(req, res) {
    try {
      const { bankId } = req.params
      const { name, email, password, phone } = req.body

      if (!bankId || isNaN(bankId)) {
        return res.status(400).json({ error: 'Valid bank ID is required' })
      }

      if (!name || !email || !password || !phone) {
        return res.status(400).json({ error: 'name, email, password, and phone are required' })
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' })
      }

      // Validate password length
      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' })
      }

      // Check if bank exists
      const bank = await BloodBankModel.findById(Number(bankId))
      if (!bank) {
        return res.status(404).json({ error: 'Blood bank not found' })
      }

      // Check if email already exists
      const existingUser = await UserModel.findByEmail(email)
      if (existingUser) {
        return res.status(409).json({ error: 'User with this email already exists' })
      }

      // Check if bank already has an admin
      const existingAdmin = await UserModel.findByBankId(Number(bankId))
      if (existingAdmin) {
        return res.status(409).json({ 
          error: 'This bank already has an admin assigned',
          existing_admin: {
            id: existingAdmin.id,
            name: existingAdmin.name,
            email: existingAdmin.email
          }
        })
      }

      // Create bank admin
      const bankAdmin = await UserModel.createBankAdmin({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        phone: phone.trim(),
        bank_id: Number(bankId)
      })

      res.status(201).json({
        message: 'Bank admin created successfully',
        data: {
          id: bankAdmin.id,
          name: bankAdmin.name,
          email: bankAdmin.email,
          role: bankAdmin.role,
          bank_id: bankAdmin.bank_id,
          phone: bankAdmin.phone,
          created_at: bankAdmin.created_at
        }
      })

    } catch (error) {
      console.error('Create bank admin error:', error)
      res.status(500).json({ error: 'Failed to create bank admin', message: error.message })
    }
  }
}

module.exports = BloodBankController
