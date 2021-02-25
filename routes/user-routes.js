const router = require('express').Router();
const { UserController } = require('../controllers')

router.get('/', UserController.read)

module.exports = router