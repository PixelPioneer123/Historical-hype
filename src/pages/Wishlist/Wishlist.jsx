import { Link } from "react-router-dom";
import { products } from "../../data/products.js";
import { useWishlist } from "../../context/WishlistContext.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import "../Shop/Shop.css";

export default function Wishlist() {
  const { ids } = useWishlist();
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <div className="hh-shop container">
      <div className="hh-shop-header">
        <div>
          <span className="eyebrow">Saved For Later</span>
          <h1 className="section-heading">Wishlist</h1>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="hh-cart-empty" style={{ padding: "60px 0" }}>
          <p>You haven't saved anything yet.</p>
          <Link to="/shop" className="btn btn-primary">Shop The Collection</Link>
        </div>
      ) : (
        <div className="hh-product-grid">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
