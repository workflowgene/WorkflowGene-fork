/*
  # Fresh WorkflowGene Cloud Database Schema

  1. Core Tables
    - `organizations` - Company/organization data
    - `profiles` - User profiles with role-based access
    - `workflows` - Workflow management
    - `workflow_executions` - Execution tracking
    - `integrations` - Available integrations
    - `organization_integrations` - Installed integrations per org
    - `billing_subscriptions` - Subscription management
    - `activity_logs` - System activity tracking
    - `notifications` - User notifications

  2. CMS Tables (Super Admin Only)
    - `cms_pages` - Website page management
    - `cms_components` - Page components
    - `cms_media` - Media library
    - `cms_versions` - Version control

  3. Security & Roles
    - super_admin: Full platform access + CMS management
    - org_admin: Organization management
    - manager: Workflow oversight within org
    - user: Basic workflow access within org

  4. Authentication
    - Proper RLS policies for all roles
    - Service role permissions for auth triggers
    - Role-based dashboard access
*/

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Custom types
CREATE TYPE user_role AS ENUM ('super_admin', 'org_admin', 'manager', 'user');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'trialing', 'incomplete');
CREATE TYPE workflow_status AS ENUM ('draft', 'active', 'paused', 'archived');
CREATE TYPE execution_status AS ENUM ('pending', 'running', 'completed', 'failed', 'canceled');

-- Organizations table
CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  industry text,
  company_size text,
  website text,
  logo_url text,
  settings jsonb DEFAULT '{}',
  billing_email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Profiles table (users)
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  avatar_url text,
  phone text,
  role user_role DEFAULT 'user',
  organization_id uuid REFERENCES organizations(id) ON DELETE SET NULL,
  preferences jsonb DEFAULT '{"theme": "light", "notifications": {"email": true, "push": true}}',
  last_login timestamptz,
  email_verified boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Workflows table
CREATE TABLE workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  assigned_to uuid[] DEFAULT '{}',
  status workflow_status DEFAULT 'draft',
  config jsonb DEFAULT '{}',
  tags text[] DEFAULT '{}',
  execution_count integer DEFAULT 0,
  last_executed timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Workflow executions table
CREATE TABLE workflow_executions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id uuid REFERENCES workflows(id) ON DELETE CASCADE,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  triggered_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  status execution_status DEFAULT 'pending',
  input_data jsonb DEFAULT '{}',
  output_data jsonb DEFAULT '{}',
  error_message text,
  execution_time_ms integer,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Available integrations (global)
CREATE TABLE integrations (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  category text NOT NULL,
  logo_url text,
  website_url text,
  documentation_url text,
  config_schema jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Organization integrations (installed per org)
CREATE TABLE organization_integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  integration_id text REFERENCES integrations(id) ON DELETE CASCADE,
  config jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  installed_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  installed_at timestamptz DEFAULT now(),
  UNIQUE(organization_id, integration_id)
);

-- Billing subscriptions
CREATE TABLE billing_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  stripe_subscription_id text UNIQUE,
  stripe_customer_id text,
  plan_name text NOT NULL DEFAULT 'starter',
  status subscription_status DEFAULT 'trialing',
  current_period_start timestamptz,
  current_period_end timestamptz,
  trial_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activity logs
CREATE TABLE activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  workflow_id uuid REFERENCES workflows(id) ON DELETE SET NULL,
  action text NOT NULL,
  description text,
  type text NOT NULL,
  metadata jsonb DEFAULT '{}',
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Notifications
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info',
  read boolean DEFAULT false,
  action_url text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- API keys for organizations
