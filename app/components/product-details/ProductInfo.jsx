"use client";

import Link from "next/link";

export function ProductInfo({ 
  product, 
  quantity, 
  onIncrement, 
  onDecrement, 
  onAddToCart, 
  onBuyNow 
}) {
 
  const originalPrice = product.discountPercentage > 0 
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <div className="space-y-6">
      <div>
        <span className="text-sm text-purple-600 font-medium capitalize">
          {product.category}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">
          {product.title}
        </h1>
        <div className="flex items-center mt-2">
          <div className="flex text-yellow-400">
            {"★".repeat(Math.floor(product.rating))}
            {"☆".repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {product.rating} ({product.reviews?.length || 0} reviews)
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-3xl font-bold text-gray-900">
          ${product.price}
        </span>
        {originalPrice && (
          <>
            <span className="text-xl text-gray-500 line-through">
              ${originalPrice}
            </span>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
              {product.discountPercentage}% OFF
            </span>
          </>
        )}
      </div>

      <p className="text-gray-600 leading-relaxed">
        {product.description}
      </p>

     
      <div className="flex items-center space-x-2">
        <span className={`text-sm font-medium ${
          product.stock > 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </span>
        {product.stock > 0 && (
          <span className="text-sm text-gray-500">
            ({product.stock} available)
          </span>
        )}
      </div>

     
      {product.brand && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Brand</h3>
          <span className="text-gray-600">{product.brand}</span>
        </div>
      )}

     
      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={onDecrement}
            disabled={quantity <= 1}
            className="px-4 py-2 text-gray-600 hover:text-gray-700 disabled:opacity-50"
          >
            -
          </button>
          <span className="px-4 py-2 border-l border-r border-gray-300 min-w-12 text-center">
            {quantity}
          </span>
          <button
            onClick={onIncrement}
            className="px-4 py-2 text-gray-600 hover:text-gray-700"
          >
            +
          </button>
        </div>

        <div className="flex space-x-3 flex-1">
          <button
            onClick={onAddToCart}
            disabled={product.stock <= 0}
            className={`flex-1 px-8 py-3 rounded-lg font-medium transition duration-300 ${
              product.stock > 0
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
          <button
            onClick={onBuyNow}
            disabled={product.stock <= 0}
            className={`flex-1 px-8 py-3 rounded-lg font-medium transition duration-300 ${
              product.stock > 0
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Buy Now
          </button>
        </div>
      </div>

    
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Product Details
        </h3>
        <ul className="space-y-2">
          {product.sku && (
            <li className="flex justify-between">
              <span className="text-gray-600">SKU:</span>
              <span className="text-gray-900">{product.sku}</span>
            </li>
          )}
          {product.weight && (
            <li className="flex justify-between">
              <span className="text-gray-600">Weight:</span>
              <span className="text-gray-900">{product.weight} units</span>
            </li>
          )}
          {product.warrantyInformation && (
            <li className="flex justify-between">
              <span className="text-gray-600">Warranty:</span>
              <span className="text-gray-900">{product.warrantyInformation}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}