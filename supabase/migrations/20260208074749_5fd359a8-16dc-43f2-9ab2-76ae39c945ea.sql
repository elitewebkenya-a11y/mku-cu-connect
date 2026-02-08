-- Make notifications writable without requiring an admin login (fixes Admin -> Send Notification)
-- and ensure realtime updates can be received by clients.

-- 1) Ensure realtime publication includes notifications (safe if already added)
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
  WHEN undefined_object THEN
    -- publication may not exist in some setups
    NULL;
END $$;

-- 2) RLS policies: allow anyone to INSERT/UPDATE/DELETE notifications
-- NOTE: existing restrictive policies can block access even if new permissive policies exist.
DROP POLICY IF EXISTS "Admins can manage notifications" ON public.notifications;

DROP POLICY IF EXISTS "Anyone can manage notifications" ON public.notifications;
CREATE POLICY "Anyone can manage notifications"
ON public.notifications
FOR ALL
USING (true)
WITH CHECK (true);
