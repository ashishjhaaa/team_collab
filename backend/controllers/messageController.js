const Message = require('../models/Message');

// Get all messages for team
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ teamId: req.user.teamId })
      .populate('senderId', 'name')
      .sort({ timestamp: -1 })
      .limit(50);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send new message
exports.sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    
    const message = new Message({
      content,
      senderId: req.user._id,
      teamId: req.user.teamId
    });

    await message.save();
    
    // Populate sender details before sending response
    await message.populate('senderId', 'name');
    
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 