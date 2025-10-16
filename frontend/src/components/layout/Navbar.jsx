import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import IconBag from "../IconBag";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Navbar({
  query,
  setQuery,
  sort,
  setSort,
  cart,
  setShowCart,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const isShopPage = location.pathname === "/shop";
  const [theme, setTheme] = useState("light");
  const [showMenu, setShowMenu] = useState(false); // dropdown for profile
  const [mobileNavOpen, setMobileNavOpen] = useState(false); // hamburger menu
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);

  // Load user + theme
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");

    const storedUser = localStorage.getItem("loggedInUsername");
    const profilePhoto = localStorage.getItem("profilePhoto");
    if (storedUser) {
      setUser({
        username: storedUser,
        photo: profilePhoto || "/default-avatar.jpg",
      });
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    window.dispatchEvent(new CustomEvent("themeChanged", { detail: newTheme }));
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUsername");
    localStorage.removeItem("loggedInPassword");
    localStorage.removeItem("profilePhoto");
    setUser(null);
    setShowMenu(false);
    setMobileNavOpen(false);
    navigate("/");
  };

  return (
    <header className="backdrop-blur-md bg-white/70 dark:bg-black/40 sticky top-0 z-40 transition-all duration-300 border-b border-gray-200 dark:border-zinc-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="rounded-md dark:text-black text-white dark:bg-white bg-black shadow-sm p-2 border border-gray-100 dark:border-zinc-700">
            <IconBag />
          </div>
          <div className="text-xl text-black dark:text-white font-semibold">
            AVOBAGS
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden sm:flex gap-6 text-sm text-gray-600 dark:text-gray-50">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-gray-900 dark:text-white"
                : "hover:text-gray-900 dark:hover:text-white hover:font-bold"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/newlp"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-gray-900 dark:text-white"
                : "hover:text-gray-900 dark:hover:text-white hover:font-bold"
            }
          >
            newHome
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-gray-900 dark:text-white"
                : "hover:text-gray-900 dark:hover:text-white hover:font-bold"
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-gray-900 dark:text-white"
                : "hover:text-gray-900 dark:hover:text-white hover:font-bold"
            }
          >
            About
          </NavLink>
        </nav>

        {/* Search + Sort (only on /shop, hidden on small screens) */}
        {isShopPage && (
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="flex items-center gap-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-2 shadow-sm w-full">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bags, totes, backpacks, travel..."
                className="w-full outline-none text-sm px-2 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent text-black dark:text-white"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm bg-transparent outline-none text-black dark:text-white"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </div>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:shadow-sm"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-gray-700" />
            )}
          </button>

          {/* Cart (only on /shop) */}
          {isShopPage && (
            <button
              onClick={() => setShowCart(true)}
              className="relative bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2 shadow-sm hover:shadow"
            >
              <div className="flex items-center text-black dark:text-white gap-2">
                <IconBag />
                <div className="text-sm">Cart</div>
                <div className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                  ({cart.reduce((s, i) => s + i.qty, 0)})
                </div>
              </div>
            </button>
          )}

          {/* Desktop Profile / Login */}
          <div className="relative hidden sm:block" ref={dropdownRef}>
            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90"
              >
                Login
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowMenu((prev) => !prev)}
                  className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-zinc-700"
                >
                  <img
                    src={user.photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </button>
                {showMenu && (
                  <div className="absolute right-0 mt-3 w-40 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg overflow-hidden z-50">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setShowMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-zinc-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Hamburger for Mobile */}
          <button
            onClick={() => setMobileNavOpen((prev) => !prev)}
            className="sm:hidden p-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
          >
            {mobileNavOpen ? (
              <X size={20} className="text-black dark:text-white" />
            ) : (
              <Menu size={20} className="text-black dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileNavOpen && (
        <div className="sm:hidden backdrop-blur-md bg-white/80 dark:bg-black/60 border-t border-gray-200 dark:border-zinc-700">
          <nav className="flex flex-col gap-3 px-6 py-4 text-gray-700 dark:text-gray-200">
            <NavLink to="/" onClick={() => setMobileNavOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/newlp" onClick={() => setMobileNavOpen(false)}>
              newHome
            </NavLink>
            <NavLink to="/shop" onClick={() => setMobileNavOpen(false)}>
              Shop
            </NavLink>
            <NavLink to="/about" onClick={() => setMobileNavOpen(false)}>
              About
            </NavLink>

            {/* Profile or Login for Mobile */}
            <div className="border-t border-gray-200 dark:border-zinc-700 mt-2 pt-3">
              {!user ? (
                <button
                  onClick={() => {
                    navigate("/login");
                    setMobileNavOpen(false);
                  }}
                  className="w-full py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90"
                >
                  Login
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setMobileNavOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileNavOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-zinc-700"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
