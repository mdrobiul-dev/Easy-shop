"use client";

import { useState } from "react";
import { ProductFilters } from "./ProductFilters";
import { ProductsGrid } from "./ProductsGrid";
import { SortAndFilterBar } from "./SortAndFilterBar";
import { filterAndSortProducts } from "../../data/allproductsdata";

export function ProductsPageContent({ initialProducts, categories, currentLimit = "20" }) {
  const [sortBy, setSortBy] = useState("featured");
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [0, 500],
    inStockOnly: false
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = filterAndSortProducts(initialProducts, filters, sortBy);

  const addToCart = (product) => {
    alert(`Added ${product.title} to cart!`);
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
            onAddToCart={addToCart} 
          />
        </div>
      </div>
    </>
  );
}