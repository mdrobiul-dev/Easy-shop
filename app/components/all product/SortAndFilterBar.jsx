"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { LimitSelector } from "../../components/all product/LimitSelector";

export function SortAndFilterBar({ 
  sortBy, 
  onSortChange, 
  productCount, 
  showFilters, 
  onToggleFilters,
  currentLimit 
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSortChange = (newSortBy) => {
    // Create new URL with updated sort but preserve page
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSortBy);
    // Reset to page 1 when changing sort to avoid empty pages
    params.set('page', '1');
    
    // Update URL
    router.push(`?${params.toString()}`, { scroll: false });
    
    // Call the original onSortChange to update local state
    onSortChange(newSortBy);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleFilters}
          className="lg:hidden bg-white border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <span>☰</span>
          Filters
        </button>
        <span className="text-gray-600">{productCount} products found</span>
      </div>

      <div className="flex items-center gap-4">
        <LimitSelector currentLimit={currentLimit} />
        
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
    </div>
  );
}