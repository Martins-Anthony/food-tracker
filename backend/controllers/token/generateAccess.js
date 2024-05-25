const { jwt, jwt_secret, jwt_time } = require('./jwtConfig')

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id }, jwt_secret, {
    expiresIn: jwt_time,
  })
}

module.exports = { generateAccessToken }
