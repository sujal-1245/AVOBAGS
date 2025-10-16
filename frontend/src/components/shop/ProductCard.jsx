import React from "react";
import  formatCurrency  from "../utils/formatCurrency";

export default function ProductCard({ product, addToCart, setQuickView }) {
  const originalPrice = product.price * 1.25;
  return (
    <article className="rounded-3xl bg-white shadow-lg border border-gray-100 p-4 hover:shadow-2xl transition-transform duration-300 group flex flex-col">
      <div className="relative rounded-2xl overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-white border border-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
          {product.category}
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <div className="flex gap-2 items-end">
          <span className="text-gray-400 line-through text-sm">{formatCurrency(originalPrice)}</span>
          <span className="text-xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.desc}</p>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => addToCart(product)}
          className="flex-1 py-2 rounded-2xl bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 transition shadow-md"
        >
          Add to Cart
        </button>
        <button
          onClick={() => setQuickView(product)}
          className="flex-1 py-2 rounded-2xl bg-white border border-gray-200 font-medium text-sm hover:bg-gray-50 transition shadow-md"
        >
          Quick View
        </button>
      </div>
    </article>
  );
}
