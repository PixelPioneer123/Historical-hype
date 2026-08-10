import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="hh-footer">
      <div className="container hh-footer-grid">
        <div>
          <h3 className="hh-footer-logo">Historical Hype</h3>
          <p className="hh-footer-tag">Rule the modern court.</p>
          <div className="hh-footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <Facebook size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div>
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop">All Products</Link></li>
            <li><Link to="/shop?category=Corsets">Corsets</Link></li>
            <li><Link to="/shop?category=Dresses">Dresses</Link></li>
            <li><Link to="/shop?category=Outerwear">Outerwear</Link></li>
          </ul>
        </div>

        <div>
          <h4>About</h4>
          <ul>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/shop">Lookbook</Link></li>
            <li><a href="#">Shipping & Returns</a></li>
          </ul>
        </div>

        <div>
          <h4>Join The Court</h4>
          <p className="hh-footer-tag">Get first access to every drop.</p>
          <form className="hh-footer-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email address" required />
            <button type="submit" className="btn btn-primary">Join</button>
          </form>
        </div>
      </div>

      <div className="hh-footer-bottom">
        <span>© {new Date().getFullYear()} Historical Hype. All rights reserved.</span>
      </div>
    </footer>
  );
}
