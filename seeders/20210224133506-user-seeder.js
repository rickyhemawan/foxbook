'use strict';

const data = require('../data/users.json')

module.exports = {
  up: (queryInterface, Sequelize) => {
    data.forEach(e => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
    })
    return queryInterface.bulkInsert('Users', data, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
