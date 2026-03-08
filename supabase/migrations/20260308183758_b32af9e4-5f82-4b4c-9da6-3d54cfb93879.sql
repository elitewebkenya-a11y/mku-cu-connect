-- Create admin_departments table for department-based access
CREATE TABLE IF NOT EXISTS public.admin_departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  department text NOT NULL,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (user_id, department)
);

ALTER TABLE public.admin_departments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view admin departments" ON public.admin_departments
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage departments" ON public.admin_departments
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can request department access" ON public.admin_departments
  FOR INSERT WITH CHECK (auth.uid() = user_id);