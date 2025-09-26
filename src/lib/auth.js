import { supabase } from './supabase';
import toast from 'react-hot-toast';

// Auth state management
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const getCurrentProfile = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) return null;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select(`
        *,
        organization:organizations(*)
      `)
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return profile;
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
};

// Authentication functions
export const signUp = async ({ email, password, firstName, lastName, organizationName }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          organization_name: organizationName
        }
      }
    });

    if (error) throw error;

    if (data.user && !data.session) {
      toast.success('Please check your email to verify your account');
      return { success: true, needsVerification: true };
    }

    return { success: true, user: data.user };
  } catch (error) {
    console.error('Sign up error:', error);
    toast.error(error.message || 'Failed to create account');
    return { success: false, error: error.message };
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Update last login
    await supabase
      .from('profiles')
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.user.id);

    toast.success('Welcome back!');
    return { success: true, user: data.user };
  } catch (error) {
    console.error('Sign in error:', error);
    toast.error(error.message || 'Failed to sign in');
    return { success: false, error: error.message };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    toast.success('Signed out successfully');
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    toast.error('Failed to sign out');
    return { success: false, error: error.message };
  }
};

export const resetPassword = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    if (error) throw error;

    toast.success('Password reset email sent');
    return { success: true };
  } catch (error) {
    console.error('Password reset error:', error);
    toast.error(error.message || 'Failed to send reset email');
    return { success: false, error: error.message };
  }
};

export const updatePassword = async (newPassword) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) throw error;

    toast.success('Password updated successfully');
    return { success: true };
  } catch (error) {
    console.error('Password update error:', error);
    toast.error(error.message || 'Failed to update password');
    return { success: false, error: error.message };
  }
};

export const updateProfile = async (updates) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) throw error;

    toast.success('Profile updated successfully');
    return { success: true };
  } catch (error) {
    console.error('Profile update error:', error);
    toast.error(error.message || 'Failed to update profile');
    return { success: false, error: error.message };
  }
};

// Role and permission helpers
export const hasRole = (userRole, requiredRoles) => {
  if (!userRole || !requiredRoles) return false;
  return requiredRoles.includes(userRole);
};

export const canAccessResource = (userRole, organizationId, resourceOrgId) => {
  if (userRole === 'super_admin') return true;
  if (!organizationId || !resourceOrgId) return false;
  return organizationId === resourceOrgId;
};

export const getRolePermissions = (role) => {
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

  return permissions[role] || permissions.user;
};