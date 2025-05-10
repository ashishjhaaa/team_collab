require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

// Import Models
const User = require('./models/User');
const Team = require('./models/Team');
const Project = require('./models/Project');
const Task = require('./models/Task');
const Message = require('./models/Message');

const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const messageRoutes = require('./routes/messageRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/messages', messageRoutes);

// Error handling middleware
app.use(errorHandler);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinTeam', (teamId) => {
    socket.join(teamId);
  });

  socket.on('newMessage', (message) => {
    io.to(message.teamId).emit('message', message);
  });

  socket.on('taskUpdate', (task) => {
    io.to(task.teamId).emit('taskUpdated', task);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/team-collab')
.then(async () => {
  console.log('Connected to MongoDB');
  
  // Insert dummy data
  try {
    // Create Admin User if not already exists
    const adminUser = await User.findOne({ email: 'admin@example.com' });
    if (!adminUser) {
      const newAdmin = await User.create({
        email: 'admin@example.com',
        name: 'Admin User',
        password: 'admin123',
        role: 'ADMIN'
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }

    // Create Manager User if not already exists
    const managerUser = await User.findOne({ email: 'manager@example.com' });
    if (!managerUser) {
      const newManager = await User.create({
        email: 'manager@example.com',
        name: 'Manager User',
        password: 'manager123',
        role: 'MANAGER'
      });
      console.log('Manager user created');
    } else {
      console.log('Manager user already exists');
    }

    // Create Team
    const team = await Team.create({
      name: 'Development Team',
      description: 'Main development team',
      adminId: adminUser._id
    });
    console.log('Team created');

    // Update users with teamId
    await User.findByIdAndUpdate(adminUser._id, { teamId: team._id });
    await User.findByIdAndUpdate(managerUser._id, { teamId: team._id });

    // Create Project
    const project = await Project.create({
      name: 'Sample Project',
      description: 'This is a sample project',
      teamId: team._id
    });
    console.log('Project created');

    // Create Task
    const task = await Task.create({
      title: 'Sample Task',
      description: 'This is a sample task',
      status: 'todo',
      projectId: project._id,
      assignedTo: managerUser._id
    });
    console.log('Task created');

    // Create Message
    const message = await Message.create({
      content: 'Welcome to the team!',
      senderId: adminUser._id,
      teamId: team._id
    });
    console.log('Message created');

    console.log('All dummy data inserted successfully');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  }
})
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
