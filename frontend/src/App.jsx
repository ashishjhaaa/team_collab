import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';

// Auth Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// Main Components
import Dashboard from './components/Dashboard/Dashboard';
import ProjectDetails from './components/Projects/ProjectDetails';
import CreateProject from './components/Projects/CreateProject';
import TeamOverview from './components/Team/TeamOverview';
import ChatWindow from './components/Chat/ChatWindow';

// Layout Components
import Navbar from './components/Common/Navbar';
import Sidebar from './components/Common/Sidebar';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

// Main Layout Component
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/create"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'MANAGER']}>
              <MainLayout>
                <CreateProject />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ProjectDetails />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/team"
          element={
            <ProtectedRoute>
              <MainLayout>
                <TeamOverview />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ChatWindow />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;