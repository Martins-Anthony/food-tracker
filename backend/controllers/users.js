require('dotenv').config()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const jwt_secret = process.env.SECRET_KEY
const jwt_time = process.env.JWT_TIME
const { v4: uuidv4 } = require('uuid')
const { send_magic_link } = require('./emails.js')

const register = async (req, res) => {
  const { email } = req.body
  try {
    const newUser = {
      email: email,
      MagicLink: uuidv4(),
    }

    let user = await User.create(newUser)

    await send_magic_link(email, user.MagicLink, 'signup')
    return { ok: true, message: 'User created' }
  } catch (error) {
    return { ok: false, error }
  }
}

const login = async (req, res) => {
  const { email, magicLink } = req.body

  try {
    let user = await User.findOne({ email: email })
    if (!email) {
      return res.status(400).json({ ok: false, error: 'Email is required' })
    } else if (!validator.isEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Email is invalid' })
    } else if (!user) {
      let reg = await register(email)
      res.send({
        ok: true,
        message:
          'Your account has been created. Please check your email for the magic link. 👻',
      })
    } else if (!magicLink) {
      user = await User.findOneAndUpdate(
        { email: email },
        { MagicLink: uuidv4(), MagicLinkExpired: false },
        { returnDocument: 'after' },
      )
      await send_magic_link(email, user.MagicLink)
      return res.send({ ok: true, message: 'Hit the link in email to sign in' })
    } else if (user.MagicLink == magicLink && !user.MagicLinkExpired) {
      let token = jwt.sign(user.toJSON(), jwt_secret, { expiresIn: jwt_time })
      await User.findOneAndUpdate({ email: email }, { MagicLinkExpired: true })

      const currentTime = Math.floor(Date.now() / 1000)
      const tokenExpiration = jwt.decode(token).exp
      const timeUntilExpiration = tokenExpiration - currentTime

      if (timeUntilExpiration < 300) {
        token = jwt.sign(user.toJSON(), jwt_secret, { expiresIn: jwt_time })
      }
      return res.status(200).json({
        ok: true,
        message: 'Welcome back',
        token,
        email,
        timeUntilExpiration,
      })
    } else {
      user = await User.findOneAndUpdate(
        { email: email },
        { MagicLink: uuidv4(), MagicLinkExpired: false },
        { returnDocument: 'after' },
      )
      await send_magic_link(email, user.MagicLink)
      return res
        .status(400)
        .json({ ok: false, message: 'Magic link is invalid or expired 🤔' })
    }
  } catch (error) {
    return res.status(400).json({ ok: false, error: 'Error finding user' })
  }
}

const verify_token = (req, res) => {
  const token = req.headers.authorization
  console.log('TOKEN', token)
  jwt.verify(token, jwt_secret, (err, user) => {
    err
      ? res.json({ ok: false, message: 'something went wrong' })
      : res.json({ ok: true, user })
  })
}

module.exports = { login, verify_token, register }