CREATE TABLE api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  key_hash text NOT NULL,
  key_prefix text NOT NULL,
  permissions jsonb DEFAULT '{"read": true, "write": false}',
  last_used timestamptz,
  expires_at timestamptz,
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- User security settings
CREATE TABLE user_security (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  two_factor_enabled boolean DEFAULT false,
  totp_secret text,
  backup_codes text[],
  recovery_codes_used integer DEFAULT 0,
  last_login_ip inet,
  failed_login_attempts integer DEFAULT 0,
  locked_until timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Contact form submissions
CREATE TABLE contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  industry text,
  company_size text,
  status text DEFAULT 'new',
  assigned_to uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- CMS Tables (Super Admin Only)
CREATE TABLE cms_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id text UNIQUE NOT NULL,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content jsonb DEFAULT '{}',
  seo_data jsonb DEFAULT '{}',
  status text DEFAULT 'draft',
  published_at timestamptz,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- CMS components library
CREATE TABLE cms_components (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  config jsonb DEFAULT '{}',
  preview_image text,
  category text DEFAULT 'general',
  is_global boolean DEFAULT true,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- CMS media library
CREATE TABLE cms_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  original_name text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL,
  url text NOT NULL,
  alt_text text,
  caption text,
  folder text DEFAULT 'uploads',
  metadata jsonb DEFAULT '{}',
  uploaded_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- CMS version history
CREATE TABLE cms_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id text NOT NULL,
  version_number integer NOT NULL,
  content jsonb NOT NULL,
  change_summary text,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(page_id, version_number)
);

-- System health monitoring (Super Admin only)
CREATE TABLE system_health (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name text NOT NULL,
  status text NOT NULL,
  response_time_ms integer,
  uptime_percentage numeric(5,2),
  error_count integer DEFAULT 0,
  last_check timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Error logs (Super Admin only)
CREATE TABLE error_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name text NOT NULL,
  error_level text NOT NULL,
  error_message text NOT NULL,
  error_details jsonb DEFAULT '{}',
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  organization_id uuid REFERENCES organizations(id) ON DELETE SET NULL,
  resolved boolean DEFAULT false,
  resolved_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_security ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PROFILES POLICIES (Core Authentication)
-- ============================================================================

-- Allow users to read their own profile
CREATE POLICY "users_read_own_profile" ON profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "users_update_own_profile" ON profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- Allow service role to insert profiles (for auth trigger)
CREATE POLICY "service_role_insert_profiles" ON profiles
  FOR INSERT TO service_role
  WITH CHECK (true);

-- Allow service role to update profiles (for auth trigger)
CREATE POLICY "service_role_update_profiles" ON profiles
  FOR UPDATE TO service_role
  USING (true);

-- Super admin can read all profiles
CREATE POLICY "super_admin_read_all_profiles" ON profiles
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() AND p.role = 'super_admin'
    )
  );

-- Super admin can update all profiles
CREATE POLICY "super_admin_update_all_profiles" ON profiles
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() AND p.role = 'super_admin'
    )
  );

-- Org admins can read profiles in their organization
CREATE POLICY "org_admin_read_org_profiles" ON profiles
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role IN ('org_admin', 'manager')
      AND p.organization_id = profiles.organization_id
    )
  );

-- ============================================================================
-- ORGANIZATIONS POLICIES
-- ============================================================================

-- Users can read their own organization
CREATE POLICY "users_read_own_organization" ON organizations
  FOR SELECT TO authenticated
  USING (
    id IN (
      SELECT organization_id FROM profiles 
      WHERE id = auth.uid() AND organization_id IS NOT NULL
    )
  );

-- Super admin can manage all organizations
CREATE POLICY "super_admin_manage_organizations" ON organizations
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Org admins can update their own organization
CREATE POLICY "org_admin_update_organization" ON organizations
  FOR UPDATE TO authenticated
  USING (
    id IN (
      SELECT organization_id FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('org_admin', 'super_admin')
      AND organization_id IS NOT NULL
    )
  );

-- ============================================================================
-- WORKFLOWS POLICIES
-- ============================================================================

-- Users can read workflows in their organization or assigned to them
CREATE POLICY "users_read_workflows" ON workflows
  FOR SELECT TO authenticated
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

