/*
  # Fix Service Role Update Policy for Profiles

  1. Security
    - Add RLS policy to allow service_role to update profiles table
    - This fixes the "Database error granting user" issue during authentication

  2. Changes
    - Allow service_role to update profiles (needed for handle_new_user trigger)
    - Ensures ON CONFLICT DO UPDATE works properly in the trigger function
*/

-- Allow service role to update profiles (needed for trigger function)
CREATE POLICY "Enable update for service role"
  ON profiles
  FOR UPDATE
  TO service_role
  WITH CHECK (true);