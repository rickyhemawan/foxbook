'use strict';
const relativeTime = require('dayjs/plugin/relativeTime');
const dayjs = require('dayjs')
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

    toPlainText(){
      return `Title: ${this.title}\nContent: ${this.content}`
    }

    createdFromNow(){
      dayjs.extend(relativeTime)
      return dayjs(this.createdAt).fromNow();
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
    createdAt: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Story',
  });
  return Story;
};