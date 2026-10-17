import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Shop from "./pages/Shop";

function About() {
  return (
    <div className="container py-5 text-center">
      <h1 className="text-light" style={{ fontFamily: "var(--font-heading)" }}>
        About Geordi Robinson
      </h1>
      <p className="text-secondary">Full biography and exhibition history.</p>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add print to cart or increase quantity if item + size already exists
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Update item quantity
  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item,
      ),
    );
  };

  // Remove item
  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Total count of items
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="page-container d-flex flex-column">
        {/* Navbar with Cart Open Trigger */}
        <Navbar
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/shop" element={<Shop onAddToCart={addToCart} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Slide-over Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
      </div>
    </Router>
  );
}
