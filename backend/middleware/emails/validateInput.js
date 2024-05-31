const validator = require('validator')

module.exports = (req, res, next) => {
  const { email } = req.body
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ ok: false, message: 'email invalide' })
  }
  next()
}
