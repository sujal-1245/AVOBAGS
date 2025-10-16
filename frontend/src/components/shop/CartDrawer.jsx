import React from "react";
import formatCurrency from "../../utils/formatCurrency";
import IconBag from "../IconBag";

export default function CartDrawer({ cart, updateQty, removeFromCart, subtotal, show, setShow, setShowCheckout }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1" onClick={() => setShow(false)} />
      <div className="w-96 bg-white shadow-2xl p-6 flex flex-col overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
            <IconBag className="w-12 h-12 mb-2" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 flex flex-col gap-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center border-b border-gray-100 pb-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <span>{formatCurrency(item.price)}</span>
                      <span className="line-through text-gray-300">{formatCurrency(item.price * 1.25)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-red-500 hover:underline text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex justify-between font-medium text-lg">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <button
                onClick={() => {
                  setShowCheckout(true);
                  setShow(false);
                }}
                className="mt-4 w-full py-3 rounded-2xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
