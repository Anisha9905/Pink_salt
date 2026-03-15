import { Instagram, MessageCircle, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary/40 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl italic font-bold text-foreground mb-4">Pink Salt</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Italian Flavours · Sweet Memories · Cozy Vibes
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Menu", "Reviews", "Location"].map((link) => (
                <li key={link}>
                  <a
                    href={link === "Menu" ? "/menu" : `/#${link.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>+91 98765 43210</li>
              <li>hello@pinksaltcafe.com</li>
              <li>Main Street, City Center</li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-foreground mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/pinksaltrestocafe/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-foreground" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-foreground" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-foreground/10 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
             Powered by{" "}
            <span className="font-medium text-foreground">Devora Technologies</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
