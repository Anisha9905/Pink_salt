import { motion } from "framer-motion";
import aboutImg from "@/assets/about-cafe.png";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={aboutImg}
                alt="Pink Salt Cafe Interior"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-soft">
              <span className="font-heading text-lg italic text-foreground">Est.<br/>2024</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">Our Story</span>
            <h2 className="font-heading text-4xl md:text-5xl italic font-bold text-foreground mt-3 mb-6">
              Where Every Bite<br />Tells a Story
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              Pink Salt Resto Cafe is a cozy Italian-inspired cafe serving delicious pizzas, waffles,
              desserts, coffees and handcrafted drinks in a warm pink aesthetic environment.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every corner of our cafe is designed to make you feel at home. From the aroma of freshly
              brewed espresso to the delicate sweetness of our handmade desserts — we craft experiences,
              not just meals.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
