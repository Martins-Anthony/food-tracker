const User = require('../../models/User')

module.exports = async (req, res, next) => {
  const { email } = req.body
  try {
    const user = await User.findOne({
      email: email,
    })
    if (user) {
      req.user = user
    } else if (!user) {
      return res
        .status(404)
        .json({ ok: false, message: 'Utilisateur non trouvé' })
    }
    next()
  } catch (error) {
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}
