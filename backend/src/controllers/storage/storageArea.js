const User = require('../../models/User')

const deleteStorageArea = async (req, res) => {
  const { deleteStorageArea } = req.body
  const { userId } = req.auth
  try {
    console.log('delete storage', userId)
    const user = await User.findOne({
      _id: userId,
      'storage.name': deleteStorageArea,
    })

    if (!user) {
      console.log('Zone de stockage introuvable:', deleteStorageArea)
      return res
        .status(200)
        .json({ ok: true, message: 'Zone de stockage introuvable' })
    }

    const result = await User.updateOne(
      { _id: userId },
      { $pull: { storage: { name: deleteStorageArea, items: [] } } },
    )

    if (result.nModified === 0) {
      return res.status(200).json({
        ok: false,
        message: 'Échec de la suppression de la zone de stockage',
      })
    }

    return res
      .status(200)
      .json({ ok: true, message: 'Zone de stockage supprimer avec succès' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ ok: false, error: error.message })
  }
}

const postStorageArea = async (req, res) => {
  const { newStorageArea } = req.body
  const { userId } = req.auth
  try {
    const user = await User.findOne({
      _id: userId,
      'storage.name': newStorageArea,
    })

    if (user) {
      console.log('Zone de stockage déjà existante:', user)
      return res
        .status(200)
        .json({ ok: true, message: 'Zone de stockage déjà existante' })
    }

    const result = await User.updateOne(
      { _id: userId },
      { $push: { storage: { name: newStorageArea, items: [] } } },
    )

    return res
      .status(200)
      .json({ ok: true, message: 'Zone de stockage ajoutée' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ ok: false, error: error.message })
  }
}

module.exports = { postStorageArea, deleteStorageArea }
