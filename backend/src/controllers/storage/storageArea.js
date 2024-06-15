const User = require('../../models/User')

const addStorageArea = async (req, res) => {
  const { newStorageArea } = req.body
  const { userId } = req.auth

  try {
    const user = await User.findOne({
      _id: userId,
      'storage.storageArea': newStorageArea,
    })
    if (user) {
      console.log('Zone de stockage déjà existante:', user)
      return res
        .status(200)
        .json({ ok: true, message: 'Zone de stockage déjà existante' })
    }

    const result = await User.updateOne(
      { _id: userId },
      { $push: { 'storage.storageArea': newStorageArea } },
    )
    return res
      .status(200)
      .json({ ok: true, message: 'Zone de stockage ajoutée' })
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message })
  }
}

module.exports = { addStorageArea }