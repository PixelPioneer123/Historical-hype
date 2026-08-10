import { Router } from "express";
import Product from "../models/Product.js";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/requireRole.js";
import { upload } from "../middleware/upload.js";

const router = Router();

function slugify(name) {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Date.now().toString(36)
  );
}

function serialize(p) {
  return {
    id: p._id,
    name: p.name,
    sellerId: p.sellerId ? p.sellerId.toString() : null,
    categories: p.categories,
    drop: p.dropId,
    price: p.price,
    discountPercent: p.discountPercent ?? 0,
    rating: p.rating,
    reviewCount: p.reviewCount,
    isNew: p.isNew,
    images: p.images,
    colors: p.colors,
    sizes: p.sizes,
    description: p.description,
    materials: p.materials,
    shipping: p.shipping,
  };
}

// GET /api/products?category=Corsets&search=corset
router.get("/", async (req, res) => {
  const { category, search } = req.query;
  const filter = {};
  if (category) filter.categories = category; // matches if the array contains this value
  if (search) filter.name = { $regex: search, $options: "i" };

  const products = await Product.find(filter);
  res.json(products.map(serialize));
});

// GET /api/products/meta/categories
router.get("/meta/categories", async (req, res) => {
  const categories = await Product.distinct("categories");
  res.json(categories.sort());
});

// GET /api/products/mine — seller's own listings (must come before /:id)
router.get("/mine", requireAuth, requireRole("seller"), async (req, res) => {
  const products = await Product.find({ sellerId: req.user.id });
  res.json(products.map(serialize));
});

// GET /api/products/:id
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found." });
  res.json(serialize(product));
});

// POST /api/products — sellers create a new listing with uploaded images
router.post("/", requireAuth, requireRole("seller"), upload.array("images", 5), async (req, res) => {
  const { name, price, description, materials, shipping, colors, sizes, categories, discountPercent } = req.body;

  if (!name || !price || !description) {
    return res.status(400).json({ error: "name, price, and description are required." });
  }

  const parsedDiscount = Number(discountPercent ?? 0);
  if (Number.isNaN(parsedDiscount) || parsedDiscount < 0 || parsedDiscount > 100) {
    return res.status(400).json({ error: "discountPercent must be between 0 and 100." });
  }
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "At least one product image is required." });
  }

  let parsedColors, parsedSizes, parsedCategories;
  try {
    parsedColors = JSON.parse(colors || "[]");
    parsedSizes = JSON.parse(sizes || "[]");
    parsedCategories = JSON.parse(categories || "[]");
  } catch {
    return res.status(400).json({ error: "colors, sizes, and categories must be valid JSON arrays." });
  }
  if (parsedCategories.length === 0) {
    return res.status(400).json({ error: "Select at least one category." });
  }

  const imagePaths = req.files.map((f) => `/uploads/${f.filename}`);

  const product = await Product.create({
    _id: slugify(name),
    name,
    sellerId: req.user.id,
    price: Number(price),
    discountPercent: parsedDiscount,
    isNew: true,
    images: imagePaths,
    colors: parsedColors,
    sizes: parsedSizes,
    categories: parsedCategories,
    description,
    materials: materials || "",
    shipping: shipping || "Ships within 2–4 business days.",
  });

  res.status(201).json(serialize(product));
});

// PUT /api/products/:id — sellers update their own listing (images optional on update)
router.put("/:id", requireAuth, requireRole("seller"), upload.array("images", 5), async (req, res) => {
  const existing = await Product.findById(req.params.id);
  if (!existing) return res.status(404).json({ error: "Product not found." });
  if (existing.sellerId?.toString() !== req.user.id) {
    return res.status(403).json({ error: "You can only edit your own products." });
  }

  const { name, price, description, materials, shipping, colors, sizes, categories } = req.body;

  if (req.files && req.files.length > 0) {
    existing.images = req.files.map((f) => `/uploads/${f.filename}`);
  }
  if (name) existing.name = name;
  if (price !== undefined && price !== "") existing.price = Number(price);
  if (discountPercent !== undefined && discountPercent !== "") {
    const parsedDiscount = Number(discountPercent);
    if (Number.isNaN(parsedDiscount) || parsedDiscount < 0 || parsedDiscount > 100) {
      return res.status(400).json({ error: "discountPercent must be between 0 and 100." });
    }
    existing.discountPercent = parsedDiscount;
  }
  if (description) existing.description = description;
  if (materials !== undefined) existing.materials = materials;
  if (shipping) existing.shipping = shipping;

  try {
    if (colors) existing.colors = JSON.parse(colors);
    if (sizes) existing.sizes = JSON.parse(sizes);
    if (categories) existing.categories = JSON.parse(categories);
  } catch {
    return res.status(400).json({ error: "colors, sizes, and categories must be valid JSON arrays." });
  }

  await existing.save();
  res.json(serialize(existing));
});

// DELETE /api/products/:id — sellers delete their own listing
router.delete("/:id", requireAuth, requireRole("seller"), async (req, res) => {
  const existing = await Product.findById(req.params.id);
  if (!existing) return res.status(404).json({ error: "Product not found." });
  if (existing.sellerId?.toString() !== req.user.id) {
    return res.status(403).json({ error: "You can only delete your own products." });
  }

  await existing.deleteOne();
  res.status(204).send();
});

export default router;
