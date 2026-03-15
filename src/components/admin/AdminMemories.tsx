import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Memory {
  id: string;
  customer_name: string;
  image_url: string;
  caption: string | null;
  rating: number | null;
  is_approved: boolean;
}

const AdminMemories = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMemories = async () => {
    const { data } = await supabase.from("memories").select("*").order("created_at", { ascending: false });
    if (data) setMemories(data as Memory[]);
    setLoading(false);
  };

  useEffect(() => { fetchMemories(); }, []);

  const toggleApproval = async (id: string, approved: boolean) => {
    await supabase.from("memories").update({ is_approved: !approved }).eq("id", id);
    fetchMemories();
  };

  const deleteMemory = async (id: string) => {
    await supabase.from("memories").delete().eq("id", id);
    toast.success("Memory removed");
    fetchMemories();
  };

  return (
    <div>
      <h2 className="font-heading text-xl font-bold text-foreground mb-4">Manage Memories</h2>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : memories.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No memories yet</div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {memories.map((m) => (
            <div key={m.id} className={`glass-card p-4 ${!m.is_approved ? "opacity-50" : ""}`}>
              <img src={m.image_url} alt={m.caption || "Memory"} className="w-full h-40 object-cover rounded-2xl mb-3" />
              <p className="text-sm font-medium text-foreground">{m.customer_name}</p>
              {m.caption && <p className="text-xs text-muted-foreground mt-1">{m.caption}</p>}
              <div className="flex items-center gap-2 mt-3">
                <button onClick={() => toggleApproval(m.id, m.is_approved)} className={`flex-1 py-1.5 rounded-full text-xs font-medium ${m.is_approved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                  {m.is_approved ? "Approved" : "Hidden"}
                </button>
                <button onClick={() => deleteMemory(m.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMemories;
