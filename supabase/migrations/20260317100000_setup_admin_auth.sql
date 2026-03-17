-- Update RLS policies to require authentication for admin operations
-- This ensures only authenticated admin users can modify data

-- Orders table - keep public read/insert, but restrict updates to authenticated users
DROP POLICY IF EXISTS "Anyone can update orders" ON public.orders;
CREATE POLICY "Authenticated users can update orders"
  ON public.orders
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Offers table - restrict modifications to authenticated users
DROP POLICY IF EXISTS "Anyone can insert offers" ON public.offers;
DROP POLICY IF EXISTS "Anyone can update offers" ON public.offers;
DROP POLICY IF EXISTS "Anyone can delete offers" ON public.offers;

CREATE POLICY "Authenticated users can insert offers"
  ON public.offers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update offers"
  ON public.offers
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete offers"
  ON public.offers
  FOR DELETE
  TO authenticated
  USING (true);

-- Menu items table - restrict modifications to authenticated users
DROP POLICY IF EXISTS "Anyone can insert menu items" ON public.menu_items;
DROP POLICY IF EXISTS "Anyone can update menu items" ON public.menu_items;
DROP POLICY IF EXISTS "Anyone can delete menu items" ON public.menu_items;

CREATE POLICY "Authenticated users can insert menu items"
  ON public.menu_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update menu items"
  ON public.menu_items
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete menu items"
  ON public.menu_items
  FOR DELETE
  TO authenticated
  USING (true);

-- Memories table - restrict modifications to authenticated users
DROP POLICY IF EXISTS "Anyone can insert memories" ON public.memories;
DROP POLICY IF EXISTS "Anyone can update memories" ON public.memories;
DROP POLICY IF EXISTS "Anyone can delete memories" ON public.memories;

CREATE POLICY "Authenticated users can insert memories"
  ON public.memories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update memories"
  ON public.memories
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete memories"
  ON public.memories
  FOR DELETE
  TO authenticated
  USING (true);