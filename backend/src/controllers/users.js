require('dotenv').config()
const User = require('../models/User')
const { v4: uuidv4 } = require('uuid')
const { sendMagicLink } = require('./emails.js')
const { checkMagicLink } = require('./magicLink/check')

const createUser = async (email) => {
  try {
    const newUser = {
      email: email,
      MagicLink: {
        link: uuidv4(),
      },
    }
    await User.create(newUser)
    return newUser
  } catch (error) {
    throw new Error('Failed to create user')
  }
}

const register = async (req, res) => {
  const { email } = req.body

  try {
    const newUser = await createUser(email)

    await sendMagicLink(newUser.email, newUser.MagicLink.link, 'signup')

    return res.status(200).json({
      ok: true,
      message:
        'Your account has been created. Please check your email for the magic link. 👻',
    })
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message })
  }
}

const login = async (req, res) => {
  const { email, magicLink } = req.body
  const { user } = req

  try {
    if (!magicLink) {
      await sendMagicLink(email, user.MagicLink.link, 'login')
      return res
        .status(200)
        .json({ ok: true, message: 'Hit the link in email to sign in' })
    }
    const checkResult = await checkMagicLink(user, magicLink)
    if (checkResult.ok) {
      return res.status(200).json({ ok: true, checkResult })
    }
    return res.status(401).json({ ok: false, message: checkResult.message })
  } catch (error) {
    return res.status(400).json({ ok: false, error: 'Error finding user' })
  }
}

const resendLink = async (req, res) => {
  try {
    const { email } = req.body
    const user = req.user

    await sendMagicLink(email, user.MagicLink.link, 'login')
    return res.status(200).json({ ok: true, message: 'Lien envoyé par email' })
  } catch (error) {
    return res.status(400).json({ ok: false, error: 'Error finding user' })
  }
}

module.exports = { login, register, resendLink }
