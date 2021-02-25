const { Story, User, Comment } = require('../models')

const { Sequelize } = require('sequelize')

const { parseErrorMessage } = require('../helpers/error-handler')

class StoryController {

  static readAll(req, res) {
    const { username } = req.session
    Story.findAll({ 
      attributes: [
        'id','title', 'content', 'createdAt',
        [Sequelize.fn("COUNT", Sequelize.col("Comments.id")), "commentsCounter"]
      ],
      order: [['createdAt', 'DESC']],
      include: [
        { model: User, attributes: ['username']},
        { model: Comment, attributes: []},
      ],
      group: ['Story.id', 'User.id']
    })
    .then(data => res.render('index', {data, username}))
    .catch(err => res.send(err))
  }

  static redirectReadAll(req, res){
    res.redirect('/')
  }

  static readOne(req, res) {
    const { id } = req.params
    const { userId, username } = req.session
    const { errors } = req.query
    Promise.all([
      Story.findByPk(+id, { include: { model: User, attributes: ['username'] },  }),
      Comment.findAll({
        where: { StoryId: +id },
        order: [['createdAt', 'ASC']],
        include: {
          model: User,
          attributes: ['username']
        }
      })
    ])
    .then(([story, comments]) => res.render('stories/show-one',{
      story, comments, username, userId, errors
    }))
    .catch(err => res.send(err))
  }
  static showCreate(req,res){
    const { errors } = req.query
    const { username } = req.session
    res.render('stories/add-form', { username, errors })
  }
  static create(req,res){
    const id = +req.session.userId
    req.body.UserId = id;
    Story.create(req.body)
      .then(_ => res.redirect('/'))
      .catch(err => {
        if(!err.errors) return res.send(err)
        const errors = parseErrorMessage(err)
        res.redirect(`/stories/create?errors=${errors}`)
      })
  }
  static addComment(req,res){
    const StoryId = +req.params.id;
    const UserId = +req.session.userId
    const { content } = req.body;
    Comment.create({ StoryId, UserId, content })
      .then(_ => res.redirect(`/stories/${StoryId}`))
      .catch(err => {
        if(!err.errors) return res.send(err)
        const errors = parseErrorMessage(err)
        res.redirect(`/stories/${StoryId}?errors=${errors}`)
      })
  }

  static deleteComment(req, res){
    Comment.destroy({where: { id: +req.params.id }})
      .then(_ => res.redirect('/user'))
      .catch(err => res.send(err))
  }
  static delete(req, res){
    Story.destroy({where: { id: +req.params.id }})
      .then(_ => res.redirect('/user'))
      .catch(err => res.send(err))
  }

}

module.exports = { StoryController };