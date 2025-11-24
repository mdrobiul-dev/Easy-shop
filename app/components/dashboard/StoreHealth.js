export default function StoreHealth() {
  const metrics = [
    { label: 'Inventory Value', value: '$45,670', color: 'text-gray-900' },
    { label: 'Low Stock Items', value: '8', color: 'text-red-600' },
    { label: 'Avg. Order Value', value: '$156.42', color: 'text-gray-900' },
    { label: 'Conversion Rate', value: '3.2%', color: 'text-green-600' },
    { label: 'Return Rate', value: '2.1%', color: 'text-yellow-600' },
    { label: 'Customer Satisfaction', value: '4.8/5', color: 'text-green-600' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Store Health</h3>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold mb-1">
              <span className={metric.color}>{metric.value}</span>
            </p>
            <p className="text-xs text-gray-600">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}