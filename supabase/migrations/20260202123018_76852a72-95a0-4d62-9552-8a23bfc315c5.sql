-- Create comprehensive daily schedule table
CREATE TABLE public.daily_schedule (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  day_of_week TEXT NOT NULL CHECK (day_of_week IN ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')),
  theme TEXT,
  activity_name TEXT NOT NULL,
  activity_type TEXT NOT NULL DEFAULT 'regular',
  start_time TEXT NOT NULL,
  end_time TEXT,
  venue TEXT NOT NULL,
  description TEXT,
  facilitator TEXT,
  is_recurring BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create home fellowships table for residential area groups
CREATE TABLE public.home_fellowships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  area TEXT NOT NULL,
  meeting_day TEXT NOT NULL,
  meeting_time TEXT NOT NULL,
  venue TEXT,
  leader_name TEXT,
  contact_link TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create special events recurring (Keshas, retreats, missions) table
CREATE TABLE public.special_programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  program_type TEXT NOT NULL DEFAULT 'kesha',
  description TEXT,
  venue TEXT,
  start_date DATE,
  end_date DATE,
  registration_fee NUMERIC,
  registration_link TEXT,
  contact_person TEXT,
  contact_phone TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create FAQs table
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.daily_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_fellowships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.special_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Create policies for daily_schedule
CREATE POLICY "Anyone can view daily schedule" 
ON public.daily_schedule FOR SELECT USING (true);

CREATE POLICY "Admins can manage daily schedule" 
ON public.daily_schedule FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create policies for home_fellowships
CREATE POLICY "Anyone can view home fellowships" 
ON public.home_fellowships FOR SELECT USING (true);

CREATE POLICY "Admins can manage home fellowships" 
ON public.home_fellowships FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create policies for special_programs
CREATE POLICY "Anyone can view special programs" 
ON public.special_programs FOR SELECT USING (true);

CREATE POLICY "Admins can manage special programs" 
ON public.special_programs FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create policies for faqs
CREATE POLICY "Anyone can view faqs" 
ON public.faqs FOR SELECT USING (true);

CREATE POLICY "Admins can manage faqs" 
ON public.faqs FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create indexes for better performance
CREATE INDEX idx_daily_schedule_day ON public.daily_schedule(day_of_week);
CREATE INDEX idx_daily_schedule_active ON public.daily_schedule(is_active);
CREATE INDEX idx_home_fellowships_active ON public.home_fellowships(is_active);
CREATE INDEX idx_special_programs_active ON public.special_programs(is_active);
CREATE INDEX idx_faqs_active ON public.faqs(is_active);

-- Create trigger for updated_at
CREATE TRIGGER update_daily_schedule_updated_at
  BEFORE UPDATE ON public.daily_schedule
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_home_fellowships_updated_at
  BEFORE UPDATE ON public.home_fellowships
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_special_programs_updated_at
  BEFORE UPDATE ON public.special_programs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_faqs_updated_at
  BEFORE UPDATE ON public.faqs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();