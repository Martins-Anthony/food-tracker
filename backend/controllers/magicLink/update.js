const User = require('../../models/User')
const { v4: uuidv4 } = require('uuid')
const { sendMagicLink } = require('../emails')

const updateMagicLink = async (user) => {
  try {
    const newMagicLink = uuidv4()
    await User.findOne(
      { email: user.email },
      { MagicLink: { link: newMagicLink, active: false } },
    )
    await sendMagicLink(user.email, newMagicLink, 'signup')
    return { ok: true, message: 'Magic link expired. New link sent to email' }
  } catch (error) {
    throw new Error('Could not update magic link')
  }
}

module.exports = { updateMagicLink }