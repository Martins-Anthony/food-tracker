const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const validateInput = require('../middleware/emails/validateInput')
const findUserByEmail = require('../middleware/users/findUserByEmail')
const userCtrl = require('../controllers/users')
const refreshCtrl = require('../controllers/token/refresh')

router.post('/enter', validateInput, findUserByEmail, userCtrl.login)
router.post('/register', validateInput, findUserByEmail, userCtrl.register)
router.post('/resendLink', validateInput, findUserByEmail, userCtrl.resendLink)
router.post('/refresh-token', auth, refreshCtrl.refresh)

module.exports = router
