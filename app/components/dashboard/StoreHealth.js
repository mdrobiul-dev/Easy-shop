'use client';

import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

export default function StoreHealth() {
  const healthMetrics = [
    { label: 'Inventory Status', value: 'Healthy', status: 'good', description: 'All products in stock' },
    { label: 'Order Fulfillment', value: '98.2%', status: 'good', description: 'On-time delivery' },
    { label: 'Customer Satisfaction', value: '4.8/5', status: 'good', description: 'Based on 289 reviews' },
    { label: 'Website Uptime', value: '99.9%', status: 'warning', description: 'Minor issues reported' },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Store Health</h3>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          All Systems Operational
        </div>
      </div>

      <div className="space-y-4">
        {healthMetrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-center gap-3">
              {getStatusIcon(metric.status)}
              <div>
                <p className="font-medium text-gray-900">{metric.label}</p>
                <p className="text-sm text-gray-600">{metric.description}</p>
              </div>
            </div>
            
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(metric.status)}`}>
              {metric.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Info className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Performance Tip</p>
            <p className="text-sm text-gray-600">Consider adding more product images to boost conversion rates</p>
          </div>
        </div>
      </div>
    </div>
  );
}