
-- Fix RESTRICTIVE RLS policies across all tables
-- Convert them to PERMISSIVE so operations actually work

-- NOTIFICATIONS: Allow full management
DROP POLICY IF EXISTS "Notifications are viewable by everyone" ON public.notifications;
DROP POLICY IF EXISTS "Anyone can manage notifications" ON public.notifications;
CREATE POLICY "Notifications viewable by everyone" ON public.notifications FOR SELECT USING (true);
CREATE POLICY "Notifications full management" ON public.notifications FOR ALL USING (true) WITH CHECK (true);

-- PRAYER REQUESTS: Allow admin delete/update
DROP POLICY IF EXISTS "Anyone can submit prayer requests" ON public.prayer_requests;
DROP POLICY IF EXISTS "Anyone can view prayer requests" ON public.prayer_requests;
CREATE POLICY "Prayer requests viewable" ON public.prayer_requests FOR SELECT USING (true);
CREATE POLICY "Prayer requests insertable" ON public.prayer_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Prayer requests deletable" ON public.prayer_requests FOR DELETE USING (true);
CREATE POLICY "Prayer requests updatable" ON public.prayer_requests FOR UPDATE USING (true);

-- COMMENTS: Fix restrictive policies
DROP POLICY IF EXISTS "Anyone can submit comments" ON public.comments;
DROP POLICY IF EXISTS "Anyone can view comments" ON public.comments;
DROP POLICY IF EXISTS "Anyone can manage comments" ON public.comments;
CREATE POLICY "Comments full access" ON public.comments FOR ALL USING (true) WITH CHECK (true);

-- MEDIA GALLERY: Fix restrictive policy
DROP POLICY IF EXISTS "Anyone can manage media gallery" ON public.media_gallery;
CREATE POLICY "Media gallery full access" ON public.media_gallery FOR ALL USING (true) WITH CHECK (true);

-- SERMONS: Fix restrictive policy
DROP POLICY IF EXISTS "Anyone can manage sermons" ON public.sermons;
CREATE POLICY "Sermons full access" ON public.sermons FOR ALL USING (true) WITH CHECK (true);

-- BLOG POSTS: Fix restrictive policy
DROP POLICY IF EXISTS "Anyone can manage blog posts" ON public.blog_posts;
CREATE POLICY "Blog posts full access" ON public.blog_posts FOR ALL USING (true) WITH CHECK (true);

-- EVENTS: Fix restrictive policy
DROP POLICY IF EXISTS "Anyone can manage events" ON public.events;
CREATE POLICY "Events full access" ON public.events FOR ALL USING (true) WITH CHECK (true);

-- ANNOUNCEMENTS: Fix restrictive policy
DROP POLICY IF EXISTS "Anyone can manage announcements" ON public.announcements;
CREATE POLICY "Announcements full access" ON public.announcements FOR ALL USING (true) WITH CHECK (true);

-- LEADERS: Fix restrictive policy
DROP POLICY IF EXISTS "Anyone can manage leaders" ON public.leaders;
CREATE POLICY "Leaders full access" ON public.leaders FOR ALL USING (true) WITH CHECK (true);

-- MINISTRIES: Fix restrictive policy
DROP POLICY IF EXISTS "Anyone can manage ministries" ON public.ministries;
CREATE POLICY "Ministries full access" ON public.ministries FOR ALL USING (true) WITH CHECK (true);

-- FELLOWSHIPS: Fix restrictive policy
DROP POLICY IF EXISTS "Anyone can manage fellowships" ON public.fellowships;
CREATE POLICY "Fellowships full access" ON public.fellowships FOR ALL USING (true) WITH CHECK (true);

-- WEEKLY ACTIVITIES: Fix restrictive policy
DROP POLICY IF EXISTS "Anyone can manage weekly activities" ON public.weekly_activities;
CREATE POLICY "Weekly activities full access" ON public.weekly_activities FOR ALL USING (true) WITH CHECK (true);

-- VOLUNTEER OPPORTUNITIES: Fix restrictive policy
DROP POLICY IF EXISTS "Anyone can manage volunteer opportunities" ON public.volunteer_opportunities;
CREATE POLICY "Volunteer opportunities full access" ON public.volunteer_opportunities FOR ALL USING (true) WITH CHECK (true);

-- PROFILES: Add insert policy for trigger
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Profiles viewable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Profiles insertable" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Profiles updatable by owner" ON public.profiles FOR UPDATE USING (auth.uid() = id);
