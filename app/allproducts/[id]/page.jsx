import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductDetailsContent } from "../../components/product-details/ProductDetailsContent";
import Link from "next/link";

async function getProduct(id) {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    // console.log('Fetching product with ID:', id);
    
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch product');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function getRelatedProducts(category, currentProductId) {
  try {
    const res = await fetch(`https://dummyjson.com/products/category/${category}`, {
      next: { revalidate: 3600 }
    });
    const data = await res.json();
    
   
    return data.products
      .filter(product => product.id !== currentProductId)
      .slice(0, 3);
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}


export default async function ProductDetailsPage({ params }) {
  
  const { id } = await params;
  
  // console.log('Received product ID:', id);

  const product = await getProduct(id);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb product={product} />
      
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<ProductDetailsSkeleton />}>
          <ProductDetailsContent 
            product={product} 
            relatedProducts={relatedProducts} 
          />
        </Suspense>
      </div>
    </div>
  );
}

// Server components for static parts
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

function Breadcrumb({ product }) {
  return (
    <div className="container mx-auto px-4 py-4">
      <nav className="flex text-sm text-gray-500">
        <Link href="/" className="hover:text-purple-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/allproducts" className="hover:text-purple-600">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 truncate capitalize">{product.category}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900 truncate">{product.title}</span>
      </nav>
    </div>
  );
}

function ProductDetailsSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-md animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4"></div>
          <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}