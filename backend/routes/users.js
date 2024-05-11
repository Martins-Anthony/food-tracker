const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/users')

router.post('/enter', userCtrl.login)
router.post('/verify', userCtrl.verify_token)
router.post('/register', userCtrl.register)

module.exports = router
