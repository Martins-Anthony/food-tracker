const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const storageAreaCtrl = require('../controllers/storage/storageArea')
const storageCtrl = require('../controllers/storage/getStorage')

router.post('/postStorageArea', auth, storageAreaCtrl.postStorageArea)
router.delete('/deleteStorageArea', auth, storageAreaCtrl.deleteStorageArea)
router.get('/storages', auth, storageCtrl.getStorage)

module.exports = router