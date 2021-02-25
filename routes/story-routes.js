const { StoryController } = require('../controllers');

const router = require('express').Router();

router.get('/', StoryController.redirectReadAll)


router.get('/create', StoryController.showCreate)
router.post('/create', StoryController.create)

router.post('/:id/add-comment', StoryController.addComment)

router.get('/:id/delete-comment', StoryController.deleteComment)
router.get('/:id/delete-story', StoryController.delete)
router.get('/:id/share-story', StoryController.shareStory) // nodemailer

router.get('/:id', StoryController.readOne)

module.exports = router