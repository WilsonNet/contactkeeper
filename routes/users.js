const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')
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
  async (req, resp) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (user) {
        return resp.status(400).json({ msg: 'User already exists' })
      }

      user = new User({
        name,
        email,
        password
      })

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()

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
    } catch (err) {
      console.error(err.message)
      resp.status(500).send('Server error')
    }
  }
)

module.exports = router
