"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductFilters } from "./ProductFilters";
import { ProductsGrid } from "./ProductsGrid";
import { SortAndFilterBar } from "./SortAndFilterBar";
import { Pagination } from "./Pagination";
import { filterAndSortProducts } from "../../data/allproductsdata";
import { useCart } from "../../context/CartContext";

export function ProductsPageContent({
  initialProducts,
  categories,
  currentLimit = "20",
  currentPage = 1,
  totalPages = 1,
  totalProducts = 0
}) {
  const searchParams = useSearchParams();
  const urlSort = searchParams.get('sort') || "featured";
  
  const [sortBy, setSortBy] = useState(urlSort);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [0, 500],
    inStockOnly: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const { addToCart } = useCart();

  // Sync local state with URL params
  useEffect(() => {
    const urlSort = searchParams.get('sort');
    if (urlSort && urlSort !== sortBy) {
      setSortBy(urlSort);
    }
  }, [searchParams, sortBy]);

  const filteredProducts = filterAndSortProducts(
    initialProducts,
    filters,
    sortBy
  );

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      originalPrice: product.price * 1.2,
      image: product.thumbnail,
      category: product.category,
      inStock: product.stock > 0,
      maxQuantity: product.stock,
      brand: product.brand,
      description: product.description
    };
    
    addToCart(cartItem);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  return (
    <>
      <SortAndFilterBar
        sortBy={sortBy}
        onSortChange={handleSortChange}
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
            onAddToCart={handleAddToCart}
          />
          
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalProducts={totalProducts}
            limit={currentLimit}
          />
        </div>
      </div>
    </>
  );
}