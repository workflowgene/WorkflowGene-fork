/*
  # CMS Builder Schema

  1. New Tables
    - `cms_pages` - Page content and structure
    - `cms_versions` - Version history for pages
    - `cms_media` - Media library management
    - `cms_templates` - Reusable page templates

  2. Security
    - Enable RLS on all tables
    - Super admin access for CMS management
    - Version control and audit trail

  3. Features
    - Page content management
    - Component-based structure
    - SEO metadata
    - Media library
    - Version history
*/

-- CMS pages table
CREATE TABLE IF NOT EXISTS cms_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id text NOT NULL,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  title text NOT NULL,
  slug text NOT NULL,
  components jsonb DEFAULT '[]',
  seo jsonb DEFAULT '{}',
  status text DEFAULT 'draft',
  published_at timestamptz,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page_id, organization_id)
);

-- CMS versions table for version control
CREATE TABLE IF NOT EXISTS cms_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id text NOT NULL,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  content jsonb NOT NULL,
  version_type text DEFAULT 'draft',
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- CMS media library
CREATE TABLE IF NOT EXISTS cms_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  filename text NOT NULL,
  original_name text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL,
  url text NOT NULL,
  alt_text text,
  caption text,
  metadata jsonb DEFAULT '{}',
  uploaded_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- CMS templates for reusable components
CREATE TABLE IF NOT EXISTS cms_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  components jsonb NOT NULL DEFAULT '[]',
  preview_image text,
  is_global boolean DEFAULT false,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_templates ENABLE ROW LEVEL SECURITY;

-- CMS pages policies (super admin only)
CREATE POLICY "Super admins can manage CMS pages"
  ON cms_pages
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- CMS versions policies (super admin only)
CREATE POLICY "Super admins can manage CMS versions"
  ON cms_versions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- CMS media policies (super admin only)
CREATE POLICY "Super admins can manage CMS media"
  ON cms_media
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- CMS templates policies (super admin only)
CREATE POLICY "Super admins can manage CMS templates"
  ON cms_templates
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Add updated_at triggers
CREATE TRIGGER update_cms_pages_updated_at
  BEFORE UPDATE ON cms_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_templates_updated_at
  BEFORE UPDATE ON cms_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();