const { Story, User, Comment } = require('../models')

const { Sequelize } = require('sequelize')

class StoryController {

  static readAll(req, res) {
    const { username } = req.session
    Story.findAll({ 
      attributes: [
        'id','title', 'content',
        [Sequelize.fn("COUNT", Sequelize.col("Comments.id")), "commentsCounter"]
      ],
      include: [
        { model: User, attributes: ['username']},
        { model: Comment, attributes: []},
      ],
      group: ['Story.id', 'User.id']
    })
    .then(data => res.render('index', {data, username}))
    .catch(err => res.send(err))
  }

  static readOne(req, res) {
    const { id } = req.params
    const { userId, username } = req.session
    Promise.all([
      Story.findByPk(+id, { include: { model: User, attributes: ['username'] },  }),
      Comment.findAll({
        where: { StoryId: +id },
        include: {
          model: User,
          attributes: ['username']
        }
      })
    ])
    .then(([story, comments]) => res.render('stories/show-one',{
      story, comments, username, userId 
    }))
    // .then(([story, comments]) => res.send({
    //   story, comments, username, userId 
    // }))
    .catch(err => res.send(err))
  }

}

module.exports = { StoryController };