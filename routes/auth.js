const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const auth = require('../middleware/auth')

// @route   GET api/users
// @desc    Get a logged user
// @access  Private
router.get('/', auth, async (req, resp) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    resp.json(user)    
  } catch (err) {
    console.error(err.message)
    resp.status(500).resp({'msg': 'server error'})
  }
})

// @route   POST api/users
// @desc    Auth user & get token
// @access  Public

router.post(
  '/',
  [
    check('email', 'Please include a valid e-mail').isEmail(),
    check('password', 'Password is require').exists()
  ],

  async (req, resp) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      let user = await User.findOne({ email })
      if (!user) {
        return resp.status(400).json({ msg: 'invalid credentials' })
      }
      const isMatch = bcrypt.compare(password, user.password)

      if (!isMatch) {
        return resp.status(400).json({msg: 'invalid credentials'})
      }

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err
          resp.json({ token })
        }
      )
    } catch (error) {
      console.error(error.message)
      resp.status(500).send('Server Error')
    }
  }
)

module.exports = router
