import StatsGrid from '../components/dashboard/StatsGrid';
import RecentOrders from '../components/dashboard/RecentOrders';
import SalesChart from '../components/dashboard/SalesChart';
import TopProducts from '../components/dashboard/TopProducts';
import StoreHealth from '../components/dashboard/StoreHealth';

// Mock data
const statsData = {
  revenue: { value: 32450.75, change: 12.5, trend: 'up' },
  orders: { value: 1242, change: 8.2, trend: 'up' },
  customers: { value: 892, change: 15.7, trend: 'up' },
  products: { value: 156, change: -2.3, trend: 'down' }
};

const recentOrders = [
  { id: 'ORD-7842', customer: 'John Doe', amount: 299.99, status: 'completed', date: '2024-01-15' },
  { id: 'ORD-7841', customer: 'Jane Smith', amount: 156.50, status: 'processing', date: '2024-01-15' },
  { id: 'ORD-7840', customer: 'Mike Johnson', amount: 89.99, status: 'pending', date: '2024-01-14' },
  { id: 'ORD-7839', customer: 'Sarah Wilson', amount: 245.75, status: 'completed', date: '2024-01-14' },
  { id: 'ORD-7838', customer: 'Tom Brown', amount: 167.25, status: 'shipped', date: '2024-01-13' }
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 142, revenue: 18460, rating: 4.8 },
  { name: 'Smart Watch', sales: 98, revenue: 15680, rating: 4.6 },
  { name: 'Laptop Backpack', sales: 87, revenue: 4350, rating: 4.9 },
  { name: 'Phone Case', sales: 234, revenue: 3510, rating: 4.3 },
  { name: 'Bluetooth Speaker', sales: 76, revenue: 9880, rating: 4.7 }
];

const salesData = [
  { month: 'Jan', revenue: 4000, orders: 240 },
  { month: 'Feb', revenue: 3000, orders: 198 },
  { month: 'Mar', revenue: 2000, orders: 180 },
  { month: 'Apr', revenue: 2780, orders: 208 },
  { month: 'May', revenue: 1890, orders: 160 },
  { month: 'Jun', revenue: 2390, orders: 190 },
  { month: 'Jul', revenue: 3490, orders: 220 }
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome to ShopEasy Dashboard! 🎉</h1>
        <p className="text-purple-100">
          Manage your store, track sales, and monitor performance from one place.
        </p>
      </div>

      {/* Stats Grid */}
      <StatsGrid stats={statsData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2">
          <SalesChart data={salesData} />
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-1">
          <RecentOrders orders={recentOrders} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <TopProducts products={topProducts} />

        {/* Store Health */}
        <StoreHealth />
      </div>
    </div>
  );
}