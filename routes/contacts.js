const express = require('express');
const router = express.Router()

// @route   GET api/contacts
// @desc    Get all user contacts
// @access  Private
router.get('/', (req, resp)=> {
  resp.send('Get all contacts')
})


// @route   POST api/contacts
// @desc    Add a contact
// @access  Private
router.post('/', (req, resp)=> {
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