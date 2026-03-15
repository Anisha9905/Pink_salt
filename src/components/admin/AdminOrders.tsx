import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Phone, User, Check, X as XIcon, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

interface OrderItemData {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customer_name: string;
  phone_number: string;
  items: Json;
  total_amount: number;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    const channel = supabase
      .channel("orders-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => fetchOrders())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const filteredOrders = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const parseItems = (items: Json): OrderItemData[] => Array.isArray(items) ? items as unknown as OrderItemData[] : [];

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
          {[
            { label: "Total", count: orders.length, key: "all" },
            { label: "Pending", count: orders.filter((o) => o.status === "pending").length, key: "pending" },
            { label: "Confirmed", count: orders.filter((o) => o.status === "confirmed").length, key: "confirmed" },
            { label: "Completed", count: orders.filter((o) => o.status === "completed").length, key: "completed" },
          ].map((stat) => (
            <button
              key={stat.key}
              onClick={() => setFilter(stat.key)}
              className={`glass-card p-3 text-center transition-all ${filter === stat.key ? "ring-2 ring-foreground/30" : ""}`}
            >
              <p className="text-xl font-heading font-bold text-foreground">{stat.count}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </button>
          ))}
        </div>
        <button onClick={fetchOrders} className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center hover:bg-primary/50">
          <RefreshCw className={`w-5 h-5 text-foreground ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading orders...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No orders found</div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order, i) => {
            const items = parseItems(order.items);
            return (
              <motion.div key={order.id} className="glass-card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{order.customer_name}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a href={`tel:${order.phone_number}`} className="text-sm text-muted-foreground hover:text-foreground">{order.phone_number}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || "bg-muted text-muted-foreground"}`}>{order.status}</span>
                </div>
                <div className="border-t border-border pt-3 mb-3 space-y-1">
                  {items.map((item, j) => (
                    <div key={j} className="flex justify-between text-sm">
                      <span className="text-foreground/80">{item.name} × {item.quantity}</span>
                      <span className="text-foreground">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 flex justify-between font-heading font-bold text-foreground">
                    <span>Total</span>
                    <span>₹{order.total_amount}</span>
                  </div>
                </div>
                {order.status === "pending" && (
                  <div className="flex gap-2">
                    <button onClick={() => updateStatus(order.id, "confirmed")} className="flex-1 py-2 rounded-full bg-blue-500 text-[#fff] text-xs font-medium flex items-center justify-center gap-1 hover:bg-blue-600 transition-colors">
                      <Check className="w-3.5 h-3.5" /> Confirm
                    </button>
                    <button onClick={() => updateStatus(order.id, "cancelled")} className="px-4 py-2 rounded-full bg-red-100 text-red-700 text-xs font-medium flex items-center justify-center gap-1 hover:bg-red-200 transition-colors">
                      <XIcon className="w-3.5 h-3.5" /> Cancel
                    </button>
                  </div>
                )}
                {order.status === "confirmed" && (
                  <button onClick={() => updateStatus(order.id, "completed")} className="w-full py-2 rounded-full bg-green-500 text-[#fff] text-xs font-medium flex items-center justify-center gap-1 hover:bg-green-600 transition-colors">
                    <Check className="w-3.5 h-3.5" /> Mark Completed
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
