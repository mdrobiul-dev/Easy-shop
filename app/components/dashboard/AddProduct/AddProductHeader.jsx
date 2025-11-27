import { X } from 'lucide-react';
import Link from 'next/link';

export default function AddProductHeader({ onReset }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600">Create a new product listing</p>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onReset}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <X className="h-4 w-4" />
          Reset Form
        </button>
        <Link 
          href="/dashboard/products"
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          Back to Products
        </Link>
      </div>
    </div>
  );
}