"use client";

import Image from "next/image";
import Link from "next/link";

export function ProductsGrid({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">😔</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-gray-600 mb-4">
          Try adjusting your filters to see more products.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
      
      {/* Load More Button */}
      <div className="text-center mt-12">
        <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition duration-300 font-medium">
          Load More Products
        </button>
      </div>
    </>
  );
}

function ProductCard({ product, onAddToCart }) {
  // Use thumbnail as the main image, fallback to first image if thumbnail doesn't exist
  const imageUrl = product.thumbnail || (product.images && product.images[0]) || null;
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
      <Link href={`/allproducts/${product.id}`}>
        <div className="h-48 bg-gray-200 overflow-hidden relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.title || product.name} // Use title from API
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover hover:scale-105 transition duration-300"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          
          {product.stock <= 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              Out of Stock
            </div>
          )}
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
              {product.discountPercentage}% OFF
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
            {product.title} {/* API uses 'title' not 'name' */}
          </h3>
        </Link>
        <div className="flex items-center mt-2">
          <div className="flex text-yellow-400 text-sm">
            {"★".repeat(Math.floor(product.rating))}
            {"☆".repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            ({product.rating})
          </span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.discountPercentage > 0 && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock <= 0}
            className={`px-4 py-2 rounded-lg font-medium transition duration-300 ${
              product.stock > 0
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}