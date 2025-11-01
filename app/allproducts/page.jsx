"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState("featured");
  const [filterCategory, setFilterCategory] = useState("all");
  const [apiproduct, setapiproduct] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock products data
  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 99.99,
      originalPrice: 149.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      category: "Electronics",
      rating: 4.5,
      reviews: 128,
      featured: true,
      inStock: true,
    },
    {
      id: 2,
      name: "Running Shoes",
      price: 129.99,
      originalPrice: 159.99,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      category: "Footwear",
      rating: 4.3,
      reviews: 89,
      featured: true,
      inStock: true,
    },
    {
      id: 3,
      name: "Smart Watch",
      price: 199.99,
      originalPrice: 249.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      category: "Electronics",
      rating: 4.7,
      reviews: 256,
      featured: true,
      inStock: true,
    },
    {
      id: 4,
      name: "Backpack",
      price: 79.99,
      originalPrice: 99.99,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      category: "Accessories",
      rating: 4.2,
      reviews: 67,
      featured: false,
      inStock: true,
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      price: 59.99,
      originalPrice: 79.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
      category: "Electronics",
      rating: 4.4,
      reviews: 142,
      featured: false,
      inStock: true,
    },
    {
      id: 6,
      name: "Fitness Tracker",
      price: 49.99,
      originalPrice: 69.99,
      image:
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop",
      category: "Electronics",
      rating: 4.1,
      reviews: 93,
      featured: false,
      inStock: true,
    },
    {
      id: 7,
      name: "Gaming Mouse",
      price: 39.99,
      originalPrice: 49.99,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
      category: "Electronics",
      rating: 4.6,
      reviews: 178,
      featured: false,
      inStock: false,
    },
    {
      id: 8,
      name: "Desk Lamp",
      price: 29.99,
      originalPrice: 39.99,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
      category: "Home",
      rating: 4.0,
      reviews: 54,
      featured: false,
      inStock: true,
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://api.freeapi.app/api/v1/public/randomproducts"
        );
        const products = await res.json();
        setapiproduct(products.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log(apiproduct);

  const categories = [
    { name: "All", value: "all", count: products.length },
    {
      name: "Electronics",
      value: "electronics",
      count: products.filter((p) => p.category.toLowerCase() === "electronics")
        .length,
    },
    {
      name: "Footwear",
      value: "footwear",
      count: products.filter((p) => p.category.toLowerCase() === "footwear")
        .length,
    },
    {
      name: "Accessories",
      value: "accessories",
      count: products.filter((p) => p.category.toLowerCase() === "accessories")
        .length,
    },
    {
      name: "Home",
      value: "home",
      count: products.filter((p) => p.category.toLowerCase() === "home").length,
    },
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const categoryMatch =
        filterCategory === "all" ||
        product.category.toLowerCase() === filterCategory;
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && priceMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return b.featured - a.featured;
      }
    });

  const addToCart = (product) => {
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600">
                Shop<span className="text-purple-800">Easy</span>
              </h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Home
              </Link>
              <Link href="/allproducts" className="text-purple-600 font-medium">
                Products
              </Link>
              <Link
                href="/categories"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Categories
              </Link>
              <Link
                href="/deals"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Deals
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-purple-600">
                🔍
              </button>
              <button className="text-gray-700 hover:text-purple-600">
                👤
              </button>
              <button className="text-gray-700 hover:text-purple-600 relative">
                🛒
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-purple-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">All Products</span>
        </nav>
      </div>

      {/* Page Header */}
      <div className="container mx-auto px-4 py-2">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
        </div>

        {/* Filters and Sorting Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-white border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <span>☰</span>
              Filters
            </button>
            <span className="text-gray-600">
              {filteredProducts.length} products found
            </span>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-64 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-24`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => {
                  setFilterCategory("all");
                  setPriceRange([0, 500]);
                }}
                className="text-sm text-purple-600 hover:text-purple-800"
              >
                Clear all
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setFilterCategory(category.value)}
                    className={`flex justify-between items-center w-full text-left px-2 py-1 rounded ${
                      filterCategory === category.value
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-sm text-gray-500">
                      ({category.count})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Availability Filter */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Availability</h4>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded text-purple-600 focus:ring-purple-500"
                  defaultChecked
                />
                <span className="text-sm text-gray-600">In Stock Only</span>
              </label>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to see more products.
                </p>
                <button
                  onClick={() => {
                    setFilterCategory("all");
                    setPriceRange([0, 500]);
                  }}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
                  >
                    <Link href={`/allproducts/${product.id}`}>
                      <div className="h-48 bg-gray-200 overflow-hidden relative">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover hover:scale-105 transition duration-300"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                        />
                        {!product.inStock && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                            Out of Stock
                          </div>
                        )}
                        {product.originalPrice > product.price && (
                          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                            Save $
                            {(product.originalPrice - product.price).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-4">
                      <span className="text-sm text-purple-600 font-medium">
                        {product.category}
                      </span>
                      <Link href={`/allproducts/${product.id}`}>
                        <h3 className="text-lg font-semibold mt-1 hover:text-purple-600 transition duration-300">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center mt-2">
                        <div className="flex text-yellow-400 text-sm">
                          {"★".repeat(Math.floor(product.rating))}
                          {"☆".repeat(5 - Math.floor(product.rating))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          ({product.reviews})
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <span className="text-xl font-bold text-gray-900">
                            ${product.price}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                          className={`px-4 py-2 rounded-lg font-medium transition duration-300 ${
                            product.inStock
                              ? "bg-purple-600 text-white hover:bg-purple-700"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition duration-300 font-medium">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}                                                  
