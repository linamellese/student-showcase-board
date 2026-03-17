const User = require('./user');
const Project = require('./Project');
const Like = require('./Like');

// Define associations
User.hasMany(Project, { 
  foreignKey: 'authorId', 
  as: 'projects',
  onDelete: 'CASCADE'
});
Project.belongsTo(User, { 
  foreignKey: 'authorId', 
  as: 'author' 
});

// Like associations
User.belongsToMany(Project, { 
  through: Like, 
  as: 'likedProjects', 
  foreignKey: 'userId' 
});
Project.belongsToMany(User, { 
  through: Like, 
  as: 'likedBy', 
  foreignKey: 'projectId' 
});

User.hasMany(Like, { foreignKey: 'userId' });
Project.hasMany(Like, { foreignKey: 'projectId' });
Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = {
  User,
  Project,
  Like
};