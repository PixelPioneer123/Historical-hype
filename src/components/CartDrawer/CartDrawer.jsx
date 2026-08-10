import { Link } from "react-router-dom";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import "./CartDrawer.css";

export default function CartDrawer() {
  const { items, isDrawerOpen, setDrawerOpen, removeItem, updateQuantity, subtotal } =
    useCart();

  return (
    <>
      <div
        className={`hh-drawer-overlay ${isDrawerOpen ? "is-open" : ""}`}
        onClick={() => setDrawerOpen(false)}
      />
      <aside className={`hh-cart-drawer ${isDrawerOpen ? "is-open" : ""}`}>
        <div className="hh-drawer-header">
          <h2>Your Bag ({items.length})</h2>
          <button className="hh-icon-btn" onClick={() => setDrawerOpen(false)} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="hh-drawer-empty">
            <p>Your bag is empty.</p>
            <Link to="/shop" className="btn btn-primary" onClick={() => setDrawerOpen(false)}>
              Shop The Collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="hh-drawer-items">
              {items.map((item) => (
                <li key={item.key} className="hh-drawer-item">
                  <img src={item.image} alt={item.name} />
                  <div className="hh-drawer-item-info">
                    <h4>{item.name}</h4>
                    <p>
                      {item.color} / {item.size}
                    </p>
                    <div className="hh-qty-control">
                      <button onClick={() => updateQuantity(item.key, item.quantity - 1)} aria-label="Decrease quantity">
                        <Minus size={12} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.key, item.quantity + 1)} aria-label="Increase quantity">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="hh-drawer-item-right">
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      className="hh-icon-btn"
                      onClick={() => removeItem(item.key)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="hh-drawer-footer">
              <div className="hh-drawer-subtotal">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <Link to="/cart" className="btn btn-primary" onClick={() => setDrawerOpen(false)}>
                View Bag
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
