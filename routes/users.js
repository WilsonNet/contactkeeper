const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const User = require('../models/User')

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    check('name', 'name is required')
      .not()
      .isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('password', 'please include a password with 6 or more').isLength({
      min: 6
    })
  ],
  (req, resp) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() })
    }
    resp.send('passed')
  }
)

module.exports = router
