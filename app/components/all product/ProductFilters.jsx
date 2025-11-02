"use client";

import { useState } from "react";

export function ProductFilters({
  categories,
  onFilterChange,
  initialFilters = {},
}) {
  const [filters, setFilters] = useState({
    category: initialFilters.category || "all",
    priceRange: initialFilters.priceRange || [0, 500],
    inStockOnly: initialFilters.inStockOnly || false,
  });

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button
          onClick={() => {
            const resetFilters = {
              category: "all",
              priceRange: [0, 500],
              inStockOnly: false,
            };
            setFilters(resetFilters);
            onFilterChange(resetFilters);
          }}
          className="text-sm text-purple-600 hover:text-purple-800"
        >
          Clear all
        </button>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={filters.category}
        onCategoryChange={(category) => handleFilterChange({ category })}
      />

      <PriceFilter
        priceRange={filters.priceRange}
        onPriceChange={(priceRange) => handleFilterChange({ priceRange })}
      />

      <AvailabilityFilter
        inStockOnly={filters.inStockOnly}
        onAvailabilityChange={(inStockOnly) =>
          handleFilterChange({ inStockOnly })
        }
      />
    </div>
  );
}

function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="mb-6">
      <h4 className="font-medium text-gray-900 mb-3">Category</h4>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className={`flex justify-between items-center w-full text-left px-2 py-1 rounded ${
              selectedCategory === category.value
                ? "bg-purple-100 text-purple-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span>{category.name}</span>
            <span className="text-sm text-gray-500">({category.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PriceFilter({ priceRange, onPriceChange }) {
  return (
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
            onPriceChange([priceRange[0], parseInt(e.target.value)])
          }
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
}

function AvailabilityFilter({ inStockOnly, onAvailabilityChange }) {
  return (
    <div>
      <h4 className="font-medium text-gray-900 mb-3">Availability</h4>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onAvailabilityChange(e.target.checked)}
          className="rounded text-purple-600 focus:ring-purple-500"
        />
        <span className="text-sm text-gray-600">In Stock Only</span>
      </label>
    </div>
  );
}
