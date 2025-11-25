"use client";

export default function SalesChart({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales Overview</h3>
      <div className="h-80 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">📊</span>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Sales Chart</h4>
          <p className="text-gray-500 text-sm">
            Chart visualization would be implemented here
          </p>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              Total Revenue: <strong>${data.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}</strong>
            </p>
            <p className="text-xs text-gray-600">
              Total Orders: <strong>{data.reduce((sum, item) => sum + item.orders, 0)}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}