import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Search,
  ShoppingBag,
  Heart,
  Sun,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./Nav.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop?category=Corsets", label: "Lookbook", badge: true },
  { to: "/shop", label: "Collections" },
  { to: "/about", label: "About" },
];

export default function Nav() {
  const { itemCount, setDrawerOpen } = useCart();
  const { ids } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  function handleLogout() {
    logout();
    setAccountOpen(false);
    navigate("/");
  }

  return (
    <header className="hh-nav">
      {/* Utility bar */}
      <div className="hh-utility-bar">
        <div className="hh-utility-icons">
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
            <Instagram size={16} strokeWidth={1.5} />
          </a>
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
            <Facebook size={16} strokeWidth={1.5} />
          </a>
          <button
            className="hh-icon-btn"
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
          >
            <Search size={16} strokeWidth={1.5} />
          </button>
        </div>

        <Link to="/shop" className="hh-drop-badge">
          DROP 01 — VAUXHALL BALL
        </Link>

        <div className="hh-utility-actions">
          <button
            className="hh-icon-btn"
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <Moon size={16} strokeWidth={1.5} />
            ) : (
              <Sun size={16} strokeWidth={1.5} />
            )}
          </button>

          <Link to="/wishlist" className="hh-icon-btn hh-icon-with-count" aria-label="Wishlist">
            <Heart size={16} strokeWidth={1.5} />
            {ids.length > 0 && <span className="hh-count">{ids.length}</span>}
          </Link>

          <div className="hh-account-menu">
            <button
              className="hh-icon-btn"
              aria-label="Account"
              onClick={() => setAccountOpen((a) => !a)}
            >
              <User size={16} strokeWidth={1.5} />
            </button>
            {accountOpen && (
              <div className="hh-account-dropdown">
                {user ? (
                  <>
                    <p className="hh-account-name">{user.name}</p>
                    <p className="hh-account-role">{user.role === "seller" ? "Seller Account" : "Customer Account"}</p>
                    {user.role === "seller" && (
                      <Link to="/seller/dashboard" onClick={() => setAccountOpen(false)}>
                        <LayoutDashboard size={14} /> Seller Dashboard
                      </Link>
                    )}
                    <button onClick={handleLogout}>
                      <LogOut size={14} /> Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setAccountOpen(false)}>Sign In</Link>
                    <Link to="/register" onClick={() => setAccountOpen(false)}>Join The Ton</Link>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            className="hh-icon-btn hh-icon-with-count"
            aria-label="Cart"
            onClick={() => setDrawerOpen(true)}
          >
            <ShoppingBag size={16} strokeWidth={1.5} />
            {itemCount > 0 && <span className="hh-count">{itemCount}</span>}
          </button>

          <button
            className="hh-icon-btn hh-mobile-toggle"
            aria-label="Menu"
            onClick={() => setMobileOpen((m) => !m)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}

      {/* Hero / logo */}
      <Link to="/" className="hh-hero">
        <span className="hh-monogram" aria-hidden="true">HH</span>
        <h1 className="hh-title">
          HISTORICAL <span className="hh-title-accent">HYPE</span>
        </h1>
        <p className="hh-tagline">REGENCY STREETWEAR</p>
      </Link>

      {/* Main navigation */}
      <nav className={`hh-main-nav ${mobileOpen ? "is-open" : ""}`}>
        {links.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            className={({ isActive }) =>
              `hh-nav-link ${link.badge ? "hh-nav-link--badge" : ""} ${
                isActive && !link.badge ? "is-active" : ""
              }`
            }
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="hh-divider" />
    </header>
  );
}
