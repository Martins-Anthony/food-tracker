const { jwt, jwt_secret } = require('../controllers/token/jwtConfig')

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('Authorization header missing')
    }
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      throw new Error('Token missing');
    }
    const decoded = jwt.verify(token, jwt_secret)

    if (!decoded || !decoded.userId) {
      throw new Error('Invalid token')
    }

    req.auth = {
      userId: decoded.userId,
    }

    next()
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' })
  }
}
