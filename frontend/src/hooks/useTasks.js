import { useState, useEffect } from 'react';
import { taskApi } from '../utils/api';

const useTasks = (projectId) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskApi.getAll(projectId);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await taskApi.create({
        ...taskData,
        projectId,
      });
      setTasks([...tasks, response.data]);
      return response.data;
    } catch (err) {
      setError('Failed to create task');
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await taskApi.update(id, taskData);
      setTasks(tasks.map(task => 
        task.id === id ? response.data : task
      ));
      return response.data;
    } catch (err) {
      setError('Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskApi.delete(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      throw err;
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchTasks();
    }
  }, [projectId]);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refreshTasks: fetchTasks,
  };
};

export default useTasks;