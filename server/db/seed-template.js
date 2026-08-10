import db from "./db.js";

// Paste your product list here in this shape (note: `categories` is an ARRAY,
// matching the frontend products.js you already edited):
const products = [
  {
    id: "your-product-id",
    name: "Your Product Name",
    categories: ["Corsets", "Tops"], // can be multiple
    drop_id: "drop-01",
    price: 165,
    rating: 4.9,
    review_count: 142,
    is_new: 1, // 1 or 0, not true/false
    images: ["https://...", "https://..."],
    colors: ["Powder Blue", "Ivory"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "...",
    materials: "...",
    shipping: "...",
  },
  // ...more products
];

const insertProduct = db.prepare(`
  INSERT INTO products (id, name, drop_id, price, rating, review_count, is_new, images, colors, sizes, description, materials, shipping)
  VALUES (@id, @name, @drop_id, @price, @rating, @review_count, @is_new, @images, @colors, @sizes, @description, @materials, @shipping)
  ON CONFLICT(id) DO UPDATE SET
    name=excluded.name, drop_id=excluded.drop_id, price=excluded.price,
    rating=excluded.rating, review_count=excluded.review_count, is_new=excluded.is_new,
    images=excluded.images, colors=excluded.colors, sizes=excluded.sizes,
    description=excluded.description, materials=excluded.materials, shipping=excluded.shipping
`);

const insertCategory = db.prepare(`INSERT INTO categories (name) VALUES (?) ON CONFLICT(name) DO NOTHING`);
const getCategoryId = db.prepare(`SELECT id FROM categories WHERE name = ?`);
const clearProductCategories = db.prepare(`DELETE FROM product_categories WHERE product_id = ?`);
const linkCategory = db.prepare(`INSERT INTO product_categories (product_id, category_id) VALUES (?, ?) ON CONFLICT DO NOTHING`);

const insertMany = db.transaction((rows) => {
  for (const row of rows) {
    insertProduct.run({
      id: row.id,
      name: row.name,
      drop_id: row.drop_id,
      price: row.price,
      rating: row.rating,
      review_count: row.review_count,
      is_new: row.is_new,
      images: JSON.stringify(row.images),
      colors: JSON.stringify(row.colors),
      sizes: JSON.stringify(row.sizes),
      description: row.description,
      materials: row.materials,
      shipping: row.shipping,
    });

    clearProductCategories.run(row.id);

    for (const categoryName of row.categories) {
      insertCategory.run(categoryName);
      const { id: categoryId } = getCategoryId.get(categoryName);
      linkCategory.run(row.id, categoryId);
    }
  }
});

insertMany(products);
console.log(`Seeded ${products.length} products.`);
