require('dotenv').config()
const jwt = require('jsonwebtoken')

const jwtConfig = {
  jwt_secret: process.env.SECRET_KEY,
  jwt_time: process.env.JWT_TIME,
  jwt_time_refresh: process.env.JWT_REFRESH_TIME,
  jwt_secret_refresh: process.env.JWT_REFRESH_SECRET,
  jwt: jwt,
}

module.exports = jwtConfig
