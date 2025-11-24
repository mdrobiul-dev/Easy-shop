"use client";

import { Edit, Trash2, Eye, Package } from 'lucide-react';
import { STATUS_COLORS } from '../../components/dashboard/';

export default function ProductList({ products, onDeleteProduct }) {
  const getStockColor = (stock) => {
    if (stock === 0) return 'text-red-600';
    if (stock < 10) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
        <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600 mb-4">
          No products match your current filters. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">
            Products ({products.length})
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Sort by:</span>
            <select className="border-0 bg-transparent focus:outline-none focus:ring-0">
              <option>Newest</option>
              <option>Name</option>
              <option>Price</option>
              <option>Sales</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="divide-y divide-gray-200">
        {products.map((product) => (
          <ProductListItem 
            key={product.id} 
            product={product} 
            onDelete={onDeleteProduct}
            getStockColor={getStockColor}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="px-4 sm:px-6 py-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-600 mb-2 sm:mb-0">
            Showing 1 to {products.length} of {products.length} results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Extracted Product List Item Component
function ProductListItem({ product, onDelete, getStockColor }) {
  return (
    <div className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 hover:text-purple-600 cursor-pointer line-clamp-1">
                {product.name}
              </h4>
              <p className="text-sm text-gray-600 mt-1">{product.category}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                <span className="text-base sm:text-lg font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className={`text-sm font-medium ${getStockColor(product.stock)}`}>
                  {product.stock} in stock
                </span>
                <span className="text-sm text-gray-600">
                  {product.sales} sales
                </span>
              </div>
            </div>

            {/* Status & Actions */}
            <div className="flex items-center justify-between sm:justify-end mt-2 sm:mt-0 sm:space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[product.status]}`}>
                {product.status}
              </span>
              
              <div className="flex items-center space-x-1 ml-2">
                <button className="p-1 sm:p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-1 sm:p-2 text-gray-400 hover:text-green-600 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => onDelete(product.id)}
                  className="p-1 sm:p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}