# Historical Hype — Regency Streetwear E-Commerce

A 5-page React/Vite storefront: Home, Shop, Product Details, Cart, About.

## Setup

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## What's included

- **Routing**: react-router-dom (Home / Shop / Product / Cart / About / Wishlist)
- **Cart**: add/remove/update quantity, persisted to localStorage, slide-in drawer + full cart page
- **Wishlist**: heart-toggle on any product, persisted to localStorage, dedicated page
- **Search**: dropdown search from the nav, live-filters product names
- **Shop filters**: category, size, color, price range, sort, all combinable
- **Dark/Light mode**: toggle in the nav, persists via CSS custom properties
- **Countdown timer**: live drop countdown on the homepage drop banner
- **Product page**: image gallery with zoom-on-hover, size/color selectors, quantity, tabs (Description/Materials/Shipping/Reviews)
- **Reviews**: star ratings + written reviews on the product page
- **Animations**: scroll fade-ins (IntersectionObserver), hover zoom on product cards, gold border glow, smooth scrolling — respects `prefers-reduced-motion`
- **Responsive**: mobile nav, mobile filter drawer, responsive grids down to small screens

## Brand palette (from brief)

| Purpose | Hex |
|---|---|
| Royal Black | #111111 |
| Antique Gold | #C8A35D |
| Ivory | #F8F5EF |
| Burgundy | #6E1F28 |
| Dark Navy | #1D2A44 |

All defined as CSS custom properties in `src/index.css`, swapped automatically for dark mode via `[data-theme="dark"]`.

## Notes for extending

- Product data lives in `src/data/products.js` — replace with a real API/CMS call later without touching component code.
- Product images currently pull from Unsplash placeholder URLs — swap in your own photography before final submission.
- Checkout button on the Cart page is a placeholder (no payment integration) — fine for a frontend-only college project, but flag this to your teacher if a full checkout flow is expected.

## Backend (new: seller/customer accounts)

The `server/` folder is a separate Node/Express + SQLite API. It handles:
- Customer and seller accounts (JWT auth, hashed passwords)
- Sellers creating/editing/deleting their own product listings, with real image upload
- Public product browsing (used by the frontend Shop/Home/Product pages if you wire them to fetch from the API instead of `src/data/products.js`)

### Setup

```bash
cd server
cp .env.example .env    # then edit JWT_SECRET to something random
npm install
npm run seed             # loads the starter catalog into SQLite
npm run dev               # starts the API on http://localhost:4000
```

In a separate terminal, run the frontend as usual (`npm install && npm run dev` from the project root).

### How the roles work

- Register at `/register` and choose **Customer** or **Seller**.
- Sellers land on `/seller/dashboard` — a form to list a new product (name, price, description, materials, shipping note, categories, colors, sizes, and up to 5 photos), plus a list of their own listings with delete.
- `POST/PUT/DELETE /api/products` are protected — only logged-in sellers can hit them, and a seller can only edit/delete their **own** listings (checked server-side via `seller_id`, not just hidden in the UI).
- Customers browsing the Shop/Home pages currently still read from the static `src/data/products.js` file — that part hasn't been switched over to fetch from the live API yet. To make seller-listed products actually show up in the shop, the Shop/Home/ProductDetails pages need to fetch from `GET /api/products` instead of importing the static file. Ask if you want that wired up next.

### Uploaded images

Product photos sellers upload are saved to `server/uploads/` and served at `http://localhost:4000/uploads/<filename>`. The frontend's `resolveImageUrl()` helper in `src/api/client.js` prefixes these paths automatically when displaying them.
