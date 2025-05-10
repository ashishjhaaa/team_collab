const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const { validateProject } = require('../middleware/validate');
const projectController = require('../controllers/projectController');

// Get all projects
router.get('/', auth, projectController.getProjects);

// Create new project (Admin and Manager only)
router.post('/', 
  auth, 
  authorize('ADMIN', 'MANAGER'), 
  validateProject,
  projectController.createProject
);

// Update project (Admin and Manager only)
router.put('/:id', 
  auth, 
  authorize('ADMIN', 'MANAGER'), 
  validateProject,
  projectController.updateProject
);

// Delete project (Admin only)
router.delete('/:id', auth, authorize('ADMIN'), projectController.deleteProject);

module.exports = router; 