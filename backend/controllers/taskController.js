const Task = require('../models/Task');
const Project = require('../models/Project');

// Get all tasks for a project
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId })
      .populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;
    
    const project = await Project.findOne({ 
      _id: req.params.projectId,
      teamId: req.user.teamId 
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const task = new Task({
      title,
      description,
      projectId: req.params.projectId,
      assignedTo
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, assignedTo } = req.body;
    
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, status, assignedTo },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 