const User = require('../../models/User')
const { generateAccessToken } = require('./generateAccess')

const refresh = async (req, res) => {
  const { userId } = req.auth

  try {
    const user = await User.findById({ _id: userId })

    if (!user) {
      throw new Error('User not found')
    }

    const newAccessToken = generateAccessToken(user)

    return res.status(200).json({ newAccessToken })
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' })
  }
}

module.exports = { refresh }
