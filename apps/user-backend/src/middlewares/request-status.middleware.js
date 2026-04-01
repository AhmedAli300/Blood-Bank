const RequestModel = require('../modules/requests/request.model')

// Valid status transitions according to SYSTEM_LIFECYCLE.md
const VALID_TRANSITIONS = {
  'DRAFT': ['CREATED'],
  'CREATED': ['SENT_TO_BANK'],
  'SENT_TO_BANK': [], // Only bank-service can transition from here
  'APPROVED': ['PAYMENT_PENDING'],
  'PAYMENT_PENDING': ['PAID'],
  'REJECTED': [], // Terminal state
  'PAID': [] // Terminal state
}

/**
 * Validate status transition
 * @param {string} currentStatus - Current request status
 * @param {string} newStatus - Desired new status
 * @returns {boolean} True if transition is valid
 */
const isValidTransition = (currentStatus, newStatus) => {
  if (currentStatus === newStatus) return true // No change is always valid
  const allowedTransitions = VALID_TRANSITIONS[currentStatus] || []
  return allowedTransitions.includes(newStatus)
}

/**
 * Middleware to validate request status transitions
 * Ensures users cannot bypass the proper workflow
 */
const validateStatusTransition = (allowedTargetStatuses = []) => {
  return async (req, res, next) => {
    try {
      const { id } = req.params
      const userId = req.user.userId

      if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Valid request ID is required' })
      }

      const request = await RequestModel.findById(id)
      if (!request) {
        return res.status(404).json({ error: 'Request not found' })
      }

      // Verify ownership
      if (request.user_id !== userId && req.user.role !== 'SUPER_ADMIN') {
        return res.status(403).json({ error: 'You can only modify your own requests' })
      }

      // If specific target statuses are provided, validate against them
      if (allowedTargetStatuses.length > 0) {
        const targetStatus = allowedTargetStatuses[0] // Primary target status
        
        if (!isValidTransition(request.status, targetStatus)) {
          return res.status(400).json({
            error: `Invalid status transition from ${request.status} to ${targetStatus}`,
            current_status: request.status,
            allowed_transitions: VALID_TRANSITIONS[request.status] || []
          })
        }
      }

      // Attach request to req for use in controller
      req.request = request
      next()

    } catch (error) {
      console.error('Status transition validation error:', error)
      return res.status(500).json({ error: 'Status validation failed', message: error.message })
    }
  }
}

/**
 * Middleware to validate documents are uploaded before sending to bank
 */
const validateDocumentsRequired = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.userId

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Valid request ID is required' })
    }

    const request = await RequestModel.findById(id)
    if (!request) {
      return res.status(404).json({ error: 'Request not found' })
    }

    // Verify ownership
    if (request.user_id !== userId && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ error: 'You can only modify your own requests' })
    }

    // Check documents are uploaded
    if (!request.national_id_image_url || !request.medical_proof_image_url) {
      return res.status(400).json({
        error: 'Documents required',
        message: 'Both national ID and medical proof documents must be uploaded before sending to bank',
        missing: {
          national_id: !request.national_id_image_url,
          medical_proof: !request.medical_proof_image_url
        }
      })
    }

    req.request = request
    next()

  } catch (error) {
    console.error('Document validation error:', error)
    return res.status(500).json({ error: 'Document validation failed', message: error.message })
  }
}

/**
 * Middleware to validate request can be modified (not in terminal state)
 */
const validateRequestModifiable = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.userId

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Valid request ID is required' })
    }

    const request = await RequestModel.findById(id)
    if (!request) {
      return res.status(404).json({ error: 'Request not found' })
    }

    // Verify ownership
    if (request.user_id !== userId && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ error: 'You can only modify your own requests' })
    }

    // Check if request is in a modifiable state
    const terminalStates = ['REJECTED', 'PAID', 'SENT_TO_BANK', 'APPROVED']
    if (terminalStates.includes(request.status)) {
      return res.status(400).json({
        error: 'Request cannot be modified',
        message: `Request is in ${request.status} status and cannot be modified`,
        current_status: request.status
      })
    }

    req.request = request
    next()

  } catch (error) {
    console.error('Request modification validation error:', error)
    return res.status(500).json({ error: 'Validation failed', message: error.message })
  }
}

module.exports = {
  validateStatusTransition,
  validateDocumentsRequired,
  validateRequestModifiable,
  isValidTransition,
  VALID_TRANSITIONS
}
