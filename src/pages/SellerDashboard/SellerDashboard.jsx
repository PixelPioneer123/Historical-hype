import { useEffect, useState } from "react";
import { api, resolveImageUrl } from "../../api/client.js";
import { categories as allCategories, colors as allColors, sizes as allSizes } from "../../data/products.js";
import { useAuth } from "../../context/AuthContext.jsx";
import "./SellerDashboard.css";

const emptyForm = {
  name: "",
  price: "",
  discountPercent: "",
  description: "",
  materials: "",
  shipping: "",
  categories: [],
  colors: [],
  sizes: [],
};

export default function SellerDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    try {
      const data = await api.get("/api/products/mine");
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function toggleMulti(field, value) {
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(value) ? f[field].filter((v) => v !== value) : [...f[field], value],
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setFiles([]);
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.categories.length === 0) {
      setError("Select at least one category.");
      return;
    }
    if (!editingId && files.length === 0) {
      setError("Please choose at least one product photo.");
      return;
    }

    setSubmitting(true);
    try {
      const body = new FormData();
      body.append("name", form.name);
      body.append("price", form.price);
      body.append("discountPercent", form.discountPercent || "0");
      body.append("description", form.description);
      body.append("materials", form.materials);
      body.append("shipping", form.shipping);
      body.append("categories", JSON.stringify(form.categories));
      body.append("colors", JSON.stringify(form.colors));
      body.append("sizes", JSON.stringify(form.sizes));
      files.forEach((file) => body.append("images", file));

      if (editingId) {
        await api.put(`/api/products/${editingId}`, body, { isFormData: true });
        setSuccess("Product updated successfully.");
      } else {
        await api.post("/api/products", body, { isFormData: true });
        setSuccess("Product listed successfully.");
      }

      resetForm();
      loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Remove this product from your shop?")) return;
    try {
      await api.del(`/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  function handleEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      discountPercent: product.discountPercent ?? "",
      description: product.description,
      materials: product.materials,
      shipping: product.shipping,
      categories: product.categories || [],
      colors: product.colors || [],
      sizes: product.sizes || [],
    });
    setFiles([]);
    setError("");
    setSuccess("");
  }

  return (
    <div className="hh-seller container">
      <span className="eyebrow">Seller Dashboard</span>
      <h1 className="section-heading">Welcome, {user?.name}</h1>

      <div className="hh-seller-layout">
        <div className="hh-seller-form-panel">
          <h2>{editingId ? "Update Product" : "List A New Product"}</h2>

          {error && <p className="hh-auth-error">{error}</p>}
          {success && <p className="hh-seller-success">{success}</p>}

          <form onSubmit={handleSubmit} className="hh-seller-form">
            <label>
              Product Name
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </label>

            <label>
              Price (USD)
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
            </label>

            <label>
              Discount % <span className="hh-optional">(optional)</span>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value={form.discountPercent}
                onChange={(e) => setForm({ ...form, discountPercent: e.target.value })}
                placeholder="0"
              />
            </label>

            <label>
              Description
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </label>

            <label>
              Materials <span className="hh-optional">(optional)</span>
              <input
                type="text"
                value={form.materials}
                onChange={(e) => setForm({ ...form, materials: e.target.value })}
                placeholder="e.g. 100% cotton, steel boning"
              />
            </label>

            <label>
              Shipping Note <span className="hh-optional">(optional)</span>
              <input
                type="text"
                value={form.shipping}
                onChange={(e) => setForm({ ...form, shipping: e.target.value })}
                placeholder="e.g. Ships within 3–5 business days"
              />
            </label>

            <div className="hh-seller-field">
              <span className="hh-seller-field-label">Categories</span>
              <div className="hh-chip-row">
                {allCategories.map((c) => (
                  <button
                    type="button"
                    key={c}
                    className={`hh-chip ${form.categories.includes(c) ? "is-active" : ""}`}
                    onClick={() => toggleMulti("categories", c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="hh-seller-field">
              <span className="hh-seller-field-label">Available Colors</span>
              <div className="hh-chip-row">
                {allColors.map((c) => (
                  <button
                    type="button"
                    key={c}
                    className={`hh-chip ${form.colors.includes(c) ? "is-active" : ""}`}
                    onClick={() => toggleMulti("colors", c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="hh-seller-field">
              <span className="hh-seller-field-label">Available Sizes</span>
              <div className="hh-chip-row">
                {allSizes.map((s) => (
                  <button
                    type="button"
                    key={s}
                    className={`hh-chip ${form.sizes.includes(s) ? "is-active" : ""}`}
                    onClick={() => toggleMulti("sizes", s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <label>
              Product Photos <span className="hh-optional">(up to 5)</span>
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp, image/gif"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files).slice(0, 5))}
              />
            </label>
            {files.length > 0 && (
              <p className="hh-seller-file-count">{files.length} photo(s) selected</p>
            )}

            <div className="hh-seller-actions">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? (editingId ? "Updating…" : "Listing…") : editingId ? "Update Product" : "List Product"}
              </button>
              {editingId && (
                <button type="button" className="btn btn-outline" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="hh-seller-listings">
          <h2>Your Listings ({products.length})</h2>

          {loading ? (
            <p className="hh-seller-empty">Loading…</p>
          ) : products.length === 0 ? (
            <p className="hh-seller-empty">You haven't listed anything yet.</p>
          ) : (
            <ul className="hh-seller-product-list">
              {products.map((p) => (
                <li key={p.id}>
                  <img src={resolveImageUrl(p.images[0])} alt={p.name} />
                  <div className="hh-seller-product-info">
                    <h4>{p.name}</h4>
                    <p>${p.price} · {p.categories.join(", ")}</p>
                  </div>
                  <div className="hh-seller-listing-actions">
                    <button className="hh-icon-btn" onClick={() => handleEdit(p)} aria-label="Edit product">
                      Edit
                    </button>
                    <button className="hh-icon-btn" onClick={() => handleDelete(p.id)} aria-label="Delete product">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
