/*
  # Fix Authentication Policies and Super Admin Setup

  1. Fix infinite recursion in profile policies
  2. Ensure super admin user exists with proper role
  3. Add proper RLS policies without recursion
  4. Clean up existing problematic policies
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Super admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Org admins can read org profiles" ON profiles;

-- Create new non-recursive policies for profiles
CREATE POLICY "Enable read access for users to own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Enable update access for users to own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Super admin policies (separate from regular user policies)
CREATE POLICY "Super admins can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'super_admin'
  );

CREATE POLICY "Super admins can update all profiles"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'super_admin'
  );

-- Ensure super admin user exists
DO $$
BEGIN
  -- Check if super admin profile exists
  IF NOT EXISTS (
    SELECT 1 FROM profiles WHERE email = 'superadmin@workflowgene.cloud'
  ) THEN
    -- Insert super admin profile
    INSERT INTO profiles (
      email,
      first_name,
      last_name,
      role,
      email_verified,
      organization_id,
      created_at,
      updated_at
    ) VALUES (
      'superadmin@workflowgene.cloud',
      'Super',
      'Admin',
      'super_admin',
      true,
      null,
      now(),
      now()
    );
  ELSE
    -- Update existing profile to ensure super admin role
    UPDATE profiles 
    SET 
      role = 'super_admin',
      email_verified = true,
      first_name = COALESCE(first_name, 'Super'),
      last_name = COALESCE(last_name, 'Admin'),
      organization_id = null,
      updated_at = now()
    WHERE email = 'superadmin@workflowgene.cloud';
  END IF;
END $$;

-- Fix organizations policies to avoid recursion
DROP POLICY IF EXISTS "Users can read own organization" ON organizations;
DROP POLICY IF EXISTS "Super admins can manage all organizations" ON organizations;
DROP POLICY IF EXISTS "Org admins can update own organization" ON organizations;

CREATE POLICY "Users can read their organization"
  ON organizations
  FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Super admins can manage organizations"
  ON organizations
  FOR ALL
  TO authenticated
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'super_admin'
  );

CREATE POLICY "Org admins can update their organization"
  ON organizations
  FOR UPDATE
  TO authenticated
  USING (
    id IN (
      SELECT organization_id FROM profiles 
      WHERE id = auth.uid() AND role IN ('org_admin', 'super_admin')
    )
  );

-- Fix workflows policies
DROP POLICY IF EXISTS "Users can read assigned workflows" ON workflows;
DROP POLICY IF EXISTS "Managers can manage org workflows" ON workflows;

CREATE POLICY "Users can read workflows"
  ON workflows
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND (
        p.role = 'super_admin'
        OR (p.organization_id = workflows.organization_id)
        OR (auth.uid() = ANY(workflows.assigned_to))
      )
    )
  );

CREATE POLICY "Managers can manage workflows"
  ON workflows
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND (
        p.role = 'super_admin'
        OR (p.organization_id = workflows.organization_id AND p.role IN ('org_admin', 'manager'))
      )
    )
  );

-- Add function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, email_verified, created_at, updated_at)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.email_confirmed_at IS NOT NULL, false),
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = NEW.email,
    email_verified = COALESCE(NEW.email_confirmed_at IS NOT NULL, false),
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Also handle user updates (email confirmation)
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();