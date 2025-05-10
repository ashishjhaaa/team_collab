const Project = require('../models/Project');
const Team = require('../models/Team');

// Get all projects for user's team
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ teamId: req.user.teamId });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new project
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const project = new Project({
      name,
      description,
      teamId: req.user.teamId
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, teamId: req.user.teamId },
      { name, description },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      teamId: req.user.teamId
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 