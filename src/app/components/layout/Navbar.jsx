"use client";
import { useState, useEffect } from "react";
import { Search, Heart, ShoppingBag, Menu, X, User } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NAV_LINKS } from "../../data/headerData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { itemCount } = useCart();
  const { ids } = useWishlist();
  const navigate = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      query.trim()
        ? `/products?q=${encodeURIComponent(query.trim())}`
        : "/products",
    );
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 glass transition-shadow duration-300 ${
        scrolled
          ? "shadow-soft border-b border-gray-100"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-app bg-white">
        <div className="flex items-center justify-between gap-4 h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-app-sm bg-primary-600 flex items-center justify-center shadow-glow-primary">
              <span className="text-white font-black text-lg">V</span>
            </div>
            <span className="text-xl font-extrabold text-secondary-700 tracking-tight">
              Vela
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                href={link.to || ""}
                className="px-4 py-2 rounded-full text-sm font-semibold text-secondary-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md"
          >
            <div className="relative w-full">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search for products, brands..."
                className="input-field rounded-full! pl-10! bg-gray-50 border-transparent focus:bg-white"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              className="hidden sm:flex btn-ghost-icon"
              aria-label="Account"
            >
              <User size={19} className="text-secondary-600" />
            </button>
            <Link
              href="/wishlist-info"
              onClick={(e) => e.preventDefault()}
              className="relative btn-ghost-icon"
              aria-label="Wishlist"
            >
              <Heart size={19} className="text-secondary-600" />
              {ids.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4.5 px-1 h-4.5 rounded-full bg-accent-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {ids.length}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative btn-ghost-icon"
              aria-label="Cart"
            >
              <ShoppingBag size={19} className="text-secondary-600" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4.5 px-1 h-4.5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              className="lg:hidden btn-ghost-icon"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="container-app pb-4 flex flex-col gap-3 border-t border-gray-100 pt-4">
          <form onSubmit={handleSearch} className="relative">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search products..."
              className="input-field rounded-full! pl-10! bg-gray-50"
            />
          </form>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              href={link.to || ""}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-secondary-600 hover:bg-primary-50 hover:text-primary-600"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
