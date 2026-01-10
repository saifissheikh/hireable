-- Add profession column to candidates table
ALTER TABLE candidates ADD COLUMN IF NOT EXISTS profession TEXT;


