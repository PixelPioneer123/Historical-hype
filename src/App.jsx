import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CartDrawer from "./components/CartDrawer/CartDrawer.jsx";
import Home from "./pages/Home/Home.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import About from "./pages/About/About.jsx";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import SellerDashboard from "./pages/SellerDashboard/SellerDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

export default function App() {
  return (
    <>
      <Nav />
      <CartDrawer />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/seller/dashboard"
            element={
              <ProtectedRoute role="seller">
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
