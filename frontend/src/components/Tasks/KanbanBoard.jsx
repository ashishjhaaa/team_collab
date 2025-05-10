import React, { useState } from 'react';

const initialData = {
  todo: { title: 'To Do', items: [] },
  inProgress: { title: 'In Progress', items: [] },
  done: { title: 'Done', items: [] },
};

export default function App() {
  const [columns, setColumns] = useState(initialData);
  const [newTask, setNewTask] = useState('');
  const [taskStatus, setTaskStatus] = useState('todo');

  const addTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now().toString(),
      content: newTask,
    };

    const updated = { ...columns };
    updated[taskStatus].items.push(task);
    setColumns(updated);
    setNewTask('');
  };

  const handleDragStart = (e, task, columnId) => {
    e.dataTransfer.setData('task', JSON.stringify({ task, columnId }));
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    const { task, columnId } = JSON.parse(e.dataTransfer.getData('task'));

    if (columnId === targetColumnId) return;

    const sourceItems = columns[columnId].items.filter(item => item.id !== task.id);
    const updated = { ...columns };
    updated[columnId].items = sourceItems;
    updated[targetColumnId].items.push(task);
    setColumns(updated);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>Kanban Board</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
        />
        <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button onClick={addTask}>Add</button>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {Object.entries(columns).map(([colId, col]) => (
          <div
            key={colId}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, colId)}
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9',
              minHeight: '200px',
            }}
          >
            <h3>{col.title}</h3>
            {col.items.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task, colId)}
                style={{
                  padding: '8px',
                  margin: '5px 0',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px',
                  cursor: 'grab',
                }}
              >
                {task.content}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
