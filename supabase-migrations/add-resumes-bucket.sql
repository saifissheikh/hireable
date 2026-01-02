-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for resumes bucket

-- Allow anyone to view resumes (public bucket)
CREATE POLICY "Anyone can view resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes');

-- Allow authenticated users to upload resumes
CREATE POLICY "Authenticated users can upload resumes"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'resumes' AND
  auth.role() = 'authenticated'
);

-- Allow authenticated users to update their own resumes
CREATE POLICY "Authenticated users can update their resumes"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'resumes' AND
  auth.role() = 'authenticated'
)
WITH CHECK (
  bucket_id = 'resumes' AND
  auth.role() = 'authenticated'
);

-- Allow authenticated users to delete their own resumes
CREATE POLICY "Authenticated users can delete their resumes"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'resumes' AND
  auth.role() = 'authenticated'
);
