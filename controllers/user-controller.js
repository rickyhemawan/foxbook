const { User, Story, Comment } = require('../models')
const { parseErrorMessage } = require('../helpers/error-handler')
class UserController {

  // Authentications
  static showLogin(req, res) {
    const { errors } = req.query
    res.render('login', { errors })
  }

  static showRegister(req, res) {
    const { errors } = req.query
    res.render('register', { errors })
  }
  static login(req, res) {
    User.authenticate(req)
      .then(_ => res.redirect('/'))
      .catch(err => {
        if(!err.errors) return res.send(err)
        const errors = parseErrorMessage(err)
        res.redirect(`/login?errors=${errors}`)
      })
  }

  static register(req, res) {
    User.create(req.body)
      .then(_ => User.authenticate(req))
      .then(_ => res.redirect('/'))
      .catch(err => {
        if(!err.errors) return res.send(errors)
        const errors = parseErrorMessage(err)
        res.redirect(`/register?errors=${errors}`)
      })
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