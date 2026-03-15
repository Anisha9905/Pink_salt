import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, User, Phone, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { categoryLabels } from "@/data/menuData";
import { useMenuItems } from "@/hooks/useMenuItems";
import { toast } from "sonner";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  category: string;
}

const categories = Object.keys(categoryLabels);

const OrderModal = ({ isOpen, onClose }: OrderModalProps) => {
  const [step, setStep] = useState<"menu" | "details" | "success">("menu");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("pizza");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { items: menuItems, loading: menuLoading } = useMenuItems();

  const filteredItems = useMemo(
    () => menuItems.filter((item) => item.category === activeCategory),
    [activeCategory, menuItems]
  );

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const addToCart = (item: { name: string; price: number; category: string }) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) return prev.map((i) => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (name: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === name);
      if (existing && existing.quantity > 1) return prev.map((i) => i.name === name ? { ...i, quantity: i.quantity - 1 } : i);
      return prev.filter((i) => i.name !== name);
    });
  };

  const getQuantity = (name: string) => cart.find((i) => i.name === name)?.quantity || 0;

  const handleSubmitOrder = async () => {
    if (!customerName.trim() || !phoneNumber.trim()) { toast.error("Please fill in your name and phone number"); return; }
    if (phoneNumber.trim().length < 10) { toast.error("Please enter a valid phone number"); return; }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("orders").insert({
        customer_name: customerName.trim(),
        phone_number: phoneNumber.trim(),
        items: cart.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })),
        total_amount: total,
        status: "pending",
      });
      if (error) throw error;
      setStep("success");
    } catch { toast.error("Failed to place order. Please try again."); }
    finally { setSubmitting(false); }
  };

  const handleClose = () => {
    setStep("menu"); setCart([]); setCustomerName(""); setPhoneNumber(""); onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={handleClose} />
          <motion.div className="relative w-full max-w-lg max-h-[90vh] bg-background rounded-t-3xl sm:rounded-3xl shadow-elevated overflow-hidden flex flex-col" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}>
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-heading text-xl font-bold text-foreground">
                {step === "menu" && "Place Your Order"}
                {step === "details" && "Your Details"}
                {step === "success" && "Order Confirmed!"}
              </h2>
              <button onClick={handleClose} className="p-1 text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>

            {step === "menu" && (
              <>
                <div className="flex gap-2 overflow-x-auto px-5 py-3 border-b border-border">
                  {categories.map((cat) => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeCategory === cat ? "bg-foreground text-background" : "bg-primary/30 text-foreground hover:bg-primary/50"}`}>
                      {categoryLabels[cat]}
                    </button>
                  ))}
                </div>
                <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2 min-h-0" style={{ maxHeight: "40vh" }}>
                  {menuLoading ? (
                    <div className="text-center py-8 text-muted-foreground text-sm">Loading menu...</div>
                  ) : filteredItems.map((item) => {
                    const qty = getQuantity(item.name);
                    return (
                      <div key={item.id} className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">₹{item.price}</p>
                        </div>
                        {qty === 0 ? (
                          <button onClick={() => addToCart(item)} className="px-3 py-1 rounded-full bg-primary/40 text-foreground text-xs font-medium hover:bg-primary/60 transition-colors">Add</button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button onClick={() => removeFromCart(item.name)} className="w-7 h-7 rounded-full bg-primary/40 flex items-center justify-center hover:bg-primary/60 transition-colors"><Minus className="w-3.5 h-3.5 text-foreground" /></button>
                            <span className="text-sm font-medium text-foreground w-4 text-center">{qty}</span>
                            <button onClick={() => addToCart(item)} className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center hover:bg-foreground/80 transition-colors"><Plus className="w-3.5 h-3.5 text-background" /></button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {cart.length > 0 && (
                  <div className="p-5 border-t border-border">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">{cart.reduce((s, i) => s + i.quantity, 0)} items</span>
                      <span className="font-heading text-lg font-bold text-foreground">₹{total}</span>
                    </div>
                    <button onClick={() => setStep("details")} className="w-full py-3 rounded-full bg-foreground text-background font-medium text-sm hover:scale-[1.01] active:scale-[0.99] transition-transform">Proceed to Confirm</button>
                  </div>
                )}
              </>
            )}

            {step === "details" && (
              <div className="p-5 space-y-4 flex-1 overflow-y-auto">
                <div className="glass-card p-4 space-y-2">
                  <h3 className="font-heading text-sm font-semibold text-foreground mb-2">Order Summary</h3>
                  {cart.map((item) => (
                    <div key={item.name} className="flex justify-between text-sm">
                      <span className="text-foreground/80">{item.name} × {item.quantity}</span>
                      <span className="text-foreground font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="font-heading font-bold text-foreground">Total</span>
                    <span className="font-heading font-bold text-foreground">₹{total}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="text" placeholder="Your Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-2xl bg-primary/20 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-2xl bg-primary/20 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep("menu")} className="flex-1 py-3 rounded-full border-2 border-foreground/20 text-foreground font-medium text-sm hover:border-foreground/40 transition-colors">Back</button>
                  <button onClick={handleSubmitOrder} disabled={submitting} className="flex-1 py-3 rounded-full bg-foreground text-background font-medium text-sm hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-50">{submitting ? "Placing..." : "Confirm Order"}</button>
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center"><Check className="w-8 h-8 text-green-600" /></div>
                <h3 className="font-heading text-2xl font-bold text-foreground">Thank You!</h3>
                <p className="text-muted-foreground text-sm">Your order has been placed successfully. We'll prepare it with love! 💕</p>
                <p className="text-sm text-foreground font-medium">Total: ₹{total}</p>
                <button onClick={handleClose} className="px-8 py-3 rounded-full bg-foreground text-background font-medium text-sm mt-2">Done</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;
