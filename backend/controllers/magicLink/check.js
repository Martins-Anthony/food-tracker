const User = require('../../models/User')
const { v4: uuidv4 } = require('uuid')
const { generateExpirationMagicLink } = require('./generateExpiration')
const { generateAccessToken } = require('../token/generateAccess')
const { sendMagicLink } = require('../emails')

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
      await User.findOneAndUpdate(
        { email: user.email },
        { MagicLink: { link: uuidv4(), active: false } },
      )
      await sendMagicLink(user.email, user.MagicLink.link, 'signup')
      return {
        ok: true,
        message: 'Magic link expired. New link sent to email',
      }
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
