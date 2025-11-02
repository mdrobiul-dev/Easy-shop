"use client";

export function SortAndFilterBar({ 
  sortBy, 
  onSortChange, 
  productCount, 
  showFilters, 
  onToggleFilters 
}) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleFilters}
          className="lg:hidden bg-white border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <span>☰</span>
          Filters
        </button>
        <span className="text-gray-600">{productCount} products found</span>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-sm text-gray-600">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
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
  );
}