"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { Search, User, ShoppingCart, ChevronDown } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600">
                Shop<span className="text-purple-800">Easy</span>
              </h1>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Home
            </Link>
            <Link
              href="/allproducts"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Products
            </Link>
            <Link
              href="/deals"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Deals
            </Link>
         
            <div className="relative group flex items-center">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 font-medium">
                <span>About</span>
                <ChevronDown
                  size={18}
                  className="transition-transform duration-200 group-hover:rotate-180"
                />
              </button>

              {/* Invisible hover buffer */}
              <div className="absolute left-0 w-full h-4 bg-transparent group-hover:block hidden"></div>

              {/* Dropdown */}
              <div className="absolute left-0 top-full mt-0 hidden group-hover:block bg-white shadow-lg border border-gray-200 rounded-lg w-48 z-50">
                <Link
                  href="/about/company"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  About Company
                </Link>
                <Link
                  href="/about/client"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  About Clients
                </Link>
                <Link
                  href="/about/location"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  About Location
                </Link>
              </div>
            </div>
          

            <Link
              href="/contact"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:flex relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
              />
              <button className="absolute right-3 top-2 text-gray-500 hover:text-purple-600 cursor-pointer">
                <Search size={25} />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {/* User Section - Always show Sign In */}
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-purple-600 cursor-pointer flex items-center space-x-1"
              >
                <User size={25} />
                <span className="hidden md:block">Sign In</span>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <button className="text-gray-700 hover:text-purple-600 relative cursor-pointer">
                  <ShoppingCart size={25} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-purple-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/allproducts"
                className="text-gray-700 hover:text-purple-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/deals"
                className="text-gray-700 hover:text-purple-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Deals
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-purple-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-purple-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Search Bar */}
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button className="absolute right-3 top-2 text-gray-500">
                  <Search size={20} />
                </button>
              </div>

              {/* Always show Sign In in mobile */}
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-purple-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
