
CREATE TABLE public.guests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit guest form" ON public.guests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view guests" ON public.guests FOR SELECT USING (true);
CREATE POLICY "Admins can delete guests" ON public.guests FOR DELETE USING (true);
