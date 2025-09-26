import React, { createContext, useContext, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
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
    isLoading: authStore.loading,
    hasRole: authStore.hasRole,
    canAccessOrganization: authStore.canAccessOrganization,
    getPermissions: authStore.getPermissions
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4aed88',
            },
          },
        }}
      />
    </AuthContext.Provider>
  );
};