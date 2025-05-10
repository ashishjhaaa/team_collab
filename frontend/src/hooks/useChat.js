import { useState, useEffect } from 'react';
import { messageApi } from '../utils/api';
import { socket } from '../utils/socket';

const useChat = (teamId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await messageApi.getAll(teamId);
      setMessages(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch messages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content) => {
    try {
      const response = await messageApi.create({
        content,
        teamId,
      });
      setMessages([...messages, response.data]);
      return response.data;
    } catch (err) {
      setError('Failed to send message');
      throw err;
    }
  };

  useEffect(() => {
    if (teamId) {
      fetchMessages();

      // Socket.io event listeners
      socket.on('newMessage', (message) => {
        if (message.teamId === teamId) {
          setMessages(prev => [...prev, message]);
        }
      });

      return () => {
        socket.off('newMessage');
      };
    }
  }, [teamId]);

  return {
    messages,
    loading,
    error,
    sendMessage,
    refreshMessages: fetchMessages,
  };
};

export default useChat;