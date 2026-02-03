-- Voting/Elections System Tables

-- Elections table for managing different election cycles
CREATE TABLE public.elections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Candidates table
CREATE TABLE public.election_candidates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  election_id UUID REFERENCES public.elections(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  manifesto TEXT,
  image_url TEXT,
  votes_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Votes table (tracks who voted, not what they voted for - for privacy)
CREATE TABLE public.election_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  election_id UUID REFERENCES public.elections(id) ON DELETE CASCADE NOT NULL,
  candidate_id UUID REFERENCES public.election_candidates(id) ON DELETE CASCADE NOT NULL,
  voter_identifier TEXT NOT NULL, -- email or phone hash for anonymous voting
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(election_id, voter_identifier)
);

-- Notifications system
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'general', -- general, comment, event, announcement
  link TEXT, -- optional link to navigate to
  is_read BOOLEAN DEFAULT false,
  recipient_email TEXT, -- null means broadcast to all subscribers
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Newsletter/notification subscribers
CREATE TABLE public.subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  push_token TEXT, -- for browser push notifications
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add threaded comments support - parent_id for replies
ALTER TABLE public.comments ADD COLUMN parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE;
ALTER TABLE public.comments ADD COLUMN thread_closed BOOLEAN DEFAULT false;
ALTER TABLE public.comments ADD COLUMN reply_count INTEGER DEFAULT 0;

-- Enable RLS
ALTER TABLE public.elections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.election_candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.election_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Public read for elections and candidates
CREATE POLICY "Elections are viewable by everyone" ON public.elections FOR SELECT USING (true);
CREATE POLICY "Candidates are viewable by everyone" ON public.election_candidates FOR SELECT USING (true);

-- Anyone can vote (once per election)
CREATE POLICY "Anyone can vote" ON public.election_votes FOR INSERT WITH CHECK (true);
CREATE POLICY "Votes are viewable by everyone" ON public.election_votes FOR SELECT USING (true);

-- Notifications - public can read, only admins can write
CREATE POLICY "Notifications are viewable by everyone" ON public.notifications FOR SELECT USING (true);
CREATE POLICY "Admins can manage notifications" ON public.notifications FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Subscribers - anyone can subscribe
CREATE POLICY "Anyone can subscribe" ON public.subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Subscribers can view their own" ON public.subscribers FOR SELECT USING (true);
CREATE POLICY "Admins can manage subscribers" ON public.subscribers FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Admin policies for elections
CREATE POLICY "Admins can manage elections" ON public.elections FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage candidates" ON public.election_candidates FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_elections_updated_at BEFORE UPDATE ON public.elections 
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_candidates_updated_at BEFORE UPDATE ON public.election_candidates 
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;