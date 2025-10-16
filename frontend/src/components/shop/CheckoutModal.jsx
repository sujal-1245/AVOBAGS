import React, { useState, useEffect } from "react";
import formatCurrency from "../../utils/formatCurrency";

export default function CheckoutModal({
  cart = [],
  subtotal = 0,
  setShowCheckout,
  setCart,
  setShowCart,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  const [paymentStatus, setPaymentStatus] = useState(null); // "success" | "failure"

  // detect PayU redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("status") === "success") {
      setPaymentStatus("success");
      setCart([]);
      setShowCart(false);
    } else if (params.get("status") === "failure") {
      setPaymentStatus("failure");
    }
  }, [setCart, setShowCart]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);

    try {
      // request hash & txnid from backend
      const res = await fetch("http://localhost:5000/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: subtotal.toFixed(2),
          productinfo: cart.map((i) => i.name).join(" "),
          firstname: formData.firstname,
          email: formData.email,
        }),
      });

      const paymentData = await res.json();

      // Create form dynamically
      const form = document.createElement("form");
      form.method = "POST";
      form.action = paymentData.action;

      const fields = {
        ...paymentData,
        phone: formData.phone,
        surl: window.location.origin + "?status=success",
        furl: window.location.origin + "?status=failure",
        service_provider: "payu_paisa",
      };

      Object.entries(fields).forEach(([k, v]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = k;
        input.value = v;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error("PayU init error:", err);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={() => setShowCheckout(false)}
      />

      {/* Checkout Form */}
      <form
        onSubmit={handleCheckoutSubmit}
        className="relative z-10 bg-white rounded-2xl shadow-lg max-w-4xl w-full p-6 grid md:grid-cols-2 gap-6 overflow-y-auto max-h-[90vh]"
      >
        <button
          type="button"
          onClick={() => setShowCheckout(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-xl font-bold"
        >
          ×
        </button>

        {/* Cart Items */}
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="mt-4 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <h3 className="text-xl font-semibold">Your Cart</h3>
          {cart.length === 0 ? (
            <p className="text-gray-400 mt-10 text-center">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center border-b border-gray-100 pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span>{formatCurrency(item.price)}</span>
                    <span className="line-through text-gray-300">
                      {formatCurrency(item.price * 1.25)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span>Qty: {item.qty}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout Form */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Checkout</h3>
          <p className="text-sm text-gray-600">
            Complete your order — demo checkout (PayU test mode).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {["firstname", "email", "address", "city", "country", "phone"].map(
              (name) => (
                <input
                  key={name}
                  required
                  name={name}
                  placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                  className="p-3 border rounded"
                  onChange={handleChange}
                />
              )
            )}
          </div>
          <button
            type="submit"
            disabled={loading || cart.length === 0}
            className={`mt-4 w-full py-3 rounded-2xl text-white font-semibold transition ${
              loading || cart.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-900 hover:bg-gray-800"
            }`}
          >
            {loading ? "Processing..." : "Pay with PayU"}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {paymentStatus === "success" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold text-green-600">
              Payment Successful 🎉
            </h2>
            <p className="mt-2">Thank you for shopping with Bagvati.</p>
            <button
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
              onClick={() => setPaymentStatus(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Failure Modal */}
      {paymentStatus === "failure" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold text-red-600">Payment Failed ❌</h2>
            <p className="mt-2">Something went wrong. Please try again.</p>
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
              onClick={() => setPaymentStatus(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
