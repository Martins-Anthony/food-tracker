const generateExpirationMagicLink = async (user) => {
  try {
    const userUpdate = user
    const expirationTime = 24 * 60 * 60 * 1000
    const expirationDate = new Date(Date.now() + expirationTime)

    userUpdate.MagicLink = {
      ...userUpdate.MagicLink,
      expiration: expirationDate,
    }

    await userUpdate.updateOne({
      MagicLink: userUpdate.MagicLink,
    })

    return expirationDate
  } catch (error) {
    throw new Error('Could not generate expiration date')
  }
}

module.exports = { generateExpirationMagicLink }
