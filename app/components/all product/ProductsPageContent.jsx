"use client";

import { useState } from "react";
import { ProductFilters } from "./ProductFilters";
import { ProductsGrid } from "./ProductsGrid";
import { SortAndFilterBar } from "./SortAndFilterBar";
import { filterAndSortProducts } from "../../data/allproductsdata";
import { useCart } from "../../context/CartContext"; // Import useCart

export function ProductsPageContent({
  initialProducts,
  categories,
  currentLimit = "20",
}) {
  const [sortBy, setSortBy] = useState("featured");
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [0, 500],
    inStockOnly: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const { addToCart } = useCart(); // Get addToCart from context

  const filteredProducts = filterAndSortProducts(
    initialProducts,
    filters,
    sortBy
  );

  const handleAddToCart = (product) => {
    // Format product data for cart
    const cartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      originalPrice: product.price * 1.2, // Add 20% as original price
      image: product.thumbnail,
      category: product.category,
      inStock: product.stock > 0,
      maxQuantity: product.stock,
      brand: product.brand,
      description: product.description
    };
    
    addToCart(cartItem);
    // alert(`Added ${product.title} to cart!`);
  };

  return (
    <>
      <SortAndFilterBar
        sortBy={sortBy}
        onSortChange={setSortBy}
        productCount={filteredProducts.length}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        currentLimit={currentLimit}
      />

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
          <ProductFilters
            categories={categories}
            onFilterChange={setFilters}
            initialFilters={filters}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <ProductsGrid 
            products={filteredProducts} 
            onAddToCart={handleAddToCart} // Pass the updated function
          />
        </div>
      </div>
    </>
  );
}