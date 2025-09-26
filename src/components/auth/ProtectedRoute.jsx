import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import LoadingSpinner from '../ui/LoadingSpinner';

const ProtectedRoute = ({ 
  children, 
  requiredRoles = [], 
  requireAuth = true,
  fallbackPath = '/login' 
}) => {
  const { isAuthenticated, isLoading, profile, hasRole } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Check authentication requirement
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check role requirements
  if (requiredRoles.length > 0 && !hasRole(requiredRoles)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;