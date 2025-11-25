'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Eye,
  Download,
  Filter,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

// Mock analytics data
const analyticsData = {
  revenue: [
    { month: 'Jan', revenue: 4000, profit: 2400, orders: 240 },
    { month: 'Feb', revenue: 3000, profit: 1398, orders: 198 },
    { month: 'Mar', revenue: 2000, profit: 980, orders: 180 },
    { month: 'Apr', revenue: 2780, profit: 1908, orders: 208 },
    { month: 'May', revenue: 1890, profit: 1200, orders: 160 },
    { month: 'Jun', revenue: 2390, profit: 1500, orders: 190 },
    { month: 'Jul', revenue: 3490, profit: 2100, orders: 220 },
  ],
  traffic: [
    { source: 'Direct', visitors: 4000, conversion: 12 },
    { source: 'Social', visitors: 3000, conversion: 8 },
    { source: 'Email', visitors: 2000, conversion: 15 },
    { source: 'Search', visitors: 2780, conversion: 10 },
    { source: 'Referral', visitors: 1890, conversion: 6 },
  ],
  products: [
    { name: 'Electronics', value: 35 },
    { name: 'Clothing', value: 25 },
    { name: 'Home & Garden', value: 20 },
    { name: 'Sports', value: 15 },
    { name: 'Others', value: 5 },
  ],
  realTime: [
    { time: '10:00', users: 45, sales: 12 },
    { time: '11:00', users: 52, sales: 15 },
    { time: '12:00', users: 48, sales: 10 },
    { time: '13:00', users: 60, sales: 18 },
    { time: '14:00', users: 55, sales: 14 },
    { time: '15:00', users: 65, sales: 20 },
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Custom Tooltip Components (declared outside)
const RevenueTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-xl">
        <p className="font-semibold text-gray-900">{label}</p>
        <p className="text-sm text-blue-600">
          Revenue: <span className="font-semibold">${payload[0]?.value?.toLocaleString()}</span>
        </p>
        <p className="text-sm text-green-600">
          Profit: <span className="font-semibold">${payload[1]?.value?.toLocaleString()}</span>
        </p>
        <p className="text-sm text-purple-600">
          Orders: <span className="font-semibold">{payload[2]?.value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const PieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-xl">
        <p className="font-semibold text-gray-900">{payload[0].name}</p>
        <p className="text-sm text-gray-600">
          {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6m');
  const [activeChart, setActiveChart] = useState('revenue');

  const kpiData = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      title: 'Active Customers',
      value: '12,489',
      change: '+18.2%',
      trend: 'up',
      icon: Users,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
    },
    {
      title: 'Conversion Rate',
      value: '4.8%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      title: 'Avg. Order Value',
      value: '$89.24',
      change: '-1.2%',
      trend: 'down',
      icon: ShoppingCart,
      color: 'bg-gradient-to-r from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Real-time insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="3m">Last 3 months</option>
            <option value="6m">Last 6 months</option>
            <option value="1y">Last year</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center gap-2 transition-all duration-200">
            <Filter className="h-4 w-4" />
            Filters
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 flex items-center gap-2 transition-all duration-200 shadow-lg shadow-purple-500/25">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${kpi.color} shadow-lg`}>
                <kpi.icon className="h-6 w-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                kpi.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {kpi.trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                {kpi.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
            <p className="text-gray-600 text-sm">{kpi.title}</p>
            <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  kpi.trend === 'up' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-orange-500'
                }`}
                style={{ width: kpi.trend === 'up' ? '75%' : '45%' }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart - Full width on large screens */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue & Performance</h3>
            <div className="flex gap-2 mt-2 sm:mt-0">
              {['revenue', 'profit', 'orders'].map((chart) => (
                <button
                  key={chart}
                  onClick={() => setActiveChart(chart)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeChart === chart
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {chart.charAt(0).toUpperCase() + chart.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.revenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<RevenueTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  fillOpacity={1}
                  fill="url(#colorRevenue)" 
                  strokeWidth={3}
                />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#10B981" 
                  fillOpacity={1}
                  fill="url(#colorProfit)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources Pie Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.traffic}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="visitors"
                >
                  {analyticsData.traffic.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend 
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{
                    paddingLeft: '20px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Activity */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Real-time Activity</h3>
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.realTime}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="users" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                  name="Active Users"
                />
                <Bar 
                  dataKey="sales" 
                  fill="#10B981" 
                  radius={[4, 4, 0, 0]}
                  name="Sales"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Categories Performance */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Product Categories</h3>
          <div className="space-y-4">
            {analyticsData.products.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">{product.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${product.value}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-8">{product.value}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Eye className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Insight</p>
                <p className="text-sm text-gray-600">Electronics category shows highest performance with 35% revenue share</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-4 text-white">
          <p className="text-sm opacity-90">Sessions</p>
          <p className="text-xl font-bold">24.8K</p>
          <p className="text-xs opacity-75">+12.4% from last week</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 text-white">
          <p className="text-sm opacity-90">Bounce Rate</p>
          <p className="text-xl font-bold">42.3%</p>
          <p className="text-xs opacity-75">-2.1% from last week</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 text-white">
          <p className="text-sm opacity-90">Avg. Session</p>
          <p className="text-xl font-bold">4m 12s</p>
          <p className="text-xs opacity-75">+0.8% from last week</p>
        </div>
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-4 text-white">
          <p className="text-sm opacity-90">Goal Conv.</p>
          <p className="text-xl font-bold">8.2%</p>
          <p className="text-xs opacity-75">+1.5% from last week</p>
        </div>
      </div>
    </div>
  );
}