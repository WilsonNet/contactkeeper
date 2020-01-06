const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth.js');
const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    Get all user contacts
// @access  Private
router.get('/', auth, async (req, resp) => {
  console.log('User Id: ', req.user.id);
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    resp.json(contacts);
  } catch (error) {
    console.error(error.message);
    resp.status(500).send('server error');
  }
});

// @route   POST api/contacts
// @desc    Add a contact
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();
      resp.json(contact);
    } catch (error) {
      console.error(error.message);
      resp.status(500).send({ msg: 'Internal server error' });
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Update a contact
// @access  Private
router.put('/:id', auth, async (req, resp) => {
  const { name, email, phone, type } = req.body;
  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return resp.status(404).json({ msg: 'Contact not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      resp.status(401).json({ msg: 'Not authorized' });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    resp.json(contact);
  } catch (error) {
    console.error(error.message);
    resp.status(500).send('Server Error');
  }
});

// @route   DELETE api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', (req, resp) => {
  resp.send('Delete a contact');
});

module.exports = router;
