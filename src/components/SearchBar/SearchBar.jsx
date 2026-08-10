import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { products } from "../../data/products.js";
import "./SearchBar.css";

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results =
    query.trim().length > 0
      ? products
          .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5)
      : [];

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(query)}`);
    onClose();
  }

  return (
    <div className="hh-search-panel">
      <form className="hh-search-form" onSubmit={handleSubmit}>
        <Search size={18} strokeWidth={1.5} />
        <input
          autoFocus
          type="text"
          placeholder="Search products…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="button" className="hh-icon-btn" onClick={onClose} aria-label="Close search">
          <X size={18} />
        </button>
      </form>

      {results.length > 0 && (
        <ul className="hh-search-results">
          {results.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => {
                  navigate(`/product/${p.id}`);
                  onClose();
                }}
              >
                <img src={p.images[0]} alt="" />
                <span>
                  {p.name}
                  <em>${p.price}</em>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
