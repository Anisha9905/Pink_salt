import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminOffers from "@/components/admin/AdminOffers";
import AdminMenu from "@/components/admin/AdminMenu";

const tabs = [
  { key: "orders", label: "Orders" },
  { key: "offers", label: "Offers" },
  { key: "menu", label: "Menu" },
  
];

const AdminPage = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setAuthenticated(true);
      }
    };
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isRegistering) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          setError(error.message);
        } else {
          setError("Registration successful! Please check your email to confirm your account.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(error.message);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setEmail("");
    setPassword("");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          className="glass-card p-8 w-full max-w-sm text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-14 h-14 rounded-full bg-primary/30 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-foreground" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Admin Access</h1>
          <p className="text-sm text-muted-foreground mb-4">
            {isRegistering ? "Create your admin account" : "Enter your credentials to continue"}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-2xl bg-primary/20 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring text-center"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-2xl bg-primary/20 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring text-center"
              required
            />
            {error && <p className="text-destructive text-xs">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-foreground text-background font-medium text-sm disabled:opacity-50"
            >
              {loading ? (isRegistering ? "Creating account..." : "Signing in...") : (isRegistering ? "Create Account" : "Sign In")}
            </button>
          </form>
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-xs text-muted-foreground hover:text-foreground mt-4"
          >
            {isRegistering ? "Already have an account? Sign in" : "Need to create an account? Register"}
          </button>
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground mt-4 inline-block">
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/"
            className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center hover:bg-primary/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <div className="flex-1">
            <h1 className="font-heading text-3xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? "bg-foreground text-background"
                  : "bg-primary/30 text-foreground hover:bg-primary/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "orders" && <AdminOrders />}
        {activeTab === "offers" && <AdminOffers />}
        {activeTab === "menu" && <AdminMenu />}
        
      </div>
    </div>
  );
};

export default AdminPage;
