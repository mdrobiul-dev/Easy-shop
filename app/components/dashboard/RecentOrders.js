'use client';

import { ArrowUpRight, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';

const statusIcons = {
  completed: CheckCircle,
  processing: Clock,
  pending: Clock,
  shipped: Truck,
  cancelled: XCircle
};

const statusColors = {
  completed: 'text-green-600 bg-green-100',
  processing: 'text-blue-600 bg-blue-100',
  pending: 'text-yellow-600 bg-yellow-100',
  shipped: 'text-purple-600 bg-purple-100',
  cancelled: 'text-red-600 bg-red-100'
};

export default function RecentOrders({ orders }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        <button className="text-purple-600 hover:text-purple-700 flex items-center gap-1 text-sm font-medium">
          View All
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="space-y-4">
        {orders.map((order) => {
          const StatusIcon = statusIcons[order.status];
          
          return (
            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 group">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${statusColors[order.status]}`}>
                  <StatusIcon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-gray-900">${order.amount}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total pending:</span>
          <span className="font-semibold text-gray-900">$623.74</span>
        </div>
      </div>
    </div>
  );
}