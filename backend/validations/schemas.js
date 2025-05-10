const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(50).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('ADMIN', 'MANAGER', 'MEMBER').default('MEMBER'),
  teamId: Joi.string().hex().length(24)
});

const teamSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().max(500),
  adminId: Joi.string().hex().length(24).required()
});

const projectSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().max(500),
  teamId: Joi.string().hex().length(24).required()
});

const taskSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(500),
  status: Joi.string().valid('todo', 'in-progress', 'done').default('todo'),
  projectId: Joi.string().hex().length(24).required(),
  assignedTo: Joi.string().hex().length(24)
});

const messageSchema = Joi.object({
  content: Joi.string().min(1).max(1000).required(),
  teamId: Joi.string().hex().length(24).required()
});

module.exports = {
  userSchema,
  teamSchema,
  projectSchema,
  taskSchema,
  messageSchema
}; 