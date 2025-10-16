import { useState } from "react";
import toast from "react-hot-toast";

export default function useCart() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((c) => {
      const exists = c.find((it) => it.id === product.id);
      if (exists) {
        toast.success(`${product.name} quantity updated`, { id: `update-${product.id}` });
        return c.map((it) => (it.id === product.id ? { ...it, qty: it.qty + 1 } : it));
      }
      toast.success(`${product.name} added to cart`, { id: `add-${product.id}` });
      return [...c, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    setCart((c) => {
      const updated = c.map((it) => (it.id === id ? { ...it, qty } : it)).filter((it) => it.qty > 0);
      const product = c.find((p) => p.id === id);
      if (qty === 0) toast(`${product.name} removed from cart`, { id: `remove-${id}` });
      else toast(`${product.name} quantity updated`, { id: `update-${id}` });
      return updated;
    });
  };

  const removeFromCart = (id) => {
    setCart((c) => {
      const product = c.find((p) => p.id === id);
      toast(`${product.name} removed from cart`, { id: `remove-${id}` });
      return c.filter((it) => it.id !== id);
    });
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return { cart, addToCart, updateQty, removeFromCart, subtotal, setCart };
}
