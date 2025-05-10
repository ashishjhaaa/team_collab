import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { projectApi } from '../../utils/api';
import KanbanBoard from '../Tasks/KanbanBoard';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectApi.getOne(id);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return <div>Loading project details...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <p className="text-gray-600 mt-2">{project.description}</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <KanbanBoard projectId={id} />
      </div>
    </div>
  );
};

export default ProjectDetails;