const {
  jwt,
  jwt_secret,
  jwt_secret_refresh,
} = require('../controllers/token/jwtConfig')

module.exports = (req, res, next) => {
  const routeType = req.route.path

  try {
    if (!req.headers.authorization) {
      throw new Error('Authorization header missing')
    }
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      throw new Error('Token missing')
    }

    let decoded

    switch (routeType) {
      case '/refresh-token':
        decoded = jwt.verify(token, jwt_secret_refresh)
        break
      default:
        decoded = jwt.verify(token, jwt_secret)
        break
    }

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
