# Pink Salt Resto Cafe Website

## Overview

Pink Salt Resto Cafe is a modern restaurant website designed with a soft pink aesthetic theme. The website allows visitors to explore the cafe, browse the menu by category, view dish prices, and easily locate the cafe using Google Maps.

This project focuses on creating an attractive and user-friendly interface for customers to explore the cafe digitally.

---

## Features

* Beautiful landing page with aesthetic images of the cafe
* Soft pink themed UI inspired by the cafe’s interior
* Categorized menu sections (Starters, Pasta, Pizza, Desserts, Beverages, etc.)
* Dish listings with prices
* Google Maps integration for easy location access
* Responsive design for desktop and mobile users

---

## Tech Stack

* **Frontend:** React, TypeScript, Vite
* **Styling:** Tailwind CSS, Framer Motion
* **Backend:** Supabase (Database + Authentication)
* **UI Components:** Radix UI, Lucide Icons
* **Deployment:** Vercel

---

## Project Structure

```
pinksalt-cafe-charm-main/
│
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── admin/          # Admin panel components
│   │   └── ...             # Page components
│   ├── pages/              # Page components
│   ├── integrations/       # External service integrations
│   │   └── supabase/       # Supabase client and types
│   └── lib/                # Utility functions
├── supabase/
│   └── migrations/         # Database migrations
├── public/                 # Static assets
└── package.json            # Dependencies and scripts
```

---

## Admin Setup

The admin panel now uses email and password authentication via Supabase.

### Setting up Admin Access

1. **Create Admin Account:**
   - Visit `http://localhost:8082/admin` (or your deployed URL + `/admin`)
   - Click "Need to create an account? Register"
   - Enter your email and password
   - Check your email for confirmation

2. **Database Security:**
   - The admin operations (creating/editing menu items, offers, etc.) now require authentication
   - Public users can still view menu items and place orders
   - Only authenticated users can modify data

3. **Applying Database Changes:**
   - If using Supabase CLI: `npx supabase db push`
   - Or manually apply the SQL in `supabase/migrations/20260317100000_setup_admin_auth.sql` to your Supabase dashboard

### Admin Features

- **Orders Management:** View and update order status
- **Menu Management:** Add, edit, and remove menu items
- **Offers Management:** Create and manage special offers
- **Secure Authentication:** Email/password login with Supabase

```
git clone https://github.com/Anisha9905/pink-salt-resto-cafe.git
```

2. Navigate to the project folder

```
cd pink-salt-resto-cafe
```

3. Open `index.html` in your browser
   or run using a live server.

---

## Usage

Users can:

* Explore the aesthetic landing page
* Browse the cafe menu by categories
* Check prices of dishes
* View the cafe location through Google Maps

---

## Future Improvements

* Online table reservation system
* Online food ordering
* Customer reviews section
* Admin panel to update menu items
* Payment gateway integration

---

## Author

Developed by **Anisha Rao**

---
