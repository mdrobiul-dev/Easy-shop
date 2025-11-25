import { Star } from 'lucide-react';

export default function TopProducts({ products }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Products</h3>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.name} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">{index + 1}</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-500">{product.rating}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{product.sales} sales</p>
              <p className="text-sm text-gray-500">${product.revenue.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}