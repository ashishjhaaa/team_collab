import React, { useState, useEffect } from 'react';
import MemberList from './MemberList';

const TeamOverview = () => {
  const [teamStats, setTeamStats] = useState({
    totalMembers: 0,
    activeProjects: 0,
    completedTasks: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch team stats
    const fetchTeamStats = async () => {
      try {
        // Replace with your actual API call
        const response = await fetch('/api/team/stats');
        const data = await response.json();
        setTeamStats(data);
      } catch (error) {
        console.error('Error fetching team stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamStats();
  }, []);

  if (loading) {
    return <div>Loading team overview...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Team Overview</h1>
      </div>

      {/* Team Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Total Members</h3>
          <p className="text-3xl font-bold text-indigo-600">{teamStats.totalMembers}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Active Projects</h3>
          <p className="text-3xl font-bold text-indigo-600">{teamStats.activeProjects}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Completed Tasks</h3>
          <p className="text-3xl font-bold text-indigo-600">{teamStats.completedTasks}</p>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Team Members</h2>
          <MemberList />
        </div>
      </div>
    </div>
  );
};

export default TeamOverview;