import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ActivityRegistrationPage from './pages/ActivityRegistrationPage';
import ActivityHistoryPage from './pages/ActivityHistoryPage';
import LoginPage from './pages/LoginPage';

const AppRoutes = ({ isAuthenticated }) => {
  console.log('isAuthenticated em AppRoutes:', isAuthenticated);
  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} 
      />
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} 
      />
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/activity/register" 
        element={isAuthenticated ? <ActivityRegistrationPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/activity/history" 
        element={isAuthenticated ? <ActivityHistoryPage /> : <Navigate to="/login" />} 
      />
    </Routes>
  );
};

export default AppRoutes;