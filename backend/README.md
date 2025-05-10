# Team Collaboration Platform

A real-time team collaboration platform built with Node.js, Express, MongoDB, and Socket.IO.

## Features

- Role-based access control (Admin, Manager, Member)
- Project management
- Task tracking with Kanban board
- Real-time team chat
- Real-time task updates

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/team-collab
   JWT_SECRET=your_jwt_secret_key_here
   CLIENT_URL=http://localhost:3000
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Projects
- GET /api/projects - Get all projects for user's team
- POST /api/projects - Create new project (Admin/Manager only)
- PUT /api/projects/:id - Update project (Admin/Manager only)
- DELETE /api/projects/:id - Delete project (Admin only)

### Tasks
- GET /api/tasks/project/:projectId - Get all tasks for a project
- POST /api/tasks/project/:projectId - Create new task
- PUT /api/tasks/:id - Update task
- DELETE /api/tasks/:id - Delete task

### Messages
- GET /api/messages - Get all messages for team
- POST /api/messages - Send new message

## Real-time Features

The platform uses Socket.IO for real-time updates:
- Team chat messages
- Task status updates
- Project changes

## Authentication

All endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer your_jwt_token
``` 