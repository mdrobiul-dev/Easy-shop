'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { LogoutButton } from '../components/auth/LogoutButton';
import { 
  ShoppingCart, 
  Users, 
  DollarSign, 
  Package, 
  TrendingUp, 
  Shield,
  Bell,
  Settings,
  Search
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  // Mock data for dashboard metrics
  const [metrics, setMetrics] = useState({
    totalRevenue: 12450.75,
    totalOrders: 342,
    totalProducts: 156,
    totalCustomers: 289,
    revenueGrowth: 12.5,
    orderGrowth: 8.2,
    customerGrowth: 15.7
  });

  // Recent activity mock data
  const recentActivity = [
    { id: 1, type: 'order', message: 'New order #ORD-7842 placed', time: '2 min ago' },
    { id: 2, type: 'customer', message: 'New customer registered', time: '15 min ago' },
    { id: 3, type: 'product', message: 'Product "Wireless Headphones" low stock', time: '1 hour ago' },
    { id: 4, type: 'order', message: 'Order #ORD-7841 shipped', time: '2 hours ago' }
  ];

  useEffect(() => {
    const userCookie = Cookies.get('user');
    const accessToken = Cookies.get('accessToken');

    if (!accessToken || !userCookie) {
      router.push('/auth/login');
      return;
    }

    try {
      const userData = JSON.parse(userCookie);
      setUser(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/auth/login');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link  href="/" className='text-gray-700 hover:text-purple-600 font-medium text-base'>
               Home
              </Link>
              
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-6 h-6" />
              </button>
              
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.firstName}!
          </h2>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your store today.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<DollarSign className="w-8 h-8 text-green-600" />}
            title="Total Revenue"
            value={`$${metrics.totalRevenue.toLocaleString()}`}
            growth={metrics.revenueGrowth}
            trend="up"
          />
          
          <MetricCard
            icon={<ShoppingCart className="w-8 h-8 text-blue-600" />}
            title="Total Orders"
            value={metrics.totalOrders.toLocaleString()}
            growth={metrics.orderGrowth}
            trend="up"
          />
          
          <MetricCard
            icon={<Users className="w-8 h-8 text-purple-600" />}
            title="Total Customers"
            value={metrics.totalCustomers.toLocaleString()}
            growth={metrics.customerGrowth}
            trend="up"
          />
          
          <MetricCard
            icon={<Package className="w-8 h-8 text-orange-600" />}
            title="Total Products"
            value={metrics.totalProducts.toLocaleString()}
            growth={0}
            trend="neutral"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
              <div className="grid grid-cols-2 gap-4">
                <StatCard title="Conversion Rate" value="3.2%" change="+0.5%" />
                <StatCard title="Avg. Order Value" value="$156.42" change="+$12.30" />
                <StatCard title="Returning Customers" value="42%" change="+3.1%" />
                <StatCard title="Inventory Turnover" value="2.8x" change="-0.2x" />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} {...activity} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* User Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <InfoRow label="Username" value={user.username} />
                <InfoRow label="User ID" value={user.id} />
                <InfoRow label="Status" value="Active" badge="success" />
              </div>
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-800 text-sm font-medium">
                    Authentication Active & Secure
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <QuickAction icon={<Package />} label="Add New Product" />
                <QuickAction icon={<Users />} label="View Customers" />
                <QuickAction icon={<ShoppingCart />} label="Process Orders" />
                <QuickAction icon={<TrendingUp />} label="View Analytics" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for metric cards
function MetricCard({ icon, title, value, growth, trend }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-100 rounded-lg">
          {icon}
        </div>
        {trend !== 'neutral' && (
          <div className={`flex items-center text-sm font-medium ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className={`w-4 h-4 mr-1 ${trend === 'down' ? 'transform rotate-180' : ''}`} />
            {growth}%
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </div>
  );
}

// Component for stat cards
function StatCard({ title, value, change }) {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="text-center p-4 bg-gray-50 rounded-lg">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-gray-600 text-sm mb-1">{title}</p>
      <span className={`text-xs font-medium ${
        isPositive ? 'text-green-600' : 'text-red-600'
      }`}>
        {change}
      </span>
    </div>
  );
}

// Component for activity items
function ActivityItem({ type, message, time }) {
  const getIcon = (type) => {
    switch (type) {
      case 'order': return <ShoppingCart className="w-4 h-4" />;
      case 'customer': return <Users className="w-4 h-4" />;
      case 'product': return <Package className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'order': return 'text-blue-600 bg-blue-100';
      case 'customer': return 'text-green-600 bg-green-100';
      case 'product': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-lg ${getColor(type)}`}>
        {getIcon(type)}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{message}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}

// Component for info rows
function InfoRow({ label, value, badge }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>
      {badge ? (
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          {value}
        </span>
      ) : (
        <span className="text-sm font-medium text-gray-900">{value}</span>
      )}
    </div>
  );
}

// Component for quick actions
function QuickAction({ icon, label }) {
  return (
    <button className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="text-gray-400">
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </button>
  );
}