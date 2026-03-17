const express = require('express');
const { Project, User, Like } = require('../models');
const { protect } = require('../middleware/authMiddleware');
const { projectValidation } = require('../middleware/validationMiddleware');
const router = express.Router();

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    console.log('Fetching project with ID:', req.params.id); // Add this log
    
    const project = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email']
        }
      ]
    });
    
    if (!project) {
      console.log('Project not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Project not found' });
    }
    
    console.log('Project found:', project.id);
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Create project
// @route   POST /api/projects
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      authorId: req.user.id
    };
    
    const project = await Project.create(projectData);
    
    const createdProject = await Project.findByPk(project.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email']
        }
      ]
    });
    
    res.status(201).json(createdProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    console.log('Update request received for ID:', req.params.id);
    console.log('Update data:', req.body);
    console.log('User:', req.user.id);
    
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      console.log('Project not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Project not found' });
    }
    
    console.log('Found project:', project.id);
    console.log('Project authorId:', project.authorId);
    console.log('Request user id:', req.user.id);
    
    // Check if user is the author
    if (project.authorId !== req.user.id) {
      console.log('Authorization failed - user is not the author');
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }
    
    // Update the project
    await project.update(req.body);
    console.log('Project updated successfully');
    
    // Fetch updated project
    const updatedProject = await Project.findByPk(project.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email']
        }
      ]
    });
    
    res.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    console.log('Delete request received for ID:', req.params.id);
    console.log('User:', req.user.id);
    
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      console.log('Project not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Project not found' });
    }
    
    console.log('Found project:', project.id);
    console.log('Project authorId:', project.authorId);
    console.log('Request user id:', req.user.id);
    
    // Check if user is the author
    if (project.authorId !== req.user.id) {
      console.log('Authorization failed - user is not the author');
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }
    
    await project.destroy();
    console.log('Project deleted successfully');
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get user's projects
// @route   GET /api/projects/user/me
// @access  Private
router.get('/user/me', protect, async (req, res) => {
  try {
    console.log('Fetching projects for user:', req.user.id);
    
    const projects = await Project.findAll({
      where: { authorId: req.user.id },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    console.log('Found projects:', projects.length);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching user projects:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;    