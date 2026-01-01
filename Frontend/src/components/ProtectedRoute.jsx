import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const professional = localStorage.getItem('professional');

  // Check if accessing professional dashboard
  if (location.pathname.includes('professional-dashboard')) {
    if (!token || !professional) {
      return <Navigate to="/professional-login" replace />;
    }
  } else {
    // Regular user dashboard
    if (!token || !user) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;