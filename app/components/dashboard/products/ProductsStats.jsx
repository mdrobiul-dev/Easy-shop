import { Package } from 'lucide-react';

export default function ProductsStats({ products, categories }) {
  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'purple'
    },
    {
      label: 'In Stock',
      value: products.filter(p => p.stock > 0).length,
      icon: Package,
      color: 'green'
    },
    {
      label: 'Out of Stock',
      value: products.filter(p => p.stock === 0).length,
      icon: Package,
      color: 'red'
    },
    {
      label: 'Categories',
      value: categories.length - 1,
      icon: Package,
      color: 'blue'
    }
  ];

  const colorClasses = {
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    blue: 'bg-blue-100 text-blue-600'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${colorClasses[stat.color]}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}