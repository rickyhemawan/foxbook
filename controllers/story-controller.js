const { Story, User, Comment } = require('../models')

const { Sequelize } = require('sequelize')

class StoryController {

  static readAll(req, res) {
    const { username } = req.session
    Story.findAll({ 
      attributes: [
        'title', 'content',
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

}

module.exports = { StoryController };