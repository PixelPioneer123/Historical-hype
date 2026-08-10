import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import "./Cart.css";

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  return (
    <div className="hh-cart-page container">
      <span className="eyebrow">Your Selection</span>
      <h1 className="section-heading">Shopping Bag</h1>

      {items.length === 0 ? (
        <div className="hh-cart-empty">
          <p>Your bag is currently empty.</p>
          <Link to="/shop" className="btn btn-primary">Shop The Collection</Link>
        </div>
      ) : (
        <div className="hh-cart-layout">
          <table className="hh-cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.key}>
                  <td className="hh-cart-product-cell">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h4>{item.name}</h4>
                      <p>{item.color} / {item.size}</p>
                    </div>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <div className="hh-qty-control">
                      <button onClick={() => updateQuantity(item.key, item.quantity - 1)} aria-label="Decrease">
                        <Minus size={12} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.key, item.quantity + 1)} aria-label="Increase">
                        <Plus size={12} />
                      </button>
                    </div>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button className="hh-icon-btn" onClick={() => removeItem(item.key)} aria-label="Remove">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <aside className="hh-cart-summary">
            <h3>Order Summary</h3>
            <div className="hh-cart-summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="hh-cart-summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="hh-cart-summary-row hh-cart-summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary" style={{ width: "100%" }}>
              Checkout
            </button>
            <Link to="/shop" className="hh-cart-continue">Continue Shopping</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
