'use strict';
const relativeTime = require('dayjs/plugin/relativeTime');
const dayjs = require('dayjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User)
      Comment.belongsTo(models.Story)
    }

    createdFromNow(){
      dayjs.extend(relativeTime)
      return dayjs(this.createdAt).fromNow();
    }
  };
  Comment.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Comment cannot be empty" },
      }
    },
    StoryId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};