import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import catAppetizers from "@/assets/cat-appetizers.jpg";
import catStarters from "@/assets/cat-starters.jpg";
import catPizza from "@/assets/cat-pizza.jpg";
import catBurgers from "@/assets/cat-burgers.jpg";
import catSandwich from "@/assets/cat-sandwich.jpg";
import catPasta from "@/assets/cat-pasta.jpg";
import catRice from "@/assets/cat-rice.jpg";
import catMojito from "@/assets/cat-mojito.jpg";
import catIcetea from "@/assets/cat-icetea.jpg";
import catShakes from "@/assets/cat-shakes.jpg";
import catYogurt from "@/assets/cat-yogurt.jpg";
import catCoffee from "@/assets/cat-coffee.jpg";
import catDesserts from "@/assets/cat-desserts.jpg";
import catWaffles from "@/assets/cat-waffles.jpg";
import catPancakes from "@/assets/cat-pancakes.jpg";

const categories = [
  { name: "Appetizers", image: catAppetizers, slug: "appetizers" },
  { name: "Starters", image: catStarters, slug: "starters" },
  { name: "Pizza", image: catPizza, slug: "pizza" },
  { name: "Burgers", image: catBurgers, slug: "burgers" },
  { name: "Sandwich", image: catSandwich, slug: "sandwich" },
  { name: "Pasta", image: catPasta, slug: "pasta" },
  { name: "Rice / Main Course", image: catRice, slug: "rice" },
  { name: "Mojito", image: catMojito, slug: "mojito" },
  { name: "Ice Tea", image: catIcetea, slug: "icetea" },
  { name: "Thick Shakes", image: catShakes, slug: "shakes" },
  { name: "Yogurt Fusion", image: catYogurt, slug: "yogurt" },
  { name: "Cold Coffee", image: catCoffee, slug: "coffee" },
  { name: "Desserts", image: catDesserts, slug: "desserts" },
  { name: "Waffles", image: catWaffles, slug: "waffles" },
  { name: "Pancakes", image: catPancakes, slug: "pancakes" },
];

const MenuCategories = () => {
  return (
    <section id="categories" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Explore
          </span>
          <h2 className="font-heading text-4xl md:text-5xl italic font-bold text-foreground mt-3">
            Our Menu
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                to={`/menu?category=${cat.slug}`}
                className="group block glass-card overflow-hidden hover:shadow-elevated transition-all duration-500"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 text-center">
                  <span className="text-sm font-medium text-foreground">{cat.name}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuCategories;
