import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "Ananya S.", rating: 5, text: "The pink ambiance is absolutely dreamy! Best waffles I've ever had. A must-visit cafe!" },
  { name: "Rohan M.", rating: 5, text: "Amazing pizza and the cold coffee is to die for. Love the cozy vibes here." },
  { name: "Priya K.", rating: 4, text: "Such a cute place! The desserts are heavenly and the staff is super friendly." },
  { name: "Vikram J.", rating: 5, text: "Perfect spot for date nights. The pasta and mocktails are outstanding!" },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24 bg-gradient-section">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Testimonials
          </span>
          <h2 className="font-heading text-4xl md:text-5xl italic font-bold text-foreground mt-3 mb-6">
            What Our Guests Say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-gold text-gold" />
            ))}
          </div>
          <p className="text-2xl font-heading font-bold text-foreground">4.8 / 5</p>
          <p className="text-sm text-muted-foreground">Based on 200+ reviews</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              className="glass-card p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed mb-4">"{review.text}"</p>
              <p className="font-medium text-sm text-foreground">{review.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
