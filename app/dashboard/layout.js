import Link from 'next/link';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart3,
  Settings,
  CreditCard,
  Tag,
  MessageSquare
} from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">ShopEasy</h1>
            </div>

            {/* Navigation */}
            <nav className="mt-8 flex-1 px-4 space-y-2">
              <NavItem href="/dashboard" icon={LayoutDashboard} label="Overview" active />
              <NavItem href="/dashboard/orders" icon={ShoppingCart} label="Orders" count={12} />
              <NavItem href="/dashboard/products" icon={Package} label="Products" count={156} />
              <NavItem href="/dashboard/customers" icon={Users} label="Customers" count={289} />
              <NavItem href="/dashboard/analytics" icon={BarChart3} label="Analytics" />
              <NavItem href="/dashboard/categories" icon={Tag} label="Categories" />
              <NavItem href="/dashboard/reviews" icon={MessageSquare} label="Reviews" />
              <NavItem href="/dashboard/payments" icon={CreditCard} label="Payments" />
              <NavItem href="/dashboard/settings" icon={Settings} label="Settings" />
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({ href, icon: Icon, label, count, active = false }) {
  return (
    <Link
      href={href}
      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
        active
          ? 'bg-purple-50 text-purple-700 border-purple-600 '
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon
        className={`shrink-0 h-5 w-5 ${
          active ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-500'
        }`}
      />
      <span className="ml-3 flex-1">{label}</span>
      {count && (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          active 
            ? 'bg-purple-100 text-purple-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {count}
        </span>
      )}
    </Link>
  );
}