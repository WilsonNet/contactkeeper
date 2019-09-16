const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, resp, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if(!token) {
    return resp.status(401).json({msg: 'No token, authorization denied'})
  }

  try {
    const decode = jwt.verify(token, config.get('jwtSecret'))

    req.user = decoded.user;
    next()
  } catch (error) {
    resp.status(401).json({'msg': 'token is not valid'})
  }
}