import { DollarSign, ShoppingCart, Users, Package, TrendingUp, TrendingDown } from 'lucide-react';

const icons = {
  revenue: DollarSign,
  orders: ShoppingCart,
  customers: Users,
  products: Package
};

const colors = {
  revenue: 'text-green-600',
  orders: 'text-blue-600',
  customers: 'text-purple-600',
  products: 'text-orange-600'
};

const bgColors = {
  revenue: 'bg-green-100',
  orders: 'bg-blue-100',
  customers: 'bg-purple-100',
  products: 'bg-orange-100'
};

export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(stats).map(([key, data]) => {
        const Icon = icons[key];
        const isPositive = data.trend === 'up';
        
        return (
          <div key={key} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 capitalize">
                  {key}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {key === 'revenue' ? `$${data.value.toLocaleString()}` : data.value.toLocaleString()}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${bgColors[key]}`}>
                <Icon className={`h-6 w-6 ${colors[key]}`} />
              </div>
            </div>
            <div className={`flex items-center mt-4 text-sm ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              <span>
                {isPositive ? '+' : ''}{data.change}% from last month
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}