import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { categoryLabels } from "@/data/menuData";
import { useMenuItems } from "@/hooks/useMenuItems";

const allCategories = [
  { slug: "all", label: "All" },
  ...Object.entries(categoryLabels).map(([slug, label]) => ({ slug, label })),
];

const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const { items: menuItems, loading } = useMenuItems();

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, menuItems]);

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug);
    if (slug === "all") setSearchParams({});
    else setSearchParams({ category: slug });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/" className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center hover:bg-primary/50 transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <div>
              <h1 className="font-heading text-4xl md:text-5xl italic font-bold text-foreground">Our Menu</h1>
              <p className="text-muted-foreground text-sm mt-1">Fresh flavours, crafted with love</p>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {allCategories.map((cat) => (
              <button key={cat.slug} onClick={() => handleCategoryClick(cat.slug)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat.slug ? "bg-foreground text-background" : "bg-primary/30 text-foreground hover:bg-primary/50"}`}>
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading menu...</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
              {filteredItems.map((item, i) => (
                <motion.div key={item.id} className="glass-card p-5 flex items-center justify-between gap-4 hover:shadow-elevated transition-all duration-300" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">{item.name}</h3>
                    <span className="text-xs text-muted-foreground capitalize">{item.category}</span>
                  </div>
                  <span className="font-heading text-lg font-semibold text-foreground whitespace-nowrap">₹{item.price}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default MenuPage;
