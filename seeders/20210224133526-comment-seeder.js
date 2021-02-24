'use strict';

const data = require('../data/comments.json')
const { User, Story } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([User.findAll({ attributes: ['id'] }), Story.findAll({ attributes: ['id'] })])
      .then(([users, stories]) => {
        data.forEach(e => {
          const randomUserIndex = Math.floor(Math.random() * users.length)
          const randomCommentIndex = Math.floor(Math.random() * stories.length)
          e.createdAt = new Date();
          e.updatedAt = new Date();
          e.UserId = users[randomUserIndex].id
          e.StoryId = stories[randomCommentIndex].id
        })
        return queryInterface.bulkInsert('Comments', data, {})
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
