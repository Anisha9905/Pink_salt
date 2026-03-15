import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Offer {
  id: string;
  title: string;
  description: string;
  emoji: string;
  is_active: boolean;
}

const AdminOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("🎉");

  const fetchOffers = async () => {
    const { data } = await supabase.from("offers").select("*").order("created_at", { ascending: false });
    if (data) setOffers(data as Offer[]);
    setLoading(false);
  };

  useEffect(() => { fetchOffers(); }, []);

  const addOffer = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in title and description");
      return;
    }
    const { error } = await supabase.from("offers").insert({ title: title.trim(), description: description.trim(), emoji });
    if (error) { toast.error("Failed to add offer"); return; }
    toast.success("Offer added!");
    setTitle(""); setDescription(""); setEmoji("🎉"); setShowForm(false);
    fetchOffers();
  };

  const toggleOffer = async (id: string, isActive: boolean) => {
    await supabase.from("offers").update({ is_active: !isActive }).eq("id", id);
    fetchOffers();
  };

  const deleteOffer = async (id: string) => {
    await supabase.from("offers").delete().eq("id", id);
    toast.success("Offer deleted");
    fetchOffers();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-xl font-bold text-foreground">Manage Offers</h2>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 rounded-full bg-foreground text-background text-xs font-medium flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" /> Add Offer
        </button>
      </div>

      {showForm && (
        <div className="glass-card p-5 mb-4 space-y-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Offer title" className="w-full px-4 py-3 rounded-2xl bg-primary/20 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Offer description" rows={2} className="w-full px-4 py-3 rounded-2xl bg-primary/20 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
          <div className="flex gap-2">
            {["🎉", "🍕", "☕", "🧁", "🔥", "💕"].map((e) => (
              <button key={e} onClick={() => setEmoji(e)} className={`w-10 h-10 rounded-full text-lg flex items-center justify-center ${emoji === e ? "bg-foreground/20 ring-2 ring-foreground/30" : "bg-primary/20"}`}>{e}</button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} className="flex-1 py-2 rounded-full border-2 border-foreground/20 text-foreground text-xs font-medium">Cancel</button>
            <button onClick={addOffer} className="flex-1 py-2 rounded-full bg-foreground text-background text-xs font-medium">Save Offer</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : offers.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No offers yet</div>
      ) : (
        <div className="space-y-3">
          {offers.map((offer) => (
            <div key={offer.id} className="glass-card p-4 flex items-center gap-4">
              <span className="text-2xl">{offer.emoji}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground text-sm">{offer.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{offer.description}</p>
              </div>
              <button onClick={() => toggleOffer(offer.id, offer.is_active)} className={`px-3 py-1 rounded-full text-xs font-medium ${offer.is_active ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                {offer.is_active ? "Active" : "Hidden"}
              </button>
              <button onClick={() => deleteOffer(offer.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOffers;
