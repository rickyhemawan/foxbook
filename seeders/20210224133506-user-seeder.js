'use strict';

const data = require('../data/users.json')
const bcrypt = require('bcryptjs');
const { Constants } = require('../constants')
module.exports = {
  up: (queryInterface, Sequelize) => {
    const salt = bcrypt.genSaltSync(Constants.SALT);
    
    data.forEach(e => {
      e.password = bcrypt.hashSync(e.password, salt);
      e.createdAt = new Date();
      e.updatedAt = new Date();
    })
    return queryInterface.bulkInsert('Users', data, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
