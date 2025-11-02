import { Suspense } from "react";
import Link from "next/link";
import { products } from "../data/data";
import { categories } from "../data/allproductsdata";
import { ProductsPageContent } from "../components/all product/ProductsPageContent";


async function getProducts() {
  try {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    
    // Return the products array, not the entire response object
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return empty array as fallback
  }
}

export default async function ProductsPage() {
  const products = await getProducts();
  console.log('product', products);
  
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb />
      
      <div className="container mx-auto px-4 py-2">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
        </div>

        <Suspense fallback={<div>Loading products...</div>}>
          <ProductsPageContent 
            initialProducts={products} 
            categories={categories} 
          />
        </Suspense>
      </div>
    </div>
  );
}


function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-purple-600">
              Shop<span className="text-purple-800">Easy</span>
            </h1>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium">
              Home
            </Link>
            <Link href="/allproducts" className="text-purple-600 font-medium">
              Products
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-purple-600 font-medium">
              Categories
            </Link>
            <Link href="/deals" className="text-gray-700 hover:text-purple-600 font-medium">
              Deals
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-purple-600">🔍</button>
            <button className="text-gray-700 hover:text-purple-600">👤</button>
            <button className="text-gray-700 hover:text-purple-600 relative">🛒</button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Breadcrumb() {
  return (
    <div className="container mx-auto px-4 py-4">
      <nav className="flex text-sm text-gray-500">
        <Link href="/" className="hover:text-purple-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">All Products</span>
      </nav>
    </div>
  );
}