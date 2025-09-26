import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { getCurrentUser, getCurrentProfile } from '../lib/auth';

const useAuthStore = create((set, get) => ({
  // State
  user: null,
  profile: null,
  loading: true,
  initialized: false,

  // Actions
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),

  // Initialize auth state
  initialize: async () => {
    try {
      const user = await getCurrentUser();
      const profile = user ? await getCurrentProfile() : null;
      
      set({ 
        user, 
        profile, 
        loading: false, 
        initialized: true 
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ 
        user: null, 
        profile: null, 
        loading: false, 
        initialized: true 
      });
    }
  },

  // Refresh profile data
  refreshProfile: async () => {
    try {
      const profile = await getCurrentProfile();
      set({ profile });
      return profile;
    } catch (error) {
      console.error('Profile refresh error:', error);
      return null;
    }
  },

  // Clear auth state
  clearAuth: () => set({ 
    user: null, 
    profile: null, 
    loading: false 
  }),

  // Check if user has required role
  hasRole: (requiredRoles) => {
    const { profile } = get();
    if (!profile?.role) return false;
    return Array.isArray(requiredRoles) 
      ? requiredRoles.includes(profile.role)
      : profile.role === requiredRoles;
  },

  // Check if user can access organization data
  canAccessOrganization: (organizationId) => {
    const { profile } = get();
    if (!profile) return false;
    if (profile.role === 'super_admin') return true;
    return profile.organization_id === organizationId;
  },

  // Get user permissions
  getPermissions: () => {
    const { profile } = get();
    if (!profile?.role) return {};

    const permissions = {
      super_admin: {
        canManageUsers: true,
        canManageOrganizations: true,
        canManageWorkflows: true,
        canViewAnalytics: true,
        canManageBilling: true,
        canManageSettings: true,
        canAccessAllData: true
      },
      org_admin: {
        canManageUsers: true,
        canManageOrganizations: false,
        canManageWorkflows: true,
        canViewAnalytics: true,
        canManageBilling: true,
        canManageSettings: true,
        canAccessAllData: false
      },
      manager: {
        canManageUsers: false,
        canManageOrganizations: false,
        canManageWorkflows: true,
        canViewAnalytics: true,
        canManageBilling: false,
        canManageSettings: false,
        canAccessAllData: false
      },
      user: {
        canManageUsers: false,
        canManageOrganizations: false,
        canManageWorkflows: false,
        canViewAnalytics: false,
        canManageBilling: false,
        canManageSettings: false,
        canAccessAllData: false
      }
    };

    return permissions[profile.role] || permissions.user;
  }
}));

// Set up auth state listener
supabase.auth.onAuthStateChange(async (event, session) => {
  const { setUser, setProfile, clearAuth, refreshProfile } = useAuthStore.getState();
  
  if (event === 'SIGNED_IN' && session?.user) {
    setUser(session.user);
    await refreshProfile();
  } else if (event === 'SIGNED_OUT') {
    clearAuth();
  } else if (event === 'TOKEN_REFRESHED' && session?.user) {
    setUser(session.user);
  }
});

export default useAuthStore;