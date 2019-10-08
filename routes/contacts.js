const express = require('express');
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth.js')
const User = require('../models/User')
const Contact = require('../models/Contact')


// @route   GET api/contacts
// @desc    Get all user contacts
// @access  Private
router.get('/', auth, async (req, resp)=> {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 })
    resp.json(contacts)
  } catch (error) {
    console.error(error.message)
    resp.status(500).send('server error')
  }
})


// @route   POST api/contacts
// @desc    Add a contact
// @access  Private
router.post('/', [auth, [
  check('name')
]], (req, resp)=> {
  resp.send('Add a contact');
})

// @route   PUT api/contacts/:id
// @desc    Update a contact
// @access  Private
router.put('/:id', (req, resp)=> {
  resp.send('Update a contact');
})

// @route   DELETE api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', (req, resp)=> {
  resp.send('Delete a contact');
})



module.exports = router;