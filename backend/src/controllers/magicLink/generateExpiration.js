const generateExpirationMagicLink = async (user) => {
  try {
    const expirationTime = 24 * 60 * 60 * 1000
    const expirationDate = new Date(Date.now() + expirationTime)

    user.MagicLink.expiration = expirationDate
    user.MagicLink.active = true

    await user.save()
    return expirationDate
  } catch (error) {
    throw new Error('Could not generate expiration date')
  }
}

module.exports = { generateExpirationMagicLink }