import { Tag, Edit, Trash2, MoreVertical } from 'lucide-react';

export default function CategoryCard({ category, onEdit, onDelete, onToggleStatus }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border border-green-200';
      case 'inactive': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getStatusButtonStyle = (status) => {
    return status === 'active' 
      ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' 
      : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white">
            <Tag className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-gray-500">{category.products} products</p>
          </div>
        </div>
        <div className="relative">
          <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
        {category.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(category.status)}`}>
          {category.status === 'active' ? 'Active' : 'Inactive'}
        </span>
        <span className="text-xs text-gray-500 font-medium">
          {new Date(category.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
        <button
          onClick={() => onEdit(category)}
          className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1 border border-blue-200"
        >
          <Edit className="h-3 w-3" />
          Edit
        </button>
        <button
          onClick={() => onToggleStatus(category.id)}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1 border ${getStatusButtonStyle(category.status)}`}
        >
          {category.status === 'active' ? 'Deactivate' : 'Activate'}
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 border border-transparent hover:border-red-200"
          title="Delete Category"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}