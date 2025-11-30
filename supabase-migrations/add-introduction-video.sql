-- Add introduction_video_url column to candidates table
ALTER TABLE candidates ADD COLUMN introduction_video_url TEXT;

-- Create storage bucket for introduction videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('introduction-videos', 'introduction-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for introduction-videos bucket
-- Allow anyone to view videos
CREATE POLICY "Anyone can view introduction videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'introduction-videos');

-- Allow authenticated users to upload their own videos
CREATE POLICY "Authenticated users can upload introduction videos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'introduction-videos' AND
  auth.role() = 'authenticated'
);

-- Allow authenticated users to update their own videos
CREATE POLICY "Authenticated users can update their introduction videos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'introduction-videos' AND
  auth.role() = 'authenticated'
);

-- Allow authenticated users to delete their own videos
CREATE POLICY "Authenticated users can delete their introduction videos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'introduction-videos' AND
  auth.role() = 'authenticated'
);
