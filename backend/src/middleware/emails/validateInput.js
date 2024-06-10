const validator = require('validator')

module.exports = (req, res, next) => {
  try {
    const { email } = req.body
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ ok: false, message: 'email invalide' })
    }
    next()
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message })
  }
}
