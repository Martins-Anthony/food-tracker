const User = require('../../models/User')
const { generateExpirationMagicLink } = require('./generateExpiration')
const { generateAccessToken } = require('../token/generateAccess')
const { updateMagicLink } = require('./update')

const checkMagicLink = async (user, magicLink) => {
  try {
    if (user.MagicLink.link === magicLink && !user.MagicLink.active) {
      const token = generateAccessToken(user)
      await generateExpirationMagicLink(user)
      return {
        ok: true,
        message: `Welcome ${user.name}`,
        token,
        email: user.email,
        magicLink: user.MagicLink.link,
      }
    } else if (user.MagicLink.expiration < Date.now()) {
      updateMagicLink(user)
    } else if (
      user.MagicLink.expiration > Date.now() &&
      user.MagicLink.active
    ) {
      const token = generateAccessToken(user)
      return {
        ok: true,
        message: `Welcome ${user.name}`,
        token,
        email: user.email,
        magicLink: user.MagicLink.link,
      }
    } else {
      return { ok: false, message: 'Magic link already sent to email' }
    }
  } catch (error) {
    throw new Error('Could not check magic link')
  }
}

module.exports = { checkMagicLink }
