import { useState, useEffect } from 'react';
import { projectApi } from '../utils/api';

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectApi.getAll();
      setProjects(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData) => {
    try {
      const response = await projectApi.create(projectData);
      setProjects([...projects, response.data]);
      return response.data;
    } catch (err) {
      setError('Failed to create project');
      throw err;
    }
  };

  const updateProject = async (id, projectData) => {
    try {
      const response = await projectApi.update(id, projectData);
      setProjects(projects.map(project => 
        project.id === id ? response.data : project
      ));
      return response.data;
    } catch (err) {
      setError('Failed to update project');
      throw err;
    }
  };

  const deleteProject = async (id) => {
    try {
      await projectApi.delete(id);
      setProjects(projects.filter(project => project.id !== id));
    } catch (err) {
      setError('Failed to delete project');
      throw err;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refreshProjects: fetchProjects,
  };
};

export default useProjects;