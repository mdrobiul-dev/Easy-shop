import { Package, Edit, Eye, Trash2 } from 'lucide-react';

export default function ProductRow({ product, onEdit, onDelete, getStatusColor }) {
  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'In Stock';
      case 'out-of-stock': return 'Out of Stock';
      case 'draft': return 'Draft';
      default: return status;
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 shrink-0 bg-gray-200 rounded-lg flex items-center justify-center">
            <Package className="h-5 w-5 text-gray-400" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {product.name}
            </div>
            <div className="text-sm text-gray-500">
              ID: {product.id}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {product.category}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ${product.price}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {product.stock}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
          {getStatusText(product.status)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {product.sales}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(product)}
            className="text-blue-600 hover:text-blue-900 transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button className="text-green-600 hover:text-green-900 transition-colors">
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="text-red-600 hover:text-red-900 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}