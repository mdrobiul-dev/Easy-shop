import Link from 'next/link';
import React, { useState } from 'react'

const Header = ({cartCount}) => {
     const [isMenuOpen, setIsMenuOpen] = useState(false);
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
              <Link
                href="/about"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                About
              </Link>
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
                <button className="absolute right-3 top-2 text-gray-500 hover:text-purple-600">
                  🔍
                </button>
              </div>

              {/* Icons - UPDATED SECTION */}
              <div className="flex items-center space-x-4">
                <button className="text-gray-700 hover:text-purple-600">
                  🔍
                </button>
                
                {/* Replace the user icon with actual auth links */}
                <Link href="/auth/login" className="text-gray-700 hover:text-purple-600">
                  👤
                </Link>
                
                <button className="text-gray-700 hover:text-purple-600 relative">
                  🛒
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
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
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-purple-600 font-medium"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-purple-600 font-medium"
                >
                  Contact
                </Link>
                {/* Add auth links to mobile menu too */}
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-purple-600 font-medium"
                >
                  Sign In
                </Link>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button className="absolute right-3 top-2 text-gray-500">
                    🔍
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
  )
}

export default Header