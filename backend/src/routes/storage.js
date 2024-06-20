const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const storageAreaCtrl = require('../controllers/storage/storageArea')
const storageCtrl = require('../controllers/storage/getStorage')
const itemInStorageCtrl = require('../controllers/storage/itemInStorage')

router.post('/StorageArea', auth, storageAreaCtrl.postStorageArea)
router.post('/ItemInStorage', auth, itemInStorageCtrl.postItemInStorage)

router.delete('/StorageArea', auth, storageAreaCtrl.deleteStorageArea)

router.put('/StorageArea', auth, storageAreaCtrl.putStorageArea)

router.get('/storages', auth, storageCtrl.getStorage)

module.exports = router