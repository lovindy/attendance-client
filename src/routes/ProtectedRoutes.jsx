import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login.');
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
