"use client";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import Footer from "./components/Footer";

export default function LandingPage() {
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$99.99",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      category: "Electronics",
    },
    {
      id: 2,
      name: "Running Shoes",
      price: "$129.99",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      category: "Footwear",
    },
    {
      id: 3,
      name: "Smart Watch",
      price: "$199.99",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      category: "Electronics",
    },
    {
      id: 4,
      name: "Backpack",
      price: "$79.99",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      category: "Accessories",
    },
  ];

  const categories = [
    { name: "Electronics", icon: "📱", count: "120+ items" },
    { name: "Fashion", icon: "👕", count: "300+ items" },
    { name: "Home & Garden", icon: "🏠", count: "80+ items" },
    { name: "Sports", icon: "⚽", count: "150+ items" },
  ];

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600">
                Shop<span className="text-purple-800">Easy</span>
              </h1>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Categories
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Deals
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Contact
              </a>
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

              {/* Icons */}
              <div className="flex space-x-4">
                <button className="text-gray-700 hover:text-purple-600">
                  👤
                </button>
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
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 font-medium"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 font-medium"
                >
                  Categories
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 font-medium"
                >
                  Deals
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 font-medium"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 font-medium"
                >
                  Contact
                </a>
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

      {/* Hero Section */}
      <section className="bg-linear-to-r from-purple-600 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">Summer Sale is Live!</h1>
            <p className="text-xl mb-8 text-purple-100">
              Get up to 50% off on all products. Limited time offer. Dont miss
              out!
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition duration-300">
                Shop Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link 
        href="/allproducts"
        className="text-purple-600 font-semibold hover:text-purple-800 transition duration-300"
      >
        View All →
      </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="text-sm text-purple-600 font-medium">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-semibold mt-1">{product.name}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-gray-800">
                      {product.price}
                    </span>
                    <button
                      onClick={addToCart}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get the latest updates on new products and upcoming sales
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-purple-600 text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-purple-700 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
