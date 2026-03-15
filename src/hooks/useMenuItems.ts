import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { categoryLabels } from "@/data/menuData";

export interface DbMenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  is_active: boolean;
}

export const useMenuItems = () => {
  const [items, setItems] = useState<DbMenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("menu_items")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: true });
      if (data) setItems(data as DbMenuItem[]);
      setLoading(false);
    };
    fetch();
  }, []);

  return { items, loading };
};
