const router = require('express').Router();
const { UserController } = require('../controllers')

// Untuk Create nya terletak pada register endpoint /register
router.get('/', UserController.read)
router.post('/update', UserController.update)
router.get('/delete', UserController.delete)

module.exports = router