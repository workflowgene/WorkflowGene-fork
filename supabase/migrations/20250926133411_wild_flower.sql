/*
  # Extended Platform Features Schema

  1. New Tables
    - `workflow_versions` - Version control for workflows
    - `activity_logs` - Team collaboration activity tracking
    - `collaboration_comments` - Team comments and discussions
    - `installed_integrations` - Marketplace integration tracking
    - `user_security` - Two-factor authentication settings
    - `system_health` - System monitoring and health metrics
    - `error_logs` - Application error tracking

  2. Security
    - Enable RLS on all new tables
    - Add appropriate policies for role-based access

  3. Features
    - Real-time collaboration tracking
    - Version control for workflows
    - Integration marketplace management
    - Enhanced security features
    - System health monitoring
*/

-- Workflow versions for version control
CREATE TABLE IF NOT EXISTS workflow_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id uuid REFERENCES workflows(id) ON DELETE CASCADE,
  version integer NOT NULL,
  config jsonb NOT NULL DEFAULT '{}',
  changelog text,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(workflow_id, version)
);

-- Activity logs for team collaboration
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  workflow_id uuid REFERENCES workflows(id) ON DELETE CASCADE,
  action text NOT NULL,
  description text,
  type text NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Collaboration comments
CREATE TABLE IF NOT EXISTS collaboration_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  workflow_id uuid REFERENCES workflows(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES collaboration_comments(id) ON DELETE CASCADE,
  content text NOT NULL,
  type text DEFAULT 'comment',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Installed integrations for marketplace
CREATE TABLE IF NOT EXISTS installed_integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  integration_id text NOT NULL,
  installed_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  status text DEFAULT 'active',
  config jsonb DEFAULT '{}',
  installed_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(organization_id, integration_id)
);

-- User security settings for 2FA
CREATE TABLE IF NOT EXISTS user_security (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  two_factor_enabled boolean DEFAULT false,
  totp_secret text,
  backup_codes text[],
  recovery_codes_used integer DEFAULT 0,
  last_login_ip inet,
  login_attempts integer DEFAULT 0,
  locked_until timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- System health monitoring
CREATE TABLE IF NOT EXISTS system_health (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name text NOT NULL,
  status text NOT NULL,
  response_time_ms integer,
  uptime_percentage numeric(5,2),
  last_check timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Error logs for system monitoring
CREATE TABLE IF NOT EXISTS error_logs (
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

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  author_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  published boolean DEFAULT false,
  published_at timestamptz,
  image_url text,
  meta_description text,
  read_time_minutes integer,
  views integer DEFAULT 0,
  likes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE workflow_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE installed_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_security ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Workflow versions policies
CREATE POLICY "Users can read workflow versions"
  ON workflow_versions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM workflows w
      JOIN profiles p ON p.id = auth.uid()
      WHERE w.id = workflow_versions.workflow_id
      AND (
        p.role = 'super_admin'
        OR p.organization_id = w.organization_id
        OR auth.uid() = ANY(w.assigned_to)
      )
    )
  );

CREATE POLICY "Managers can create workflow versions"
  ON workflow_versions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM workflows w
      JOIN profiles p ON p.id = auth.uid()
      WHERE w.id = workflow_versions.workflow_id
      AND p.organization_id = w.organization_id
      AND p.role IN ('super_admin', 'org_admin', 'manager')
    )
  );

-- Activity logs policies
CREATE POLICY "Users can read org activity logs"
  ON activity_logs
  FOR SELECT
  TO authenticated
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

CREATE POLICY "Users can create activity logs"
  ON activity_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Collaboration comments policies
CREATE POLICY "Users can read org comments"
  ON collaboration_comments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.organization_id = collaboration_comments.organization_id
    )
  );

CREATE POLICY "Users can create comments"
  ON collaboration_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.organization_id = collaboration_comments.organization_id
    )
  );

CREATE POLICY "Users can update own comments"
  ON collaboration_comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Installed integrations policies
CREATE POLICY "Users can read org integrations"
  ON installed_integrations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.organization_id = installed_integrations.organization_id
    )
  );

CREATE POLICY "Managers can manage integrations"
  ON installed_integrations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.organization_id = installed_integrations.organization_id
      AND p.role IN ('super_admin', 'org_admin', 'manager')
    )
  );

-- User security policies
CREATE POLICY "Users can manage own security"
  ON user_security
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- System health policies (super admin only)
CREATE POLICY "Super admins can read system health"
  ON system_health
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

CREATE POLICY "Super admins can manage system health"
  ON system_health
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Error logs policies (super admin only)
CREATE POLICY "Super admins can manage error logs"
  ON error_logs
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Blog posts policies (public read, admin write)
CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts
  FOR SELECT
  USING (published = true);

CREATE POLICY "Super admins can manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Add updated_at triggers
CREATE TRIGGER update_collaboration_comments_updated_at
  BEFORE UPDATE ON collaboration_comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_installed_integrations_updated_at
  BEFORE UPDATE ON installed_integrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_security_updated_at
  BEFORE UPDATE ON user_security
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();