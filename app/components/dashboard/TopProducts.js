'use client';

import { Star, TrendingUp, TrendingDown } from 'lucide-react';

export default function TopProducts({ products }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
        <div className="text-sm text-gray-500">
          By revenue
        </div>
      </div>
      
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.name} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-sm">
                  #{index + 1}
                </div>
                {product.trend === 'up' ? (
                  <TrendingUp className="absolute -top-1 -right-1 h-4 w-4 text-green-500 bg-white rounded-full p-0.5" />
                ) : (
                  <TrendingDown className="absolute -top-1 -right-1 h-4 w-4 text-red-500 bg-white rounded-full p-0.5" />
                )}
              </div>
              
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-600">{product.sales} sold</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-gray-900">${product.revenue.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Revenue</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}