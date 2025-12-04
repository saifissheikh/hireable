-- Create users table to track user roles
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT NOT NULL CHECK (role IN ('candidate', 'recruiter')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);

-- Create index on role for filtering
CREATE INDEX IF NOT EXISTS users_role_idx ON users(role);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own data
CREATE POLICY "Users can view own data"
ON users FOR SELECT
USING (auth.jwt() ->> 'email' = email);

-- Policy: Users can update their own data
CREATE POLICY "Users can update own data"
ON users FOR UPDATE
USING (auth.jwt() ->> 'email' = email);

-- Policy: Anyone authenticated can insert (for first-time user creation)
CREATE POLICY "Authenticated users can insert"
ON users FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Success message
SELECT 'Successfully created users table with role management!' as message;
