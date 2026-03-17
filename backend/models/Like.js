const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  tableName: 'likes',
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'project_id']
    }
  ]
});

module.exports = Like;