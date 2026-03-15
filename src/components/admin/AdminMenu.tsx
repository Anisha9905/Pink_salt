import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { categoryLabels } from "@/data/menuData";
import { toast } from "sonner";

interface DbMenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  is_active: boolean;
}

const categories = Object.keys(categoryLabels);

const AdminMenu = () => {
  const [items, setItems] = useState<DbMenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("pizza");
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("pizza");

  const fetchItems = async () => {
    const { data } = await supabase.from("menu_items").select("*").order("created_at", { ascending: true });
    if (data) setItems(data as DbMenuItem[]);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const addItem = async () => {
    if (!newName.trim() || !newPrice) { toast.error("Fill in name and price"); return; }
    const { error } = await supabase.from("menu_items").insert({ name: newName.trim(), price: parseFloat(newPrice), category: newCategory });
    if (error) { toast.error("Failed to add item"); return; }
    toast.success("Item added!");
    setNewName(""); setNewPrice(""); setShowForm(false);
    fetchItems();
  };

  const deleteItem = async (id: string) => {
    await supabase.from("menu_items").delete().eq("id", id);
    toast.success("Item deleted");
    fetchItems();
  };

  const toggleItem = async (id: string, isActive: boolean) => {
    await supabase.from("menu_items").update({ is_active: !isActive }).eq("id", id);
    fetchItems();
  };

  const filtered = items.filter((i) => i.category === activeCategory);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-xl font-bold text-foreground">Manage Menu</h2>
        <button onClick={() => { setShowForm(!showForm); setNewCategory(activeCategory); }} className="px-4 py-2 rounded-full bg-foreground text-background text-xs font-medium flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" /> Add Item
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeCategory === cat ? "bg-foreground text-background" : "bg-primary/30 text-foreground hover:bg-primary/50"}`}>
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="glass-card p-5 mb-4 space-y-3">
          <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Item name" className="w-full px-4 py-3 rounded-2xl bg-primary/20 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} type="number" placeholder="Price (₹)" className="w-full px-4 py-3 rounded-2xl bg-primary/20 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-primary/20 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            {categories.map((cat) => <option key={cat} value={cat}>{categoryLabels[cat]}</option>)}
          </select>
          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} className="flex-1 py-2 rounded-full border-2 border-foreground/20 text-foreground text-xs font-medium">Cancel</button>
            <button onClick={addItem} className="flex-1 py-2 rounded-full bg-foreground text-background text-xs font-medium">Add Item</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No items in this category</div>
      ) : (
        <div className="space-y-2">
          {filtered.map((item) => (
            <div key={item.id} className={`glass-card p-4 flex items-center gap-4 ${!item.is_active ? "opacity-50" : ""}`}>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground text-sm">{item.name}</h3>
                <p className="text-xs text-muted-foreground">₹{item.price}</p>
              </div>
              <button onClick={() => toggleItem(item.id, item.is_active)} className={`px-3 py-1 rounded-full text-xs font-medium ${item.is_active ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                {item.is_active ? "Active" : "Hidden"}
              </button>
              <button onClick={() => deleteItem(item.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
