const User = require('../../models/User')

module.exports = async (req, res, next) => {
  const { email } = req.body
  const routeType = req.route.path
  try {
    const user = await User.findOne({ email })

    switch (routeType) {
      case '/enter':
      case '/resendLink':
        if (user) {
          req.user = user
        } else {
          return res
            .status(404)
            .json({ ok: false, message: 'Utilisateur non trouvé' })
        }
        break
      case '/register':
        if (user) {
          return res
            .status(200)
            .json({ ok: true, message: 'Vous êtes déjà inscrit' })
        } else {
          req.user = user
        }
        break
      default:
        break
    }
    next()
  } catch (error) {
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}
