"use client";

import { useCart } from "../../context/CartContext"; // Import if needed

export function ProductInfo({ 
  product, 
  quantity, 
  onIncrement, 
  onDecrement, 
  onAddToCart, 
  onBuyNow 
}) {
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
          <div className="flex text-yellow-400 text-sm">
            {"★".repeat(Math.floor(product.rating))}
            {"☆".repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            ({product.rating}) • {product.reviews?.length || 0} reviews
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-3xl font-bold text-gray-900">
            ${product.price}
          </span>
          {product.discountPercentage > 0 && (
            <>
              <span className="text-lg text-gray-500 line-through">
                $
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                {product.discountPercentage}% OFF
              </span>
            </>
          )}
        </div>
        <p className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
        <p className="text-gray-600 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Quantity:</span>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={onDecrement}
              disabled={quantity <= 1}
              className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <span className="px-4 py-2 border-x border-gray-300 min-w-12 text-center">
              {quantity}
            </span>
            <button
              onClick={onIncrement}
              disabled={quantity >= product.stock}
              className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onAddToCart}
            disabled={product.stock <= 0}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition duration-300 ${
              product.stock > 0
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>
          <button
            onClick={onBuyNow}
            disabled={product.stock <= 0}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition duration-300 ${
              product.stock > 0
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}