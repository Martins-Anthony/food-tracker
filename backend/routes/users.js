const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const userCtrl = require('../controllers/users')
const refreshCtrl = require('../controllers/token/refresh')

router.post('/enter', userCtrl.login)
router.post('/register', userCtrl.register)
router.post('/refresh-token', auth, refreshCtrl.refresh)

module.exports = router
