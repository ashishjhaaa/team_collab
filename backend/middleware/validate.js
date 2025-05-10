const { projectSchema, taskSchema, messageSchema } = require('../validations/schemas');

const validateProject = (req, res, next) => {
  const { error } = projectSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      error: error.details[0].message 
    });
  }
  next();
};

const validateTask = (req, res, next) => {
  const { error } = taskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      error: error.details[0].message 
    });
  }
  next();
};

const validateMessage = (req, res, next) => {
  const { error } = messageSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      error: error.details[0].message 
    });
  }
  next();
};

module.exports = {
  validateProject,
  validateTask,
  validateMessage
}; 