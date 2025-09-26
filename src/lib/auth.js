// lib/auth.js
import { supabase } from './supabase';

// Fetch the current profile from Supabase
export const getCurrentProfile = async () => {
  try {
    // Get active auth user from Supabase session
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) return null;

    // Query the "profiles" table using the user's ID
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)   // ✅ same UUID as Supabase auth.users
      .single();

    if (profileError) throw profileError;

    return profile;
  } catch (error) {
    console.error('Error fetching current profile:', error.message);
    return null;
  }
};