-- Managers and above can create/update workflows in their org
CREATE POLICY "managers_manage_workflows" ON workflows
  FOR ALL TO authenticated
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

-- ============================================================================
-- WORKFLOW EXECUTIONS POLICIES
-- ============================================================================

-- Users can read executions for workflows they have access to
CREATE POLICY "users_read_executions" ON workflow_executions
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND (
        p.role = 'super_admin'
        OR p.organization_id = workflow_executions.organization_id
      )
    )
  );

-- Users can create executions for workflows they have access to
CREATE POLICY "users_create_executions" ON workflow_executions
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND (
        p.role = 'super_admin'
        OR p.organization_id = workflow_executions.organization_id
      )
    )
  );

-- ============================================================================
-- INTEGRATIONS POLICIES
-- ============================================================================

-- Anyone can read available integrations
CREATE POLICY "public_read_integrations" ON integrations
  FOR SELECT TO authenticated
  USING (is_active = true);

-- Super admin can manage integrations
CREATE POLICY "super_admin_manage_integrations" ON integrations
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- ============================================================================
-- ORGANIZATION INTEGRATIONS POLICIES
-- ============================================================================

-- Users can read their org's integrations
CREATE POLICY "users_read_org_integrations" ON organization_integrations
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND (
        p.role = 'super_admin'
        OR p.organization_id = organization_integrations.organization_id
      )
    )
  );

-- Managers can install/manage org integrations
CREATE POLICY "managers_manage_org_integrations" ON organization_integrations
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND (
        p.role = 'super_admin'
        OR (p.organization_id = organization_integrations.organization_id AND p.role IN ('org_admin', 'manager'))
      )
    )
  );

-- ============================================================================
-- BILLING POLICIES
-- ============================================================================

-- Org members can read their billing info
CREATE POLICY "users_read_org_billing" ON billing_subscriptions
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND (
        p.role = 'super_admin'
        OR p.organization_id = billing_subscriptions.organization_id
      )
    )
  );

-- Org admins can manage billing
CREATE POLICY "org_admin_manage_billing" ON billing_subscriptions
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND (
        p.role = 'super_admin'
        OR (p.organization_id = billing_subscriptions.organization_id AND p.role = 'org_admin')
      )
    )
  );

-- ============================================================================
-- ACTIVITY LOGS POLICIES
-- ============================================================================

-- Users can read activity in their organization
CREATE POLICY "users_read_org_activity" ON activity_logs
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND (
        p.role = 'super_admin'
        OR p.organization_id = activity_logs.organization_id
      )
    )
  );

-- All authenticated users can create activity logs
CREATE POLICY "users_create_activity" ON activity_logs
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- NOTIFICATIONS POLICIES
-- ============================================================================

-- Users can manage their own notifications
CREATE POLICY "users_manage_notifications" ON notifications
  FOR ALL TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================================
-- API KEYS POLICIES
-- ============================================================================

-- Org members can read their org's API keys
CREATE POLICY "users_read_org_api_keys" ON api_keys
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND (
        p.role = 'super_admin'
        OR p.organization_id = api_keys.organization_id
      )
    )
  );

-- Org admins can manage API keys
CREATE POLICY "org_admin_manage_api_keys" ON api_keys
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND (
        p.role = 'super_admin'
        OR (p.organization_id = api_keys.organization_id AND p.role = 'org_admin')
      )
    )
  );

-- ============================================================================
-- USER SECURITY POLICIES
-- ============================================================================

-- Users can manage their own security settings
CREATE POLICY "users_manage_own_security" ON user_security
  FOR ALL TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================================
-- CONTACT SUBMISSIONS POLICIES (Super Admin Only)
-- ============================================================================

-- Super admin can manage all contact submissions
CREATE POLICY "super_admin_manage_contacts" ON contact_submissions
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- ============================================================================
-- CMS POLICIES (Super Admin Only)
-- ============================================================================

