const User = require('../../models/User')
const { v4: uuidv4 } = require('uuid')
const { sendMagicLink } = require('../emails')

const updateMagicLink = async (user) => {
  try {
    const newMagicLink = uuidv4()
    user.MagicLink = {
      link: newMagicLink,
      active: false,
      expiration: new Date(Date.now() + 24 * 60 * 60 * 1000),
    }
    await user.save()
    await sendMagicLink(user.email, newMagicLink, 'signup')
    return {
      ok: true,
      message: 'Le lien magique a expiré. Nouveau lien envoyé par email',
    }
  } catch (error) {
    throw new Error('Impossible de mettre à jour le lien magique')
  }
}

module.exports = { updateMagicLink }
