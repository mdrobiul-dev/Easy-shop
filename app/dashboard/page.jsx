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
  { name: 'Wireless Headphones', sales: 142, revenue: 18460, rating: 4.8, trend: 'up' },
  { name: 'Smart Watch', sales: 98, revenue: 15680, rating: 4.6, trend: 'up' },
  { name: 'Laptop Backpack', sales: 87, revenue: 4350, rating: 4.9, trend: 'down' },
  { name: 'Phone Case', sales: 234, revenue: 3510, rating: 4.3, trend: 'up' },
  { name: 'Bluetooth Speaker', sales: 76, revenue: 9880, rating: 4.7, trend: 'up' }
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
    
      <div className="relative bg-linear-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-3xl p-8 text-white overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl">🚀</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">Welcome to ShopEasy! 🎉</h1>
              <p className="text-blue-100 text-lg">
                Your store is performing great. Revenue is up by 12.5% this month.
              </p>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <p className="text-sm text-blue-100">Today&apos;s Revenue</p>
              <p className="text-xl font-bold">$1,248.50</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <p className="text-sm text-blue-100">Active Orders</p>
              <p className="text-xl font-bold">24</p>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-linear-to-tr from-white/10 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Stats Grid */}
      <StatsGrid stats={statsData} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
       
        <div className="xl:col-span-2">
          <SalesChart data={salesData} />
        </div>

       
        <div className="xl:col-span-1">
          <RecentOrders orders={recentOrders} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      
        <TopProducts products={topProducts} />

        
        <StoreHealth />
      </div>

      
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-linear-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-200 group">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📦</div>
            <p className="font-medium text-gray-900">Add Product</p>
            <p className="text-sm text-gray-600">Create new listing</p>
          </button>
          <button className="p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-200 group">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🎨</div>
            <p className="font-medium text-gray-900">Customize</p>
            <p className="text-sm text-gray-600">Store appearance</p>
          </button>
          <button className="p-4 bg-linear-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100 hover:shadow-md transition-all duration-200 group">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📊</div>
            <p className="font-medium text-gray-900">Reports</p>
            <p className="text-sm text-gray-600">Generate insights</p>
          </button>
          <button className="p-4 bg-linear-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-100 hover:shadow-md transition-all duration-200 group">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">⚙️</div>
            <p className="font-medium text-gray-900">Settings</p>
            <p className="text-sm text-gray-600">Store configuration</p>
          </button>
        </div>
      </div>
    </div>
  );
}