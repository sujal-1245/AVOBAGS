export default function formatCurrency(n) {
  const num = Number(n);
  if (isNaN(num)) return "₹0.00";
  return num.toLocaleString("en-IN", { style: "currency", currency: "INR" });
}