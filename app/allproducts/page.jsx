import { Suspense } from "react";
import Link from "next/link";
import { ProductsPageContent } from "../components/all product/ProductsPageContent";
import Header from "../components/home/Header"; 

async function getProducts(limit = 20, skip = 0) {
  try {
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();

    return {
      products: data.products || [],
      total: data.total || 0,
      skip: data.skip || 0,
      limit: data.limit || 20
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], total: 0, skip: 0, limit: 20 };
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
  const page = parseInt(params.page) || 1;
  

  const skip = (page - 1) * parseInt(limit);

  const { products, total } = await getProducts(limit, skip);
  const categories = await getCategories(products);


  const totalPages = Math.ceil(total / parseInt(limit));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb />

      <div className="container mx-auto px-4 py-2">
        <PageHeader 
          totalProducts={total}
          currentPage={page}
          limit={limit}
        />

        <Suspense fallback={<ProductsLoadingSkeleton />}>
          <ProductsPageContent
            initialProducts={products}
            categories={categories}
            currentLimit={limit}
            currentPage={page}
            totalPages={totalPages}
            totalProducts={total}
          />
        </Suspense>
      </div>
    </div>
  );
}

function PageHeader({ totalProducts, currentPage, limit }) {
  const startItem = (currentPage - 1) * parseInt(limit) + 1;
  const endItem = Math.min(currentPage * parseInt(limit), totalProducts);

  return (
    <div className="text-center mb-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">All Products</h1>
      <p className="text-gray-600">
        Showing {startItem}-{endItem} of {totalProducts} products
      </p>
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