
-- Offers table for admin-managed offers
CREATE TABLE public.offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  emoji text DEFAULT '🎉',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active offers" ON public.offers
  FOR SELECT TO public USING (true);

CREATE POLICY "Anyone can insert offers" ON public.offers
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Anyone can update offers" ON public.offers
  FOR UPDATE TO public USING (true);

CREATE POLICY "Anyone can delete offers" ON public.offers
  FOR DELETE TO public USING (true);

-- Menu items table for admin-managed menu
CREATE TABLE public.menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL,
  category text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view menu items" ON public.menu_items
  FOR SELECT TO public USING (true);

CREATE POLICY "Anyone can insert menu items" ON public.menu_items
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Anyone can update menu items" ON public.menu_items
  FOR UPDATE TO public USING (true);

CREATE POLICY "Anyone can delete menu items" ON public.menu_items
  FOR DELETE TO public USING (true);

-- Memories table for customer memories (admin can manage)
CREATE TABLE public.memories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  image_url text NOT NULL,
  caption text,
  rating integer DEFAULT 5,
  is_approved boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved memories" ON public.memories
  FOR SELECT TO public USING (true);

CREATE POLICY "Anyone can insert memories" ON public.memories
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Anyone can update memories" ON public.memories
  FOR UPDATE TO public USING (true);

CREATE POLICY "Anyone can delete memories" ON public.memories
  FOR DELETE TO public USING (true);

-- Enable realtime for offers
ALTER PUBLICATION supabase_realtime ADD TABLE public.offers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.menu_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.memories;
