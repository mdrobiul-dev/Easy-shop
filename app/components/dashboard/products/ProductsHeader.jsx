import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function ProductsHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-600">Manage your product inventory and listings</p>
      </div>
      <Link href="/dashboard/products/addproduct">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </Link>
    </div>
  );
}