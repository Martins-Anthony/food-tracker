const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const storageAreaCtrl = require('../controllers/storage/storageArea')
const storageCtrl = require('../controllers/storage/getStorage')

router.post('/storageArea', auth, storageAreaCtrl.addStorageArea)
router.get('/storages', auth, storageCtrl.getStorage)

module.exports = router