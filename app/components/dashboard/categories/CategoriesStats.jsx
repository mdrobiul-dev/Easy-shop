import { Tag, Package } from 'lucide-react';

export default function CategoriesStats({ categories, totalProducts, activeCategories }) {
  const stats = [
    {
      label: 'Total Categories',
      value: categories.length,
      icon: Tag,
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Active Categories',
      value: activeCategories,
      icon: Tag,
      color: 'green',
      gradient: 'from-green-500 to-green-600'
    },
    {
      label: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Avg Products/Category',
      value: Math.round(totalProducts / categories.length),
      icon: Package,
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3">
            <div className={`p-3 bg-gradient-to-r ${stat.gradient} rounded-xl text-white`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}