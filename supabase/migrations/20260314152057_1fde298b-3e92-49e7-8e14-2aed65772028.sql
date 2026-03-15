-- Create orders table (no auth required - public ordering)
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  total_amount NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert orders (public ordering, no login required)
CREATE POLICY "Anyone can place orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read orders (for admin dashboard)
CREATE POLICY "Anyone can view orders"
  ON public.orders
  FOR SELECT
  USING (true);

-- Allow updating order status
CREATE POLICY "Anyone can update orders"
  ON public.orders
  FOR UPDATE
  USING (true);