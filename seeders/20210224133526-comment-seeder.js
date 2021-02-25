'use strict';

let data = require('../data/comments.json')
const { User, Story } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([User.findAll({ attributes: ['id'] }), Story.findAll({ attributes: ['id'] })])
      .then(([users, stories]) => {
        // attacj createdAt and UpdatedAt
        data.forEach(e => {
          e.createdAt = new Date();
          e.updatedAt = new Date();
        })
        data = [...data, ...data] // 2 times, so it will have more data
        
        // randomize commenter
        data.forEach(e => {
          const randomUserIndex = Math.floor(Math.random() * users.length)
          const randomCommentIndex = Math.floor(Math.random() * stories.length)
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
