import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="flex items-start space-x-4">
          <div className="flex-1 bg-white rounded-lg p-4 shadow">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{message.senderName}</span>
              <span className="text-xs text-gray-500">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="mt-1 text-gray-700">{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;