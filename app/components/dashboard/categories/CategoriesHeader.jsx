import { Plus } from 'lucide-react';

export default function CategoriesHeader({ onCreateCategory }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <p className="text-gray-600">Organize your products into categories</p>
      </div>
      <button 
        onClick={onCreateCategory}
        className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <Plus className="h-4 w-4" />
        Add Category
      </button>
    </div>
  );
}