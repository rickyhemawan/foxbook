'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Story.hasMany(models.Comment);
      Story.belongsTo(models.User)
    }
  };
  Story.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Title cannot be empty" },
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Content cannot be empty" },
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Story',
  });
  return Story;
};