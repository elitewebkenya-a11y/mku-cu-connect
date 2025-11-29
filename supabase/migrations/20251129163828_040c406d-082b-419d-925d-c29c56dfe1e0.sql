-- Drop existing restrictive RLS policies and create new ones for public access
-- Since user wants no authentication, we'll allow public access to all tables

-- Weekly Activities
DROP POLICY IF EXISTS "Admins can manage weekly activities" ON public.weekly_activities;
DROP POLICY IF EXISTS "Anyone can view active weekly activities" ON public.weekly_activities;

CREATE POLICY "Anyone can manage weekly activities"
ON public.weekly_activities
FOR ALL
USING (true)
WITH CHECK (true);

-- Events
DROP POLICY IF EXISTS "Admins can manage events" ON public.events;
DROP POLICY IF EXISTS "Anyone can view events" ON public.events;

CREATE POLICY "Anyone can manage events"
ON public.events
FOR ALL
USING (true)
WITH CHECK (true);

-- Announcements
DROP POLICY IF EXISTS "Admins can manage announcements" ON public.announcements;
DROP POLICY IF EXISTS "Anyone can view active announcements" ON public.announcements;

CREATE POLICY "Anyone can manage announcements"
ON public.announcements
FOR ALL
USING (true)
WITH CHECK (true);

-- Sermons
DROP POLICY IF EXISTS "Admins can manage sermons" ON public.sermons;
DROP POLICY IF EXISTS "Anyone can view sermons" ON public.sermons;

CREATE POLICY "Anyone can manage sermons"
ON public.sermons
FOR ALL
USING (true)
WITH CHECK (true);

-- Blog Posts
DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON public.blog_posts;

CREATE POLICY "Anyone can manage blog posts"
ON public.blog_posts
FOR ALL
USING (true)
WITH CHECK (true);

-- Leaders
DROP POLICY IF EXISTS "Admins can manage leaders" ON public.leaders;
DROP POLICY IF EXISTS "Anyone can view active leaders" ON public.leaders;

CREATE POLICY "Anyone can manage leaders"
ON public.leaders
FOR ALL
USING (true)
WITH CHECK (true);

-- Ministries
DROP POLICY IF EXISTS "Admins can manage ministries" ON public.ministries;
DROP POLICY IF EXISTS "Anyone can view active ministries" ON public.ministries;

CREATE POLICY "Anyone can manage ministries"
ON public.ministries
FOR ALL
USING (true)
WITH CHECK (true);

-- Fellowships
DROP POLICY IF EXISTS "Admins can manage fellowships" ON public.fellowships;
DROP POLICY IF EXISTS "Anyone can view active fellowships" ON public.fellowships;

CREATE POLICY "Anyone can manage fellowships"
ON public.fellowships
FOR ALL
USING (true)
WITH CHECK (true);

-- Volunteer Opportunities
DROP POLICY IF EXISTS "Admins can manage volunteer opportunities" ON public.volunteer_opportunities;
DROP POLICY IF EXISTS "Anyone can view active volunteer opportunities" ON public.volunteer_opportunities;

CREATE POLICY "Anyone can manage volunteer opportunities"
ON public.volunteer_opportunities
FOR ALL
USING (true)
WITH CHECK (true);

-- Media Gallery
DROP POLICY IF EXISTS "Admins can manage media gallery" ON public.media_gallery;
DROP POLICY IF EXISTS "Anyone can view media gallery" ON public.media_gallery;

CREATE POLICY "Anyone can manage media gallery"
ON public.media_gallery
FOR ALL
USING (true)
WITH CHECK (true);