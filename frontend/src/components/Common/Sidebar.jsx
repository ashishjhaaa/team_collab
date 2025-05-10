import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Sidebar = () => {
  const { user } = useAuth();

  const isAdmin = user?.role === 'ADMIN';
  const isManager = user?.role === 'MANAGER';

  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      <div className="p-4">
        <nav className="space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${
                isActive
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${
                isActive
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Projects
          </NavLink>

          {(isAdmin || isManager) && (
            <NavLink
              to="/projects/create"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              Create Project
            </NavLink>
          )}

          <NavLink
            to="/team"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${
                isActive
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Team
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${
                isActive
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Chat
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;