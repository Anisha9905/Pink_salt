import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/918660840890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-elevated hover:scale-110 active:scale-95 transition-transform"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5, type: "spring" }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-[#fff]" />
    </motion.a>
  );
};

export default WhatsAppButton;
