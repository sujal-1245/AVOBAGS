import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/layout/Navbar";

// Pages
import NewHome from "./pages/newlp/Home";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";

import { Toaster, toast } from "react-hot-toast";

// -----------------------------
// ScrollToTop Component
// -----------------------------
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

const App = () => {
  // -----------------------------
  // Shared State
  // -----------------------------
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // -----------------------------
  // Cart Functions
  // -----------------------------
  const addToCart = (product) => {
    const exists = cart.find((it) => it.id === product.id);

    if (exists) {
      setCart((c) =>
        c.map((it) =>
          it.id === product.id ? { ...it, qty: it.qty + 1 } : it
        )
      );
      toast.success(`${product.name} quantity updated`);
    } else {
      setCart((c) => [...c, { ...product, qty: 1 }]);
      toast.success(`${product.name} added to cart`);
    }
  };

  const updateQty = (id, qty) => {
    const product = cart.find((p) => p.id === id);
    if (!product) return;

    const updatedCart = cart
      .map((it) => (it.id === id ? { ...it, qty } : it))
      .filter((it) => it.qty > 0);

    setCart(updatedCart);

    if (qty === 0) toast(`${product.name} removed from cart`);
    else toast(`${product.name} quantity updated`);
  };

  const removeFromCart = (id) => {
    const product = cart.find((p) => p.id === id);
    if (!product) return;

    setCart(cart.filter((it) => it.id !== id));

    toast(`${product.name} removed from cart`);
  };

  // -----------------------------
  // Auto-close checkout
  // -----------------------------
  useEffect(() => {
    if (cart.length === 0 && showCheckout) {
      setShowCheckout(false);
    }
  }, [cart, showCheckout]);

  return (
    <Router>
      <Toaster position="top-center" />

      {/* ScrollToTop triggers on every route change */}
      <ScrollToTop />

      {/* Navbar is always visible */}
      <Navbar
        query={query}
        setQuery={setQuery}
        sort={sort}
        setSort={setSort}
        cart={cart}
        setShowCart={setShowCart}
      />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newlp" element={<NewHome />} />
        <Route
          path="/shop"
          element={
            <Shop
              query={query}
              sort={sort}
              cart={cart}
              addToCart={addToCart}
              updateQty={updateQty}
              removeFromCart={removeFromCart}
              subtotal={subtotal}
              showCart={showCart}
              setShowCart={setShowCart}
              showCheckout={showCheckout}
              setShowCheckout={setShowCheckout}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
