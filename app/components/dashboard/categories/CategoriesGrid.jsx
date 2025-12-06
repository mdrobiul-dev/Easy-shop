import { Tag, Plus } from 'lucide-react';
import CategoryCard from './CategoryCard';

export default function CategoriesGrid({ 
  categories, 
  onEdit, 
  onDelete, 
  onToggleStatus,
  onCreateCategory 
}) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
        <Tag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories found</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Try adjusting your search or create a new category to get started.
        </p>
        <button 
          onClick={onCreateCategory}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg mx-auto"
        >
          <Plus className="h-4 w-4" />
          Create Your First Category
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}