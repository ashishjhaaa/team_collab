const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { validateTask } = require('../middleware/validate');
const taskController = require('../controllers/taskController');

// Get all tasks for a project
router.get('/project/:projectId', auth, taskController.getTasks);

// Create new task
router.post('/project/:projectId', 
  auth, 
  validateTask,
  taskController.createTask
);

// Update task
router.put('/:id', 
  auth, 
  validateTask,
  taskController.updateTask
);

// Delete task
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router; 