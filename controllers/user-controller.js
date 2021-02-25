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

  // User Manipulation
  static read(req, res) {
    const { userId, username } = req.session
    const { errors } = req.query
    const UserId = userId;
    Promise.all([
      User.findByPk(userId, { attributes: ['username', 'id', 'email'] }),
      Story.findAll({ where: { UserId }, order: [['createdAt', 'DESC']]}),
      Comment.findAll({ where: { UserId }, include: Story, order: [['createdAt', 'DESC']] })
    ])
    .then(([user, stories, comments]) => {
      res.render('users', { user, stories, comments, username, errors })
    })
    .catch(err => res.send(err))
    
  }

  static update(req, res){
    const id = req.session.userId;
    User.update(req.body, { where: { id } })
      .then(_ => res.redirect('/logout'))
      .catch(err => {
        if(!err.errors) return res.send(errors)
        const errors = parseErrorMessage(err)
        res.redirect(`/user?errors=${errors}`)
      })
  }

  static delete(req, res){
    const id = req.session.userId;
    User.destroy({ where: { id } })
      .then(_ => res.redirect('/logout'))
      .catch(err => res.send(err))
  }
  
}

module.exports = { UserController };