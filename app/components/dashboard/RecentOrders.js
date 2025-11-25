import Link from 'next/link';

const statusColors = {
  completed: 'bg-green-100 text-green-800',
  processing: 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
  shipped: 'bg-purple-100 text-purple-800'
};

export default function RecentOrders({ orders }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        <Link href="/dashboard/orders" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
          View all
        </Link>
      </div>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div>
              <p className="font-medium text-gray-900">{order.id}</p>
              <p className="text-sm text-gray-500">{order.customer}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">${order.amount}</p>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}