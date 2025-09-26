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
