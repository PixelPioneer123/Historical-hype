import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Heart, Minus, Plus } from "lucide-react";
import { api, resolveImageUrl } from "../../api/client.js";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import ReviewStars from "../../components/ReviewStars/ReviewStars.jsx";
import "./ProductDetails.css";

const TABS = ["Description", "Materials", "Shipping", "Reviews"];

const mockReviews = [
  { name: "Elena M.", rating: 5, text: "Fit is exactly true to size, and the fabric feels genuinely premium." },
  { name: "Marcus T.", rating: 4, text: "Beautiful piece. Shipping took a bit longer than expected but worth the wait." },
  { name: "Sofia B.", rating: 5, text: "Gets compliments every single time I wear it. Ordering the second colorway." },
];

export default function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    api
      .get(`/api/products/${id}`)
      .then((data) => {
        if (!ignore) {
          setProduct(data);
          setActiveImage(0);
          setSize(data?.sizes?.[0] || "");
          setColor(data?.colors?.[0] || "");
        }
      })
      .catch(() => {
        if (!ignore) setProduct(null);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) return <div className="container" style={{ padding: "4rem 0" }}>Loading product…</div>;
  if (!product) return <Navigate to="/shop" replace />;

  const wishlisted = isWishlisted(product.id);

  function handleAddToCart() {
    addItem(product, size, color, quantity);
  }

  return (
    <div className="hh-pdp container">
      <div className="hh-pdp-layout">
        {/* Gallery */}
        <div className="hh-pdp-gallery">
          <div
            className={`hh-pdp-main-image ${zoomed ? "is-zoomed" : ""}`}
            onMouseEnter={() => setZoomed(true)}
            onMouseLeave={() => setZoomed(false)}
          >
            <img src={resolveImageUrl(product.images?.[activeImage])} alt={product.name} />
          </div>
          <div className="hh-pdp-thumbs">
            {product.images.map((img, i) => (
              <button
                key={img}
                className={`hh-pdp-thumb ${i === activeImage ? "is-active" : ""}`}
                onClick={() => setActiveImage(i)}
              >
                <img src={resolveImageUrl(img)} alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="hh-pdp-info">
          {product.isNew && <span className="eyebrow">New Arrival</span>}
          <h1>{product.name}</h1>
          <div className="hh-pdp-meta">
            <ReviewStars rating={product.rating} />
            <span>({product.reviewCount} reviews)</span>
          </div>
          <div className="hh-pdp-price-wrap">
            {Number(product.discountPercent || 0) > 0 ? (
              <>
                <p className="hh-pdp-price" style={{ textDecoration: "line-through", opacity: 0.7, marginRight: "0.5rem" }}>
                  ${Number(product.price).toFixed(2)}
                </p>
                <p className="hh-pdp-price">
                  ${(Number(product.price) * (1 - Number(product.discountPercent || 0) / 100)).toFixed(2)}
                </p>
              </>
            ) : (
              <p className="hh-pdp-price">${Number(product.price).toFixed(2)}</p>
            )}
          </div>

          <div className="hh-pdp-selector">
            <h4>Color: {color}</h4>
            <div className="hh-swatch-row">
              {product.colors.map((c) => (
                <button
                  key={c}
                  className={`hh-color-swatch ${color === c ? "is-active" : ""}`}
                  style={{ background: swatchColor(c) }}
                  onClick={() => setColor(c)}
                  aria-label={c}
                />
              ))}
            </div>
          </div>

          <div className="hh-pdp-selector">
            <h4>Size: {size}</h4>
            <div className="hh-swatch-row">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  className={`hh-size-swatch ${size === s ? "is-active" : ""}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="hh-pdp-actions">
            <div className="hh-qty-control">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                <Minus size={12} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
                <Plus size={12} />
              </button>
            </div>
            <button className="btn btn-primary hh-pdp-add-btn" onClick={handleAddToCart}>
              Add To Cart
            </button>
            <button
              className={`hh-icon-btn hh-pdp-wishlist ${wishlisted ? "is-active" : ""}`}
              onClick={() => toggle(product.id)}
              aria-label="Toggle wishlist"
            >
              <Heart size={20} fill={wishlisted ? "currentColor" : "none"} strokeWidth={1.5} />
            </button>
          </div>

          {/* Tabs */}
          <div className="hh-pdp-tabs">
            <div className="hh-pdp-tab-headers">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  className={activeTab === tab ? "is-active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="hh-pdp-tab-content">
              {activeTab === "Description" && <p>{product.description}</p>}
              {activeTab === "Materials" && <p>{product.materials}</p>}
              {activeTab === "Shipping" && <p>{product.shipping}</p>}
              {activeTab === "Reviews" && (
                <ul className="hh-review-list">
                  {mockReviews.map((r) => (
                    <li key={r.name}>
                      <div className="hh-review-head">
                        <strong>{r.name}</strong>
                        <ReviewStars rating={r.rating} />
                      </div>
                      <p>{r.text}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <Link to="/shop" className="hh-pdp-back">← Back to Shop</Link>
    </div>
  );
}

function swatchColor(name) {
  const map = {
    Black: "#111111",
    Ivory: "#F8F5EF",
    "Powder Blue": "#AFC6DE",
    Gold: "#C8A35D",
    "Distressed Denim": "#3B4B61",
  };
  return map[name] || "#ccc";
}
