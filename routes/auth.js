const express = require('express');
const router = express.Router()

// @route   GET api/users
// @desc    Get a logged user
// @access  Private
router.get('/', (req, resp)=> {
  resp.send('Get a logged user')
})


// @route   POST api/users
// @desc    Auth user & get token
// @access  Public

router.post('/', (req, resp)=> {
  resp.send('Auth user')
})


module.exports = router;