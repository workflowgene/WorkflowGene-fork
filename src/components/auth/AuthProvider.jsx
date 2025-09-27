import React, { createContext, useContext, useEffect } from 'react';
import useAuthStore from '../../store/authStore';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const authStore = useAuthStore();

  useEffect(() => {
    // Initialize auth state on app start
    authStore.initialize();
  }, []);

  const value = {
    ...authStore,
    isAuthenticated: !!authStore.user,
    loading: authStore.loading,
    hasRole: authStore.hasRole,
    canAccessOrganization: authStore.canAccessOrganization,
    getPermissions: authStore.getPermissions
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};