import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        auth: {
          token: localStorage.getItem('token'),
        },
      });

      this.socket.on('connect', () => {
        console.log('Socket connected');
      });

      this.socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      this.socket.on('error', (error) => {
        console.error('Socket error:', error);
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Team Events
  joinTeam(teamId) {
    if (this.socket) {
      this.socket.emit('joinTeam', teamId);
    }
  }

  leaveTeam(teamId) {
    if (this.socket) {
      this.socket.emit('leaveTeam', teamId);
    }
  }

  // Message Events
  sendMessage(message) {
    if (this.socket) {
      this.socket.emit('sendMessage', message);
    }
  }

  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on('newMessage', callback);
    }
  }

  // Task Events
  onTaskUpdate(callback) {
    if (this.socket) {
      this.socket.on('taskUpdate', callback);
    }
  }

  onProjectUpdate(callback) {
    if (this.socket) {
      this.socket.on('projectUpdate', callback);
    }
  }
}

export const socket = new SocketService();