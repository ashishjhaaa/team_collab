const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { validateMessage } = require('../middleware/validate');
const messageController = require('../controllers/messageController');

// Get all messages
router.get('/', auth, messageController.getMessages);

// Send new message
router.post('/', 
  auth, 
  validateMessage,
  messageController.sendMessage
);

module.exports = router; 