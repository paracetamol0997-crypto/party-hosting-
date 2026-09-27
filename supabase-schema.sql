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

-- Allow public to INSERT new registrations
CREATE POLICY "Allow public insert on registrations"
  ON registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow service role full access
CREATE POLICY "Allow service role full access on registrations"
  ON registrations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Optional: Allow public read of their own registration if needed
CREATE POLICY "Allow read registrations"
  ON registrations
  FOR SELECT
  TO service_role
  USING (true);
