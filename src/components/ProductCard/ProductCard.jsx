import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { resolveImageUrl } from "../../api/client.js";
import { useWishlist } from "../../context/WishlistContext.jsx";
import ReviewStars from "../ReviewStars/ReviewStars.jsx";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="hh-product-card">
      <div className="hh-product-image-wrap">
        <Link to={`/product/${product.id}`}>
          <img src={resolveImageUrl(product.images?.[0])} alt={product.name} className="hh-product-img-primary" />
          {product.images?.[1] && (
            <img src={resolveImageUrl(product.images[1])} alt="" className="hh-product-img-secondary" />
          )}
        </Link>
        {product.isNew && <span className="hh-new-badge">New</span>}
        <button
          className={`hh-wishlist-btn ${wishlisted ? "is-active" : ""}`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggle(product.id)}
        >
          <Heart size={16} fill={wishlisted ? "currentColor" : "none"} strokeWidth={1.5} />
        </button>
      </div>

      <Link to={`/product/${product.id}`} className="hh-product-info">
        <h3>{product.name}</h3>
        <div className="hh-product-meta">
          <ReviewStars rating={product.rating} />
          <div>
            {Number(product.discountPercent || 0) > 0 ? (
              <>
                <span className="hh-product-price" style={{ textDecoration: "line-through", opacity: 0.7, marginRight: "0.5rem" }}>
                  ${Number(product.price).toFixed(2)}
                </span>
                <span className="hh-product-price">
                  ${(Number(product.price) * (1 - Number(product.discountPercent || 0) / 100)).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="hh-product-price">${Number(product.price).toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
