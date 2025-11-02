import { Suspense } from "react";
import Link from "next/link";
import { ProductsPageContent } from "../components/all product/ProductsPageContent";
import { LimitSelector } from "../components/all product/LimitSelector";

async function getProducts(limit = 20) {
  try {
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();

    return data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function getCategories(products) {
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(categoryCounts).map(([category, count]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: category.toLowerCase(),
    count: count,
  }));
}

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const limit = params.limit || "20";

  const products = await getProducts(limit);
  const categories = await getCategories(products);

  console.log(`Fetching ${limit} products`);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb />

      <div className="container mx-auto px-4 py-2">
        <PageHeader />

        <Suspense fallback={<ProductsLoadingSkeleton />}>
          <ProductsPageContent
            initialProducts={products}
            categories={categories}
            currentLimit={limit}
          />
        </Suspense>
      </div>
    </div>
  );
}

function PageHeader({ limit }) {
  return (
    <div className="text-center mb-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">All Products</h1>
    </div>
  );
}

function ProductsLoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-8">
        <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-40 animate-pulse"></div>
      </div>
      <div className="flex gap-8">
        <div className="hidden lg:block w-64">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-4 space-y-3"
              >
                <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
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
            <Link
              href="/"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Home
            </Link>
            <Link href="/allproducts" className="text-purple-600 font-medium">
              Products
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Categories
            </Link>
            <Link
              href="/deals"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Deals
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-purple-600">🔍</button>
            <button className="text-gray-700 hover:text-purple-600">👤</button>
            <button className="text-gray-700 hover:text-purple-600 relative">
              🛒
            </button>
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
        <Link href="/" className="hover:text-purple-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">All Products</span>
      </nav>
    </div>
  );
}
