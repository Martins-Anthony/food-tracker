const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('Authorization header missing')
    }
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.auth = {
      userId: decoded.userId,
    }
    next()
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' })
  }
}