-- Super admin can manage CMS pages
CREATE POLICY "super_admin_manage_cms_pages" ON cms_pages
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Super admin can manage CMS components
CREATE POLICY "super_admin_manage_cms_components" ON cms_components
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Super admin can manage CMS media
CREATE POLICY "super_admin_manage_cms_media" ON cms_media
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Super admin can manage CMS versions
CREATE POLICY "super_admin_manage_cms_versions" ON cms_versions
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- ============================================================================
-- SYSTEM HEALTH POLICIES (Super Admin Only)
-- ============================================================================

-- Super admin can manage system health
CREATE POLICY "super_admin_manage_system_health" ON system_health
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Super admin can manage error logs
CREATE POLICY "super_admin_manage_error_logs" ON error_logs
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to handle new user creation
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

-- Function to log activity
CREATE OR REPLACE FUNCTION log_activity(
  p_organization_id uuid,
  p_user_id uuid,
  p_action text,
  p_description text,
  p_type text,
  p_metadata jsonb DEFAULT '{}'
)
RETURNS void AS $$
BEGIN
  INSERT INTO activity_logs (
    organization_id,
    user_id,
    action,
    description,
    type,
    metadata
  ) VALUES (
    p_organization_id,
    p_user_id,
    p_action,
    p_description,
    p_type,
    p_metadata
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers for updated_at
CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflows_updated_at
  BEFORE UPDATE ON workflows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_billing_subscriptions_updated_at
  BEFORE UPDATE ON billing_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_security_updated_at
  BEFORE UPDATE ON user_security
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_pages_updated_at
  BEFORE UPDATE ON cms_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Trigger for user updates (email confirmation)
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================================
-- INITIAL DATA
-- ============================================================================

-- Create super admin profile (will be created via trigger when auth user is created)
-- The super admin user must be created through Supabase Auth first

-- Insert default integrations
INSERT INTO integrations (id, name, description, category, logo_url, is_active) VALUES
('salesforce', 'Salesforce', 'Customer relationship management platform', 'crm', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop', true),
('slack', 'Slack', 'Team communication and collaboration', 'communication', 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=64&h=64&fit=crop', true),
('shopify', 'Shopify', 'E-commerce platform integration', 'ecommerce', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=64&h=64&fit=crop', true),
('stripe', 'Stripe', 'Payment processing platform', 'finance', 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=64&h=64&fit=crop', true),
('google-sheets', 'Google Sheets', 'Spreadsheet data management', 'productivity', 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=64&h=64&fit=crop', true),
('mailchimp', 'Mailchimp', 'Email marketing automation', 'marketing', 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=64&h=64&fit=crop', true),
('hubspot', 'HubSpot', 'Inbound marketing and sales platform', 'crm', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop', true),
('zapier', 'Zapier', 'Automation platform connector', 'productivity', 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=64&h=64&fit=crop', true);

-- Insert default CMS components
INSERT INTO cms_components (name, type, config, category, is_global) VALUES
('Hero Section', 'hero', '{"title": "Hero Title", "subtitle": "Hero subtitle", "cta_text": "Get Started"}', 'layout', true),
('Feature Grid', 'feature-grid', '{"columns": 3, "features": []}', 'content', true),
('Testimonial', 'testimonial', '{"quote": "", "author": "", "role": "", "company": ""}', 'social-proof', true),
('Contact Form', 'contact-form', '{"fields": ["name", "email", "message"]}', 'forms', true),
('Pricing Table', 'pricing-table', '{"plans": []}', 'commerce', true);

-- Insert default CMS pages
INSERT INTO cms_pages (page_id, title, slug, content, status) VALUES
('homepage', 'Homepage', 'home', '{"components": []}', 'published'),
('about', 'About Us', 'about', '{"components": []}', 'published'),
('contact', 'Contact', 'contact', '{"components": []}', 'published'),
('pricing', 'Pricing', 'pricing', '{"components": []}', 'published');