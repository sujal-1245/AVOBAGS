import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & mission */}
        <div>
          <h3 className="text-xl font-bold">AVOBAGS</h3>
          <p className="mt-3 text-sm text-gray-600">
            Premium bags for professionals, students, and travelers. Built to
            last with timeless design.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Links</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
            <li><Link to="/shop" className="text-gray-600 hover:text-gray-900">Shop</Link></li>
            <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
            <li><Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>Email: hi@AVOBAGS.demo</li>
            <li>Phone: +91 98765 43210</li>
            <li>Address: Mumbai, India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} AVOBAGS. All rights reserved.
      </div>
    </footer>
  );
}
