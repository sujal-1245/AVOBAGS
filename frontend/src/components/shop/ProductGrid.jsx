import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, addToCart, setQuickView }) {
  return (
    <main className="max-w-7xl mx-auto px-6 pb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <ProductCard
  key={product.id}
  product={product}
  addToCart={addToCart}   // ✅ now wired correctly
  setQuickView={setQuickView}
/>

        ))}
      </div>
    </main>
  );
}
