const User = require('../../models/User')
const { generateExpirationMagicLink } = require('./generateExpiration')
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../token/generateAccess')

const checkMagicLink = async (user, magicLink) => {
  try {
    if (user.MagicLink.expiration < Date.now()) {
      return {
        ok: false,
        message: 'Le lien magique a expiré. Nouveau lien envoyé par email',
      }
    }

    if (user.MagicLink.link === magicLink && user.MagicLink.active) {
      const token = generateAccessToken(user)
      await generateExpirationMagicLink(user)
      const refreshToken = generateRefreshToken(user)
      user.refreshToken = refreshToken

      user.MagicLink.active = false
      await user.save()

      return {
        ok: true,
        message: `Welcome ${user.name}`,
        token,
        refreshToken,
        email: user.email,
      }
    } else {
      console.log('Invalid login', user, magicLink)
      return { ok: false, message: 'Lien magique invalide ou déjà utilisé' }
    }
  } catch (error) {
    throw new Error('Impossible de vérifier le lien magique')
  }
}

module.exports = { checkMagicLink }
