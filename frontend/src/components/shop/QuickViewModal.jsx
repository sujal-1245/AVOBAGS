import React from "react";
import  formatCurrency  from "../../utils/formatCurrency";

export default function QuickViewModal({ product, setQuickView, addToCart, setShowCart }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl w-11/12 max-w-3xl p-6 relative shadow-2xl">
        <button
          onClick={() => setQuickView(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-xl font-bold"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 h-64 object-cover rounded-2xl"
          />
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-gray-600 line-clamp-4">{product.desc}</p>
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold">{formatCurrency(product.price)}</span>
              <span className="text-gray-400 line-through">{formatCurrency(product.price * 1.25)}</span>
            </div>

            <div className="mt-auto flex gap-3">
              <button
                onClick={() => {
                  addToCart(product);
                  setQuickView(null);
                  setShowCart(true);
                }}
                className="flex-1 py-2 rounded-2xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setQuickView(null)}
                className="flex-1 py-2 rounded-2xl border border-gray-200 font-medium hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
