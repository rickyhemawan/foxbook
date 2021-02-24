'use strict';
const data = require('../data/stories.json')
const { User } = require('../models');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return User.findAll({ attributes: ['id'] })
      .then(users => {
        data.forEach(e => {
          const randomNumber = Math.floor(Math.random() * users.length)
          e.createdAt = new Date();
          e.updatedAt = new Date();
          e.UserId = users[randomNumber].id
        })
        return queryInterface.bulkInsert('Stories', data, {})
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stories', null, {})
  }
};
