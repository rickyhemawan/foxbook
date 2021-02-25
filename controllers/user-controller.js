const { User, Story, Comment } = require('../models')
const { parseErrorMessage } = require('../helpers/error-handler')
class UserController {

  // Authentications
  static showLogin(req, res) {
    res.render('login')
  }

  static showRegister(req, res) {
    res.render('register')
  }
  static login(req, res) {
    User.authenticate(req)
      .then(_ => res.redirect('/'))
      .catch(err => res.redirect(`/login?errors=${parseErrorMessage(err)}`))
  }

  static register(req, res) {
    
  }
  
  static logout(req, res) {
    req.session.destroy()
    res.redirect('/login')
  }

  // CRUD
  static read(req, res) {
    const { userId, username } = req.session
    const UserId = userId;
    Promise.all([
      User.findByPk(userId, { attributes: ['username', 'id', 'email'] }),
      Story.findAll({ where: { UserId }, order: [['createdAt', 'DESC']]}),
      Comment.findAll({ where: { UserId }, include: Story, order: [['createdAt', 'DESC']] })
    ])
    .then(([user, stories, comments]) => {
      res.render('users', { user, stories, comments, username })
    })
    .catch(err => res.send(err))
    
  }
  
}

module.exports = { UserController };