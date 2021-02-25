const { StoryController } = require('../controllers');

const router = require('express').Router();

router.get('/:id', StoryController.readOne)

module.exports = router