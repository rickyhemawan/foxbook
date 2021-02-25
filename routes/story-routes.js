const { StoryController } = require('../controllers');

const router = require('express').Router();

router.get('/', StoryController.redirectReadAll)


router.get('/create', StoryController.showCreate)
router.post('/create', StoryController.create)

router.post('/:id/add-comment', StoryController.addComment)
router.get('/:id', StoryController.readOne)

module.exports = router