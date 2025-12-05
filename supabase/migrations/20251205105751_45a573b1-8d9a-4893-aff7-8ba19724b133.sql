-- Create prayer_requests table
CREATE TABLE public.prayer_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  request TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert prayer requests
CREATE POLICY "Anyone can submit prayer requests"
ON public.prayer_requests
FOR INSERT
WITH CHECK (true);

-- Allow anyone to view prayer requests (for admin)
CREATE POLICY "Anyone can view prayer requests"
ON public.prayer_requests
FOR SELECT
USING (true);

-- Create comments table for blog posts
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_slug TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT,
  content TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert comments
CREATE POLICY "Anyone can submit comments"
ON public.comments
FOR INSERT
WITH CHECK (true);

-- Allow anyone to view comments
CREATE POLICY "Anyone can view comments"
ON public.comments
FOR SELECT
USING (true);

-- Allow anyone to manage comments (for admin)
CREATE POLICY "Anyone can manage comments"
ON public.comments
FOR ALL
USING (true)
WITH CHECK (true);