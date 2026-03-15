export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export interface MenuItem {
  name: string;
  price: number;
  category: string;
}

export const menuData: MenuItem[] = [
  // Appetizers
  { name: "Bruschetta Classic", price: 180, category: "appetizers" },
  { name: "Garlic Bread", price: 150, category: "appetizers" },
  { name: "Tomato Soup", price: 140, category: "appetizers" },
  { name: "Cream of Mushroom", price: 160, category: "appetizers" },
  // Starters
  { name: "Paneer Tikka", price: 220, category: "starters" },
  { name: "Chicken Wings", price: 280, category: "starters" },
  { name: "Spring Rolls", price: 180, category: "starters" },
  { name: "Fish Fingers", price: 260, category: "starters" },
  // Pizza
  { name: "Margherita Pizza", price: 260, category: "pizza" },
  { name: "Farmers Pizza", price: 310, category: "pizza" },
  { name: "Chicken Barbecue Pizza", price: 300, category: "pizza" },
  { name: "Pepperoni Pizza", price: 320, category: "pizza" },
  { name: "Mexican Wave Pizza", price: 290, category: "pizza" },
  // Burgers
  { name: "Classic Veg Burger", price: 180, category: "burgers" },
  { name: "Chicken Zinger Burger", price: 220, category: "burgers" },
  { name: "Double Cheese Burger", price: 250, category: "burgers" },
  // Sandwich
  { name: "Club Sandwich", price: 200, category: "sandwich" },
  { name: "Grilled Chicken Sandwich", price: 220, category: "sandwich" },
  { name: "Paneer Tikka Sandwich", price: 190, category: "sandwich" },
  // Pasta
  { name: "Penne Alfredo", price: 240, category: "pasta" },
  { name: "Spaghetti Bolognese", price: 260, category: "pasta" },
  { name: "Mac & Cheese", price: 220, category: "pasta" },
  { name: "Pink Sauce Pasta", price: 230, category: "pasta" },
  // Rice
  { name: "Veg Fried Rice", price: 200, category: "rice" },
  { name: "Chicken Biryani", price: 280, category: "rice" },
  { name: "Paneer Butter Masala + Rice", price: 260, category: "rice" },
  // Mojito
  { name: "Virgin Mojito", price: 140, category: "mojito" },
  { name: "Watermelon Mojito", price: 160, category: "mojito" },
  { name: "Blue Lagoon Mojito", price: 160, category: "mojito" },
  // Ice Tea
  { name: "Lemon Ice Tea", price: 120, category: "icetea" },
  { name: "Peach Ice Tea", price: 130, category: "icetea" },
  // Thick Shakes
  { name: "Chocolate Shake", price: 180, category: "shakes" },
  { name: "Strawberry Shake", price: 180, category: "shakes" },
  { name: "Oreo Shake", price: 200, category: "shakes" },
  // Yogurt
  { name: "Mango Yogurt", price: 150, category: "yogurt" },
  { name: "Mixed Berry Yogurt", price: 160, category: "yogurt" },
  // Coffee
  { name: "Classic Cold Coffee", price: 150, category: "coffee" },
  { name: "Hazelnut Cold Coffee", price: 180, category: "coffee" },
  { name: "Caramel Cold Coffee", price: 180, category: "coffee" },
  // Desserts
  { name: "Tiramisu", price: 220, category: "desserts" },
  { name: "Panna Cotta", price: 200, category: "desserts" },
  { name: "Chocolate Brownie", price: 160, category: "desserts" },
  // Waffles
  { name: "Classic Belgian Waffle", price: 180, category: "waffles" },
  { name: "Nutella Waffle", price: 220, category: "waffles" },
  { name: "Strawberry Cream Waffle", price: 200, category: "waffles" },
  // Pancakes
  { name: "Buttermilk Pancakes", price: 180, category: "pancakes" },
  { name: "Blueberry Pancakes", price: 200, category: "pancakes" },
  { name: "Chocolate Chip Pancakes", price: 210, category: "pancakes" },
];

export const categoryLabels: Record<string, string> = {
  appetizers: "Appetizers",
  starters: "Starters",
  pizza: "Pizza",
  burgers: "Burgers",
  sandwich: "Sandwich",
  pasta: "Pasta",
  rice: "Rice / Main Course",
  mojito: "Mojito",
  icetea: "Ice Tea",
  shakes: "Thick Shakes",
  yogurt: "Yogurt Fusion",
  coffee: "Cold Coffee",
  desserts: "Desserts",
  waffles: "Waffles",
  pancakes: "Pancakes",
};
