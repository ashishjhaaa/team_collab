import React, { useState, useEffect } from 'react';
import { projectApi } from '../../utils/api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectApi.getAll();
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-medium">{project.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{project.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {project.tasks?.length || 0} tasks
            </span>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;