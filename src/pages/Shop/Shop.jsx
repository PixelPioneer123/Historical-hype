import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { categories, sizes, colors } from "../../data/products.js";
import { api } from "../../api/client.js";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import "./Shop.css";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialSearch = searchParams.get("search") || "";

  const [activeCategories, setActiveCategories] = useState(
    initialCategory ? [initialCategory] : []
  );
  const [products, setProducts] = useState([]);
  const [activeSizes, setActiveSizes] = useState([]);
  const [activeColors, setActiveColors] = useState([]);
  const [maxPrice, setMaxPrice] = useState(300);
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    let ignore = false;
    api
      .get("/api/products")
      .then((data) => {
        if (!ignore) setProducts(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!ignore) setProducts([]);
      });

    return () => {
      ignore = true;
    };
  }, []);

  function toggle(list, setList, value) {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  function clearFilters() {
    setActiveCategories([]);
    setActiveSizes([]);
    setActiveColors([]);
    setMaxPrice(300);
    setSearch("");
    setSearchParams({});
  }

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (activeCategories.length && !p.categories.some((c) => activeCategories.includes(c))) return false;
      if (activeSizes.length && !p.sizes.some((s) => activeSizes.includes(s))) return false;
      if (activeColors.length && !p.colors.some((c) => activeColors.includes(c))) return false;
      if (p.price > maxPrice) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [activeCategories, activeSizes, activeColors, maxPrice, search, sort]);

  return (
    <div className="hh-shop container">
      <div className="hh-shop-header">
        <div>
          <span className="eyebrow">The Full Collection</span>
          <h1 className="section-heading">Shop</h1>
        </div>
        <button className="hh-filter-toggle btn btn-outline" onClick={() => setFiltersOpen((f) => !f)}>
          <SlidersHorizontal size={14} /> Filters
        </button>
      </div>

      <div className="hh-shop-layout">
        <aside className={`hh-filters ${filtersOpen ? "is-open" : ""}`}>
          <div className="hh-filters-header">
            <h3>Filters</h3>
            <button onClick={() => setFiltersOpen(false)} className="hh-icon-btn" aria-label="Close filters">
              <X size={18} />
            </button>
          </div>

          <div className="hh-filter-group">
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="hh-filter-search"
            />
          </div>

          <div className="hh-filter-group">
            <h4>Category</h4>
            {categories.map((cat) => (
              <label key={cat} className="hh-filter-checkbox">
                <input
                  type="checkbox"
                  checked={activeCategories.includes(cat)}
                  onChange={() => toggle(activeCategories, setActiveCategories, cat)}
                />
                {cat}
              </label>
            ))}
          </div>

          <div className="hh-filter-group">
            <h4>Size</h4>
            <div className="hh-swatch-row">
              {sizes.map((s) => (
                <button
                  key={s}
                  className={`hh-size-swatch ${activeSizes.includes(s) ? "is-active" : ""}`}
                  onClick={() => toggle(activeSizes, setActiveSizes, s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="hh-filter-group">
            <h4>Color</h4>
            {colors.map((c) => (
              <label key={c} className="hh-filter-checkbox">
                <input
                  type="checkbox"
                  checked={activeColors.includes(c)}
                  onChange={() => toggle(activeColors, setActiveColors, c)}
                />
                {c}
              </label>
            ))}
          </div>

          <div className="hh-filter-group">
            <h4>Max Price: ${maxPrice}</h4>
            <input
              type="range"
              min="30"
              max="300"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>

          <button className="btn btn-outline" style={{ width: "100%" }} onClick={clearFilters}>
            Clear All
          </button>
        </aside>

        <div className="hh-shop-results">
          <div className="hh-shop-toolbar">
            <span>{filtered.length} products</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <p className="hh-shop-empty">No products match your filters.</p>
          ) : (
            <div className="hh-product-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
