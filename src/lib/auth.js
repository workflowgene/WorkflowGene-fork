// src/lib/auth.js
import { supabase } from './supabase';

// ✅ Get the current user session
export const getCurrentUser = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session?.user || null;
};

// ✅ Get user profile from database (if you have a "profiles" table)
export const getCurrentProfile = async () => {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data;
};

// ✅ Sign in user
export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data;
};

// ✅ Sign up user
export const signUp = async ({ email, password, ...metadata }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: metadata }
  });
  if (error) throw error;
  return data;
};

// ✅ Sign out user
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// ✅ Request a password reset (sends email)
export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`, 
    // 👆 make sure you have a /reset-password route in your app
  });
  if (error) throw error;
  return data;
};

// ✅ Update the user password (after email link redirect)
export const updatePassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw error;
  return data;
};

// ✅ Update profile data
export const updateProfile = async (profileData) => {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error("No authenticated user");

    // Assuming you have a "profiles" table with a "user_id" column
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Update profile error:", err.message);
    throw err;
  }
};