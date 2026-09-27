-- ==============================================================================
-- HITESH'S NIGHT OUT - SUPABASE POSTGRESQL SCHEMA
-- ==============================================================================

-- 1. Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  number_of_people INTEGER NOT NULL DEFAULT 1 CHECK (number_of_people >= 1),
  message TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'confirmed',
  registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create indices for high performance queries
CREATE INDEX IF NOT EXISTS idx_registrations_phone ON registrations(phone);
CREATE INDEX IF NOT EXISTS idx_registrations_created ON registrations(registered_at DESC);

-- 3. Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Drop older policies if re-running
DROP POLICY IF EXISTS "Allow public insert on registrations" ON registrations;
DROP POLICY IF EXISTS "Allow service role full access on registrations" ON registrations;
DROP POLICY IF EXISTS "Allow read registrations" ON registrations;
DROP POLICY IF EXISTS "Allow insert registrations" ON registrations;
DROP POLICY IF EXISTS "Allow select registrations" ON registrations;
DROP POLICY IF EXISTS "Allow delete registrations" ON registrations;

-- Allow INSERT for everyone (public registration)
CREATE POLICY "Allow insert registrations"
  ON registrations
  FOR INSERT
  TO anon, authenticated, service_role
  WITH CHECK (true);

-- Allow SELECT for queries from Next.js API
CREATE POLICY "Allow select registrations"
  ON registrations
  FOR SELECT
  TO anon, authenticated, service_role
  USING (true);

-- Allow DELETE for host admin actions
CREATE POLICY "Allow delete registrations"
  ON registrations
  FOR DELETE
  TO anon, authenticated, service_role
  USING (true);
