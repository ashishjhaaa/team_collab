import React, { useState, useEffect } from 'react';
import { taskApi } from '../../utils/api';
import TaskCard from './TaskCard';

const KanbanBoard = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await taskApi.getAll(projectId);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    
    try {
      await taskApi.update(taskId, { status: newStatus });
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  const columns = {
    todo: tasks.filter(task => task.status === 'todo'),
    'in-progress': tasks.filter(task => task.status === 'in-progress'),
    done: tasks.filter(task => task.status === 'done')
  };

  return (
    <div className="flex space-x-4 p-4">
      {Object.entries(columns).map(([status, tasks]) => (
        <div
          key={status}
          className="flex-1 bg-gray-100 rounded-lg p-4"
          onDrop={(e) => handleDrop(e, status)}
          onDragOver={handleDragOver}
        >
          <h3 className="text-lg font-semibold mb-4 capitalize">{status}</h3>
          <div className="space-y-4">
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onDragStart={handleDragStart}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;