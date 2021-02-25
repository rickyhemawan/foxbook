const router = require('express').Router();
const userRoutes = require('./user-routes')
const storyRoutes = require('./story-routes')
const { StoryController, UserController } = require('../controllers')

const sessionMiddleware = require('../middlewares/session')

// Authentication Routes
router.get('/login', UserController.showLogin)
router.post('/login', UserController.login)
router.get('/register', UserController.showRegister)
router.post('/register', UserController.register)

// These can be accessed after login or register
router.get('/logout', UserController.logout)
router.get('/',sessionMiddleware, StoryController.readAll)
router.use('/user', sessionMiddleware, userRoutes)
router.use('/stories', sessionMiddleware,  storyRoutes)

module.exports = router