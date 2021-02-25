'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const { Constants } = require('../constants')
const { generateErrorMessage } = require('../helpers/error-handler')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Comment)
      User.hasMany(models.Story)
    }

    static authenticate = (req) => new Promise((resolve, reject) => {
      const invalidEmail = generateErrorMessage('Invalid Email');
      const invalidPassword = generateErrorMessage('Incorrect Password');
      const { password, email } = req.body;
      
      if(!email) return reject(invalidEmail)
      if(!password) return reject(invalidPassword)

      return super.findOne({ where: { email } })
        .then(user => {
          if(!user) return reject(invalidEmail)
          if(bcrypt.compareSync(password, user.password)){
            req.session.userId = user.id
            req.session.username = user.username
            return resolve(user)
          }
          console.log("auth rejected");
          reject(invalidPassword)
        })
        .catch(err => reject(err))
    })

    encrypt(){
      const salt = bcrypt.genSaltSync(Constants.SALT);
      this.password = bcrypt.hashSync(this.password, salt);
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Email cannot be empty" },
        isEmail: { msg: "Invalid email address" },
      },
      unique: { args: 'email', msg: "Email already has been used" }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4,32],
          msg: "Password character length must be between 7 and 32" 
        },
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Username cannot be empty" },
      },
      unique: { args: 'username', msg: "Username already has been used" }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: user => user.encrypt(),
    }
  });
  return User;
};