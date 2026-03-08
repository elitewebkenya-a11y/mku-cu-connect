-- Site settings table for all editable static content
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings viewable by everyone" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "Site settings full management" ON public.site_settings
  FOR ALL USING (true) WITH CHECK (true);

INSERT INTO public.site_settings (key, value) VALUES
('stats', '[{"icon":"Users","value":500,"suffix":"+","label":"Active Members"},{"icon":"Award","value":46,"suffix":"","label":"Years Active"},{"icon":"School","value":20,"suffix":"+","label":"Schools Reached"},{"icon":"Sparkles","value":1000,"suffix":"+","label":"Salvations"}]'::jsonb),
('vision', '{"title":"Our Vision","description":"Living as True Disciples of Jesus Christ, transforming our campus and communities through authentic faith, sacrificial love, and unwavering commitment to the Gospel."}'::jsonb),
('mission', '{"title":"Our Mission","description":"Nurturing belief in Christ and developing Christ-like character through discipleship, evangelism, and missions - equipping students for lifelong kingdom impact."}'::jsonb),
('core_values', '[{"icon":"BookOpen","title":"Discipleship","description":"Growing deep in Gods Word"},{"icon":"Users","title":"Evangelism","description":"Sharing Christ with boldness"},{"icon":"Globe","title":"Mission","description":"Reaching beyond our campus"},{"icon":"Heart","title":"Fellowship","description":"Building authentic community"},{"icon":"Shield","title":"Integrity","description":"Living with godly character"},{"icon":"Target","title":"Leadership","description":"Developing servant leaders"}]'::jsonb),
('social_links', '[{"platform":"Facebook","link":"https://facebook.com/MKUCUTHIKA","handle":"MKU CU THIKA"},{"platform":"Twitter","link":"https://twitter.com/MkuciThika","handle":"@MkuciThika"},{"platform":"YouTube","link":"https://youtube.com/@MKUCUThikaTv","handle":"MKU CU Thika Tv"}]'::jsonb),
('contact_info', '{"whatsapp":"https://wa.me/254711201138","phone":"0711201138","email":"mkucuthika@gmail.com","location":"MKU Main Campus, Thika","map_link":"https://maps.app.goo.gl/Ci8S9Nhb25FSCrgX8"}'::jsonb),
('giving_info', '{"till_number":"6960137","till_name":"BRIAN MUTUKU NDETO","scripture":"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.","scripture_ref":"2 Corinthians 9:7"}'::jsonb),
('daily_verses', '[{"verse":"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.","reference":"John 3:16","encouragement":"Gods love for you is unfailing. Embrace it today."},{"verse":"Trust in the LORD with all your heart and lean not on your own understanding.","reference":"Proverbs 3:5-6","encouragement":"Let go and let God guide your path today."},{"verse":"I can do all things through Christ who strengthens me.","reference":"Philippians 4:13","encouragement":"You have divine strength within you. Step forward boldly."},{"verse":"The LORD is my shepherd, I lack nothing.","reference":"Psalm 23:1","encouragement":"Rest in Gods provision. He cares for every detail."},{"verse":"And we know that in all things God works for the good of those who love him.","reference":"Romans 8:28","encouragement":"Even in challenges, God is working for your good."},{"verse":"Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.","reference":"Joshua 1:9","encouragement":"Face today with courage. God is right there with you."},{"verse":"But those who hope in the LORD will renew their strength. They will soar on wings like eagles.","reference":"Isaiah 40:31","encouragement":"Your strength is renewed in Him. Rise above today."}]'::jsonb),
('quick_actions', '[{"icon":"Users","title":"Join Us","description":"Become a member","color":"bg-crimson","link":"/contact"},{"icon":"Calendar","title":"Events","description":"View calendar","color":"bg-navy","link":"/events"},{"icon":"BookOpen","title":"Bible Study","description":"Study groups","color":"bg-gold","link":"/about"},{"icon":"Heart","title":"Serve","description":"Volunteer today","color":"bg-crimson","link":"/contact"},{"icon":"MessageCircle","title":"Prayer","description":"Request prayer","color":"bg-navy","link":"/contact"},{"icon":"MapPin","title":"Visit","description":"Find us","color":"bg-gold","link":"/contact"}]'::jsonb),
('youtube_channel', '{"channel_id":"","channel_url":"https://youtube.com/@MKUCUThikaTv","auto_sync":false}'::jsonb);

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();