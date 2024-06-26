const User = require('../../models/User')

const postItemInStorage = async (req, res) => {
  const { areaName, newItem } = req.body
  const { userId } = req.auth
  try {
    const user = await User.findOne({
      _id: userId,
      'storage.name': areaName,
    })

    if (!user) {
      return res
        .status(200)
        .json({ ok: true, message: 'Zone de stockage introuvable' })
    }

    const result = await User.updateOne(
      { _id: userId, 'storage.name': areaName },
      { $push: { 'storage.$.items': newItem } },
    )

    if (result.nModified === 0) {
      return res.status(200).json({
        ok: false,
        message: 'Échec de la mise à jour de la zone de stockage',
      })
    }

    return res
      .status(200)
      .json({ ok: true, message: 'Élément ajouté à la zone de stockage' })
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message })
  }
}

const deleteItemInStorage = async (req, res) => {
  const { deleteItemInStorage } = req.body
  const { userId } = req.auth
  try {
    const user = await User.findOne({
      _id: userId,
      'storage.items._id': deleteItemInStorage,
    })

    if (!user) {
      return res.status(200).json({ ok: true, message: 'Élément introuvable' })
    }

    const result = await User.updateOne(
      { _id: userId, 'storage.items._id': deleteItemInStorage },
      { $pull: { 'storage.$.items': { _id: deleteItemInStorage } } },
    )

    if (result.nModified === 0) {
      return res.status(200).json({
        ok: false,
        message: "Échec de la suppression de l'élément",
      })
    }

    return res
      .status(200)
      .json({ ok: true, message: 'Élément supprimer avec succès' })
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message })
  }
}

module.exports = { postItemInStorage, deleteItemInStorage }
