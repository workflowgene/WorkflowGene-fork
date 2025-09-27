/*
  # Create Super Admin User

  1. Ensure super admin profile exists
  2. Set proper role and permissions
  3. Enable email verification
*/

-- Insert or update super admin profile
INSERT INTO profiles (
  email,
  first_name,
  last_name,
  role,
  email_verified,
  created_at,
  updated_at
) VALUES (
  'superadmin@workflowgene.cloud',
  'Super',
  'Admin',
  'super_admin',
  true,
  now(),
  now()
) ON CONFLICT (email) DO UPDATE SET
  role = 'super_admin',
  email_verified = true,
  first_name = COALESCE(profiles.first_name, 'Super'),
  last_name = COALESCE(profiles.last_name, 'Admin'),
  updated_at = now();