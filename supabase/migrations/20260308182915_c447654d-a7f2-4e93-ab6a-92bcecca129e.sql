
-- Fix elections table: drop admin-only policy, add full access
DROP POLICY IF EXISTS "Admins can manage elections" ON public.elections;
CREATE POLICY "Elections full management" ON public.elections FOR ALL USING (true) WITH CHECK (true);

-- Fix election_candidates table: drop admin-only policy, add full access
DROP POLICY IF EXISTS "Admins can manage candidates" ON public.election_candidates;
CREATE POLICY "Candidates full management" ON public.election_candidates FOR ALL USING (true) WITH CHECK (true);

-- Fix home_fellowships table: drop admin-only policy, add full access
DROP POLICY IF EXISTS "Admins can manage home fellowships" ON public.home_fellowships;
CREATE POLICY "Home fellowships full management" ON public.home_fellowships FOR ALL USING (true) WITH CHECK (true);

-- Fix daily_schedule table: drop admin-only policy, add full access
DROP POLICY IF EXISTS "Admins can manage daily schedule" ON public.daily_schedule;
CREATE POLICY "Daily schedule full management" ON public.daily_schedule FOR ALL USING (true) WITH CHECK (true);

-- Fix faqs table: drop admin-only policy, add full access
DROP POLICY IF EXISTS "Admins can manage faqs" ON public.faqs;
CREATE POLICY "FAQs full management" ON public.faqs FOR ALL USING (true) WITH CHECK (true);

-- Fix special_programs table: drop admin-only policy, add full access
DROP POLICY IF EXISTS "Admins can manage special programs" ON public.special_programs;
CREATE POLICY "Special programs full management" ON public.special_programs FOR ALL USING (true) WITH CHECK (true);
