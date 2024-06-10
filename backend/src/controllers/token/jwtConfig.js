require('dotenv').config()
const jwt = require('jsonwebtoken')

const jwtConfig = {
  jwt_secret: process.env.SECRET_KEY,
  jwt_time: process.env.JWT_TIME,
  jwt: jwt,
}

module.exports = jwtConfig
