const User = require('../../models/User')

exports.getStorage = async (req, res) => {
  const { userId } = req.auth
  try {
    const user = await User.findOne({ _id: userId })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    return res.status(200).json({ ok: true, storage: user.storage })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
