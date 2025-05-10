// User Types
export const UserRole = {
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
    MEMBER: 'MEMBER'
  };
  
  export const TaskStatus = {
    TODO: 'todo',
    IN_PROGRESS: 'in-progress',
    DONE: 'done'
  };
  
  // Interface Types
  export const User = {
    id: String,
    email: String,
    name: String,
    role: UserRole,
    teamId: String
  };
  
  export const Team = {
    id: String,
    name: String,
    description: String,
    adminId: String
  };
  
  export const Project = {
    id: String,
    name: String,
    description: String,
    teamId: String
  };
  
  export const Task = {
    id: String,
    title: String,
    description: String,
    status: TaskStatus,
    projectId: String,
    assignedTo: String
  };
  
  export const Message = {
    id: String,
    content: String,
    senderId: String,
    teamId: String,
    timestamp: Date
  };