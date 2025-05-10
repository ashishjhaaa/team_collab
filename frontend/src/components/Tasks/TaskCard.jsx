import React from 'react';

const TaskCard = ({ task, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="bg-white p-4 rounded shadow cursor-move hover:shadow-md transition-shadow"
    >
      <h4 className="font-medium">{task.title}</h4>
      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Assigned to: {task.assignedTo}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;