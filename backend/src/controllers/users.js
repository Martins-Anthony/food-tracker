require('dotenv').config()
const User = require('../models/User')
const { v4: uuidv4 } = require('uuid')
const { sendMagicLink } = require('./emails.js')
const { checkMagicLink } = require('./magicLink/check')
const {
  generateExpirationMagicLink,
} = require('./magicLink/generateExpiration')

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
    throw new Error(`Échec de la création de l'utilisateur`)
  }
}

const register = async (req, res) => {
  const { email } = req.body

  try {
    const newUser = await createUser(email)
    const user = await User.findOne({ email })
    generateExpirationMagicLink(user)
    await sendMagicLink(newUser.email, newUser.MagicLink.link, 'signup')

    return res.status(200).json({
      ok: true,
      message:
        'Votre compte a été créé. Veuillez vérifier votre boîte Mail pour le lien magique. 👻',
    })
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message })
  }
}

const login = async (req, res) => {
  const { email, magicLink } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(400)
        .json({ ok: false, message: 'Utilisateur non trouvé' })
    }
    if (!magicLink) {
      await sendMagicLink(email, user.MagicLink.link, 'login')
      return res.status(200).json({
        ok: true,
        message: `Cliquez sur le lien dans l'e-mail pour vous connecter`,
      })
    }
    const checkResult = await checkMagicLink(user, magicLink)
    if (checkResult.ok) {
      return res.status(200).json({ ok: true, checkResult })
    } else {
      return res.status(401).json({ ok: false, message: checkResult.message })
    }
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: `Erreur lors de la recherche de l'utilisateur`,
    })
  }
}

const resendLink = async (req, res) => {
  try {
    const user = req.user
    user.MagicLink = {
      link: uuidv4(),
      active: true,
    }
    generateExpirationMagicLink(user)
    user.refreshToken = null
    try {
      await user.updateOne({
        MagicLink: user.MagicLink,
        refreshToken: user.refreshToken,
      })

      await sendMagicLink(user.email, user.MagicLink.link, 'login')

      return res
        .status(200)
        .json({ ok: true, message: 'Lien envoyé par email' })
    } catch (saveError) {
      console.error("Erreur lors de la sauvegarde de l'utilisateur:", saveError)
      return res.status(500).json({
        ok: false,
        error: "Erreur lors de la sauvegarde de l'utilisateur",
      })
    }
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: `Erreur lors de la recherche de l'utilisateur`,
    })
  }
}

const logout = async (req, res) => {
  const { userId } = req.auth

  try {
    const user = await User.findOne({ _id: userId })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    user.refreshToken = null
    user.MagicLink = {
      link: null,
      expiration: null,
      active: false,
    }
    await user.save()

    return res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    return res.status(500).json({ message: 'Failed to log out' })
  }
}

module.exports = { login, register, resendLink, logout }
