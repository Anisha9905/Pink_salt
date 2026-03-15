import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";

const LocationSection = () => {
  return (
    <section id="location" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Find Us
          </span>
          <h2 className="font-heading text-4xl md:text-5xl italic font-bold text-foreground mt-3">
            Visit Us Today
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            className="rounded-3xl overflow-hidden shadow-elevated h-[400px]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2!2d73.85!3d18.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMxJzEyLjAiTiA3M8KwNTEnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pink Salt Cafe Location"
            />
          </motion.div>

          <motion.div
            className="flex flex-col justify-center gap-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/50 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Address</h3>
                <p className="text-muted-foreground">Pink Salt Resto Cafe,Maximus Commercial Complex,
Near City Center Shopping Mall,<br /> Lighthouse, Hampankatta, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/50 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Opening Hours</h3>
                <p className="text-muted-foreground">
                  Mon – Fri: 11:30 AM – 11:00 PM<br />
                  Sat – Sun: 11:30 AM – 11:30 PM
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/50 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Phone</h3>
                <p className="text-muted-foreground">+91 86608 40890</p>
              </div>
            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Open in Google Maps
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
