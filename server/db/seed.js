import "dotenv/config";
import mongoose from "mongoose";
import Product from "../models/Product.js";

// Paste your product list here — this is now almost identical to your frontend
// src/data/products.js shape. Just rename two keys: `id` -> `_id`, `drop` -> `dropId`.
const products = [
  {
    _id: "deconstructed-duchess",
    name: "The De-Constructed Duchess",
    categories: ["Corsets"],
    dropId: "drop-01",
    price: 165,
    rating: 4.9,
    reviewCount: 142,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800&q=80",
    ],
    colors: ["Powder Blue", "Ivory"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A fully boned pastel satin corset worn over an oversized streetwear hoodie.",
    materials: "Corset: 100% cotton satin, steel boning, brass busk. Hoodie: 400gsm cotton fleece.",
    shipping: "Ships within 2–4 business days in matte black packaging, wrapped in parchment.",
  },
  // ...paste the rest of your products here, same shape
];

async function seed() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/historical-hype";
  await mongoose.connect(uri);
  console.log("Connected to MongoDB for seeding:", uri);

  for (const p of products) {
    await Product.findByIdAndUpdate(p._id, p, { upsert: true, new: true, setDefaultsOnInsert: true });
  }

  console.log(`Seeded ${products.length} products.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
