const express = require('express')
const router = express.Router()
const magicLinkCtrl = require('../controllers/emails')
const passportCtrl = require('../controllers/passport')

router.post('/send-magic-link', passportCtrl.authenticate('magic-login'))
router.get(
  '/magic-link',
  passportCtrl.authenticate('magic-login'),
  (req, res) => {
    res.json({
      message: 'Magic link authentication successful!',
      user: req.user,
    })
  },
)

module.exports = router
