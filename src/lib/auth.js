// src/lib/auth.js
import { supabase } from './supabase';
import { isSupabaseConfigured } from './supabase';
import toast from 'react-hot-toast';

// ✅ Get the current user session
export const getCurrentUser = async () => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured, returning null user');
    return null;
  }
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Auth session error:', error);
      return null;
    }
    return session?.user || null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// ✅ Get user profile from database
export const getCurrentProfile = async () => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured, returning null profile');
    return null;
  }
  
  try {
    const user = await getCurrentUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        organization:organizations(*)
      `)
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Profile fetch error:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error getting current profile:', error);
    return null;
  }
};

// ✅ Sign in user
export const signIn = async ({ email, password }) => {
  if (!isSupabaseConfigured()) {
    throw new Error('Authentication service not configured');
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    // Update last login timestamp
    if (data.user) {
      await supabase
        .from('profiles')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.user.id);
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Sign in error:', error);
    return { success: false, error: error.message };
  }
};

// ✅ Sign up user
export const signUp = async ({ email, password, firstName, lastName, organizationName, industry, companySize }) => {
  if (!isSupabaseConfigured()) {
    throw new Error('Authentication service not configured');
  }

  try {
    // First, sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        }
      }
    });

    if (authError) throw authError;

    if (authData.user) {
      // Create organization if provided
      let organizationId = null;
      if (organizationName) {
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .insert({
            name: organizationName,
            slug: organizationName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            industry: industry,
            company_size: companySize
          })
          .select()
          .single();

        if (orgError) {
          console.error('Organization creation error:', orgError);
        } else {
          organizationId = orgData.id;
        }
      }

      // Update profile with additional information
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          organization_id: organizationId,
          role: organizationId ? 'org_admin' : 'user' // First user in org becomes admin
        })
        .eq('id', authData.user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
      }
    }
    
    return { success: true, data: authData };
  } catch (error) {
    console.error('Sign up error:', error);
    return { success: false, error: error.message };
  }
};

// ✅ Sign out user
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    return { success: false, error: error.message };
  }
};

// ✅ Request a password reset
export const resetPassword = async (email) => {
  if (!isSupabaseConfigured()) {
    throw new Error('Authentication service not configured');
  }

  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Password reset error:', error);
    return { success: false, error: error.message };
  }
};

// ✅ Update password
export const updatePassword = async (newPassword) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    
    if (error) throw error;
    toast.success('Password updated successfully');
    return { success: true, data };
  } catch (error) {
    console.error('Password update error:', error);
    toast.error('Failed to update password');
    return { success: false, error: error.message };
  }
};

// ✅ Update profile
export const updateProfile = async (profileData) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error("No authenticated user");

    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...profileData,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    toast.success('Profile updated successfully');
    return { success: true, data };
  } catch (error) {
    console.error("Update profile error:", error);
    toast.error('Failed to update profile');
    return { success: false, error: error.message };
  }
};

// ✅ Create super admin user if it doesn't exist
export const ensureSuperAdmin = async () => {
  if (!isSupabaseConfigured()) return;

  try {
    // Check if super admin exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'superadmin@workflowgene.cloud')
      .eq('role', 'super_admin')
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking for super admin:', checkError);
      return;
    }

    if (!existingAdmin) {
      // Create super admin profile if it doesn't exist
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          email: 'superadmin@workflowgene.cloud',
          first_name: 'Super',
          last_name: 'Admin',
          role: 'super_admin',
          email_verified: true
        }, {
          onConflict: 'email'
        });

      if (updateError) {
        console.error('Error creating super admin:', updateError);
      } else {
        console.log('Super admin profile ensured');
      }
    }
  } catch (error) {
    console.error('Error ensuring super admin:', error);
  }
};