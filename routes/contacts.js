const express = require('express');
const router = express.Router()

// @route   GET api/contacts
// @desc    Get all user contacts
// @access  Private
router.get('/', (req, resp)=> {
  Response.send('Get all contacts')
})


// @route   POST api/contacts
// @desc    Add a contact
// @access  Private
router.get('/', (req, resp)=> {
  Response.send('Add a contact');
})

// @route   PUT api/contacts/:id
// @desc    Update a contact
// @access  Private
router.get('/:id', (req, resp)=> {
  Response.send('Update a contact');
})

// @route   DELETE api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', (req, resp)=> {
  Response.send('Delete a contact');
})



module.exports = router;