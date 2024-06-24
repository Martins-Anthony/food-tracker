const User = require('../../models/User')
const { generateAccessToken } = require('./generateAccess')

const refresh = async (req, res) => {
  const refreshToken = req.header('Authorization').replace('Bearer ', '')

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token is missing' })
  }

  try {
    const user = await User.findById(req.auth.userId)

    if (!user || user.refreshToken !== refreshToken) {
      throw new Error('Utilisateur non trouvé')
    }

    const newAccessToken = generateAccessToken(user)

    return res.status(200).json({ newAccessToken })
  } catch (error) {
    return res.status(401).json({ message: `Jeton d'actualisation invalide` })
  }
}

module.exports = { refresh }
