import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Offer {
  id: string;
  title: string;
  description: string;
  emoji: string;
  is_active: boolean;
}

const OffersSection = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const { data } = await supabase.from("offers").select("*").eq("is_active", true).order("created_at", { ascending: false });
      if (data) setOffers(data as Offer[]);
    };
    fetchOffers();

    const channel = supabase
      .channel("offers-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "offers" }, () => fetchOffers())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  if (offers.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 space-y-6">
        {offers.map((offer, i) => (
          <motion.div
            key={offer.id}
            className="max-w-4xl mx-auto glass-card p-8 md:p-12 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20" />
            <div className="relative z-10">
              <span className="text-4xl mb-4 block">{offer.emoji}</span>
              <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Special Offer
              </span>
              <h3 className="font-heading text-3xl md:text-4xl italic font-bold text-foreground mt-3 mb-4">
                {offer.title}
              </h3>
              <p className="text-foreground/80 text-sm md:text-base">
                {offer.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OffersSection;
