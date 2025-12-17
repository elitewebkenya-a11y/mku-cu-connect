-- Create payments table to track M-Pesa transactions
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  external_reference TEXT NOT NULL UNIQUE,
  phone_number TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_type TEXT DEFAULT 'tithe',
  donor_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Allow public read/insert for payments
CREATE POLICY "Anyone can view payments" ON public.payments FOR SELECT USING (true);
CREATE POLICY "Anyone can create payments" ON public.payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update payments" ON public.payments FOR UPDATE USING (true);

-- Create index for faster lookups
CREATE INDEX idx_payments_reference ON public.payments(external_reference);
CREATE INDEX idx_payments_status ON public.payments(status);