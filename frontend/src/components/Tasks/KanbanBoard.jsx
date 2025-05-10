import React, { useState } from 'react';

// Initial data structure
const initialData = {
  todo: {
    title: 'To Do',
    items: [
      { id: '1', content: 'Design homepage', status: 'todo' },
      { id: '2', content: 'Fix login bug', status: 'todo' },
    ],
  },
  inProgress: {
    title: 'In Progress',
    items: [
      { id: '3', content: 'Develop dashboard', status: 'inProgress' },
    ],
  },
  done: {
    title: 'Done',
    items: [
      { id: '4', content: 'Set up CI/CD', status: 'done' },
    ],
  },
};

export default function App() {
  const [columns, setColumns] = useState(initialData);
  const [newTask, setNewTask] = useState('');
  const [taskStatus, setTaskStatus] = useState('todo');

  // Handle new task input change
  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  // Handle status dropdown change
  const handleStatusChange = (e) => {
    setTaskStatus(e.target.value);
  };

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === '') return; // Don't add if task is empty

    const newTaskItem = {
      id: Date.now().toString(), // Unique ID based on time
      content: newTask,
      status: taskStatus,
    };

    const updatedColumns = { ...columns };
    updatedColumns[taskStatus].items.push(newTaskItem);
    setColumns(updatedColumns);
    setNewTask(''); // Clear input after adding
  };

  // Handle drag start
  const handleDragStart = (e, task, columnId) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
    e.dataTransfer.setData('columnId', columnId);
  };

  // Handle drag over (to allow dropping)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e, destinationColumnId) => {
    const task = JSON.parse(e.dataTransfer.getData('task'));
    const sourceColumnId = e.dataTransfer.getData('columnId');

    if (sourceColumnId === destinationColumnId) return; // Don't move if the same column

    const sourceColumn = columns[sourceColumnId];
    const destinationColumn = columns[destinationColumnId];
    const sourceItems = [...sourceColumn.items];
    const destinationItems = [...destinationColumn.items];

    // Remove the task from the source column
    const taskIndex = sourceItems.findIndex((item) => item.id === task.id);
    sourceItems.splice(taskIndex, 1);

    // Add the task to the destination column
    destinationItems.push(task);

    setColumns({
      ...columns,
      [sourceColumnId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destinationColumnId]: {
        ...destinationColumn,
        items: destinationItems,
      },
    });
  };

  // Get color based on task status
  const getColorByStatus = (status) => {
    switch (status) {
      case 'todo':
        return 'bg-blue-200';
      case 'inProgress':
        return 'bg-yellow-200';
      case 'done':
        return 'bg-red-200';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Kanban Board</h1>

      {/* Add New Task Form */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <input
          type="text"
          value={newTask}
          onChange={handleNewTaskChange}
          placeholder="Enter task description"
          className="border border-gray-300 p-2 rounded-md w-full mb-4"
        />
        <div className="flex items-center space-x-4 mb-4">
          <select
            value={taskStatus}
            onChange={handleStatusChange}
            className="border border-gray-300 p-2 rounded-md"
          >
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button
            onClick={addTask}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(columns).map(([columnId, column]) => (
          <div
            key={columnId}
            className="bg-white rounded-xl shadow-md p-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, columnId)}
          >
            <h2 className="text-xl font-semibold mb-4">{column.title}</h2>
            <div className="space-y-3">
              {column.items.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, columnId)}
                  className={`p-4 rounded-lg shadow cursor-pointer hover:opacity-75 transition duration-200 ${getColorByStatus(task.status)}`}
                >
                  {task.content}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default KanbanBoard;
