import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-cafe.jpg";
import OrderModal from "@/components/OrderModal";

const floatingItems = [
  { emoji: "☕", top: "20%", left: "8%", delay: 0 },
  { emoji: "🧁", top: "30%", right: "10%", delay: 1 },
  { emoji: "🧇", bottom: "25%", left: "12%", delay: 2 },
  { emoji: "🍰", bottom: "20%", right: "8%", delay: 0.5 },
  { emoji: "🍕", top: "15%", right: "25%", delay: 1.5 },
];

const HeroSection = () => {
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Pink Salt Resto Cafe interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Floating elements */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl md:text-5xl select-none pointer-events-none opacity-60"
          style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold italic text-foreground mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Pink Salt
          <span className="block text-3xl md:text-4xl lg:text-5xl font-normal mt-2">
            Resto Cafe
          </span>
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-muted-foreground font-body tracking-widest uppercase mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Serving delicious moments in Mangalore🍽️
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button
            onClick={() => setOrderOpen(true)}
            className="px-8 py-3.5 rounded-full bg-foreground text-background font-medium text-sm tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-transform shimmer"
          >
            Order Now
          </button>
          <Link
            to="/menu"
            className="px-8 py-3.5 rounded-full border-2 border-foreground/20 text-foreground font-medium text-sm tracking-wide hover:border-foreground/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            View Menu
          </Link>
          <a
            href="#location"
            className="px-8 py-3.5 rounded-full border-2 border-foreground/20 text-foreground font-medium text-sm tracking-wide hover:border-foreground/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Visit Us
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-foreground/40" />
      </motion.div>

      <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />
    </section>
  );
};

export default HeroSection;
