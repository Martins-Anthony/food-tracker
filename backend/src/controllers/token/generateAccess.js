const {
  jwt,
  jwt_secret,
  jwt_time,
  jwt_time_refresh,
  jwt_secret_refresh,
} = require('./jwtConfig')

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id }, jwt_secret, {
    expiresIn: jwt_time,
  })
}

const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user._id }, jwt_secret_refresh, {
    expiresIn: jwt_time_refresh,
  })
}

module.exports = { generateAccessToken, generateRefreshToken }
