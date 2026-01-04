-- Add job_title column to candidates table
ALTER TABLE candidates 
ADD COLUMN IF NOT EXISTS job_title TEXT;

-- Success message
SELECT 'Successfully added job_title column to candidates table!' as message;
