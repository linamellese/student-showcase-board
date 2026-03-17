const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 200]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [20, 5000]
    }
  },
  techStack: {
  type: DataTypes.JSON,
  allowNull: false,
  defaultValue: [],
  validate: {
    isValidTechStack(value) {
      console.log('Validating techStack:', value); // Add this for debugging
      console.log('Type:', typeof value);
      console.log('Is array:', Array.isArray(value));
      
      if (!value) {
        throw new Error('Tech stack is required');
      }
      if (!Array.isArray(value)) {
        throw new Error('Tech stack must be an array');
      }
      if (value.length === 0) {
        throw new Error('At least one technology is required');
      }
      // Check each item is a string
      for (let i = 0; i < value.length; i++) {
        if (typeof value[i] !== 'string') {
          throw new Error(`Technology at position ${i} must be a string`);
        }
        if (value[i].trim() === '') {
          throw new Error('Technology cannot be empty string');
        }
      }
    }
  }
},
  githubUrl: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  liveUrl: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: true,
    defaultValue: 'https://via.placeholder.com/800x400?text=Project+Screenshot',
    validate: {
      isUrl: true
    }
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'published'
  }
}, {
  tableName: 'projects',
  indexes: [
    {
      fields: ['title']
    },
    {
      fields: ['author_id']
    },
    {
      fields: ['created_at']
    }
  ]
});

module.exports = Project;