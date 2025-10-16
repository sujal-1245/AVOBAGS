import React, { useState, useMemo } from "react";
import HeroSlider from "../components/HeroSlider";
import QuickViewModal from "../components/shop/QuickViewModal";
import CartDrawer from "../components/shop/CartDrawer";
import CheckoutModal from "../components/shop/CheckoutModal";
import PRODUCTS from "../data/products";
import formatCurrency from "../utils/formatCurrency";

export default function Shop({
  query,
  sort,
  cart,
  addToCart,
  updateQty,
  removeFromCart,
  subtotal,
  showCart,
  setShowCart,
  showCheckout,
  setShowCheckout,
}) {
  const [category, setCategory] = useState("All");
  const [quickView, setQuickView] = useState(null);

  const categories = useMemo(
    () => ["All", ...new Set(PRODUCTS.map((p) => p.category))],
    []
  );

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.desc.toLowerCase().includes(query.toLowerCase()))
    );

    if (sort === "price-asc")
      list = list.slice().sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      list = list.slice().sort((a, b) => b.price - a.price);

    return list;
  }, [query, category, sort]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <HeroSlider />

      {/* Categories */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-3 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-2 rounded-full text-sm border ${
                  category === c
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-700 border-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-600">
            Showing {filtered.length} results
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => {
            const originalPrice = p.price * 1.25;
            return (
              <article
                key={p.id}
                className="rounded-3xl bg-white shadow-lg border border-gray-100 p-4 hover:shadow-2xl transition-transform duration-300 group flex flex-col"
              >
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-56 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white border border-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
                    {p.category}
                  </div>
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {p.name}
                  </h3>
                  <div className="flex gap-2 items-end">
                    <span className="text-gray-400 line-through text-sm">
                      {formatCurrency(originalPrice)}
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(p.price)}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {p.desc}
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => addToCart(p)}
                    className="flex-1 py-2 rounded-2xl bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 transition shadow-md"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setQuickView(p)}
                    className="flex-1 py-2 rounded-2xl bg-white border border-gray-200 font-medium text-sm hover:bg-gray-50 transition shadow-md"
                  >
                    Quick View
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      <QuickViewModal
        product={quickView}
        setQuickView={setQuickView}
        addToCart={addToCart}
        setShowCart={setShowCart}
      />

      <CartDrawer
        cart={cart}
        updateQty={updateQty}
        removeFromCart={removeFromCart}
        subtotal={subtotal}
        show={showCart}
        setShow={setShowCart}
        setShowCheckout={setShowCheckout}
      />

      {showCheckout && (
        <CheckoutModal
          cart={cart}
          subtotal={subtotal}
          setShowCheckout={setShowCheckout}
          setShowCart={setShowCart}
        />
      )}
    </div>
  );
}
