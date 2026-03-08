
CREATE TABLE public.hero_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  verse text,
  verse_ref text,
  image_url text NOT NULL DEFAULT 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1920&q=80',
  cta1_text text,
  cta1_link text,
  cta2_text text,
  cta2_link text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hero slides viewable by everyone" ON public.hero_slides FOR SELECT USING (true);
CREATE POLICY "Hero slides full management" ON public.hero_slides FOR ALL USING (true) WITH CHECK (true);

-- Insert the existing slides as seed data
INSERT INTO public.hero_slides (title, subtitle, verse, verse_ref, image_url, cta1_text, cta1_link, cta2_text, cta2_link, display_order) VALUES
('Welcome to MKU Christian Union', 'Living the Knowledge of God', '"Now this is eternal life: that they know you, the only true God, and Jesus Christ, whom you have sent."', '— John 17:2-3', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1920&q=80', 'Join MKU CU Today', 'https://wa.me/254115475543?text=Hello%2C%20I%20would%20like%20to%20join%20MKU%20CU', 'Attend This Sunday', '/events', 1),
('Join Us for Sunday Worship', 'Every Sunday | 9:30 AM - 12:00 PM', '"For where two or three gather in my name, there am I with them."', '— Matthew 18:20', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80', 'View Events', '/events', 'Watch Online', 'https://www.youtube.com/@mkucu', 2),
('Never Miss a Message', 'Watch Weekly Sermons & Teachings', '"Faith comes from hearing the message, and the message is heard through the word about Christ."', '— Romans 10:17', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80', 'Watch Live Now', 'https://www.youtube.com/@mkucu', 'Visit YouTube Channel', 'https://www.youtube.com/@mkucu', 3),
('Missions & Evangelism 2026', '"Go into all the world and preach the gospel"', '"Therefore go and make disciples of all nations."', '— Matthew 28:19', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80', 'Learn More', '/events', 'Support Mission', 'https://wa.me/254115475543?text=I%20want%20to%20support%20missions', 4),
('Become Part of Our Family', 'Find Your Place in God''s Family', '"They devoted themselves to the apostles'' teaching and to fellowship, to the breaking of bread and to prayer."', '— Acts 2:42', 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1920&q=80', 'Join WhatsApp Community', 'https://wa.me/254115475543?text=Hi%2C%20I%20want%20to%20join', 'Register as Member', '/signup', 5);
