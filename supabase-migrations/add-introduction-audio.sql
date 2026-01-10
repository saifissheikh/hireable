-- Add introduction_audio_url column to candidates table
ALTER TABLE candidates ADD COLUMN IF NOT EXISTS introduction_audio_url TEXT;
