-- 1. PROFILES: restrict SELECT to authenticated
DROP POLICY IF EXISTS "Profiles viewable" ON public.profiles;
CREATE POLICY "Profiles viewable by authenticated"
ON public.profiles FOR SELECT
TO authenticated
USING (true);

-- 2. PRAYER REQUESTS: restrict reads/updates/deletes to admins only
DROP POLICY IF EXISTS "Prayer requests viewable" ON public.prayer_requests;
DROP POLICY IF EXISTS "Prayer requests updatable" ON public.prayer_requests;
DROP POLICY IF EXISTS "Prayer requests deletable" ON public.prayer_requests;

CREATE POLICY "Admins view prayer requests"
ON public.prayer_requests FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update prayer requests"
ON public.prayer_requests FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete prayer requests"
ON public.prayer_requests FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 3. NOTIFICATIONS: restrict writes to admins
DROP POLICY IF EXISTS "Notifications full management" ON public.notifications;
CREATE POLICY "Admins manage notifications"
ON public.notifications FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 4. WEEKLY ACTIVITIES: admin-only writes, public read
DROP POLICY IF EXISTS "Weekly activities full access" ON public.weekly_activities;
CREATE POLICY "Weekly activities public read"
ON public.weekly_activities FOR SELECT
USING (true);
CREATE POLICY "Admins manage weekly activities"
ON public.weekly_activities FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5. Fix mutable search_path on helper trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;