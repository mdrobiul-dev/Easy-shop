'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ArrowLeft, 
  Shield, 
  Truck, 
  RotateCcw,
  Heart
} from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Mock cart data - replace with actual API call
  useEffect(() => {
    const mockCartItems = [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        price: 129.99,
        originalPrice: 159.99,
        quantity: 1,
        image: '/api/placeholder/120/120',
        category: 'Electronics',
        inStock: true,
        maxQuantity: 5
      },
      {
        id: 2,
        name: 'Premium Cotton T-Shirt',
        price: 29.99,
        originalPrice: 39.99,
        quantity: 2,
        image: '/api/placeholder/120/120',
        category: 'Clothing',
        inStock: true,
        maxQuantity: 10,
        size: 'M',
        color: 'Black'
      },
      {
        id: 3,
        name: 'Smart Fitness Watch',
        price: 199.99,
        originalPrice: 249.99,
        quantity: 1,
        image: '/api/placeholder/120/120',
        category: 'Electronics',
        inStock: true,
        maxQuantity: 3
      }
    ];
    
    setCartItems(mockCartItems);
    setIsLoading(false);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const moveToWishlist = (id) => {
    // Implement move to wishlist logic
    console.log('Move to wishlist:', id);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    return cartItems.reduce((total, item) => 
      total + ((item.originalPrice - item.price) * item.quantity), 0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08; // 8% tax
    return {
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax
    };
  };

  const totals = calculateTotal();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
         <Link href="/allproducts">
          <button 
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </button></Link>
          
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products!
            </p>
            <button
              onClick={() => router.push('/products')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Cart Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
                    <span className="text-sm text-gray-600">
                      Total: ${calculateSubtotal().toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Cart Items List */}
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                      onMoveToWishlist={moveToWishlist}
                    />
                  ))}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <TrustBadge
                  icon={<Shield className="w-6 h-6" />}
                  title="Secure Checkout"
                  description="Your payment information is safe with us"
                />
                <TrustBadge
                  icon={<Truck className="w-6 h-6" />}
                  title="Free Shipping"
                  description="On orders over $50"
                />
                <TrustBadge
                  icon={<RotateCcw className="w-6 h-6" />}
                  title="Easy Returns"
                  description="30-day return policy"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <SummaryRow label="Subtotal" value={`$${totals.subtotal.toFixed(2)}`} />
                  <SummaryRow label="Discount" value={`-$${calculateDiscount().toFixed(2)}`} discount />
                  <SummaryRow label="Shipping" 
                    value={totals.shipping === 0 ? 'Free' : `$${totals.shipping.toFixed(2)}`} 
                  />
                  <SummaryRow label="Tax" value={`$${totals.tax.toFixed(2)}`} />
                  
                  <div className="border-t border-gray-200 pt-4">
                    <SummaryRow 
                      label="Total" 
                      value={`$${totals.total.toFixed(2)}`} 
                      bold 
                    />
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      id="promo"
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold mb-4"
                >
                  Proceed to Checkout
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={() => router.push('/products')}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Continue Shopping
                </button>

                {/* Security Note */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-800 text-sm">
                      Secure checkout guaranteed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Cart Item Component
function CartItem({ item, onUpdateQuantity, onRemove, onMoveToWishlist }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(item.id), 300);
  };

  return (
    <div className={`p-6 transition-all duration-300 ${isRemoving ? 'opacity-0 scale-95' : 'opacity-100'}`}>
      <div className="flex space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{item.category}</p>
              
              {/* Variants */}
              {(item.size || item.color) && (
                <div className="flex space-x-4 mt-2">
                  {item.size && (
                    <span className="text-sm text-gray-600">Size: {item.size}</span>
                  )}
                  {item.color && (
                    <span className="text-sm text-gray-600">Color: {item.color}</span>
                  )}
                </div>
              )}

              {/* Stock Status */}
              <div className="mt-2">
                {item.inStock ? (
                  <span className="text-sm text-green-600">In Stock</span>
                ) : (
                  <span className="text-sm text-red-600">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                {item.originalPrice > item.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${(item.originalPrice * item.quantity).toFixed(2)}
                  </span>
                )}
              </div>
              {item.originalPrice > item.price && (
                <span className="text-sm text-green-600">
                  Save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Quantity Controls & Actions */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Quantity:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.maxQuantity}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => onMoveToWishlist(item.id)}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors text-sm"
              >
                <Heart className="w-4 h-4 mr-1" />
                Save
              </button>
              
              <button
                onClick={handleRemove}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors text-sm"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Trust Badge Component
function TrustBadge({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
      <div className="text-blue-600 flex justify-center mb-2">
        {icon}
      </div>
      <h3 className="font-medium text-gray-900 text-sm mb-1">{title}</h3>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );
}

// Summary Row Component
function SummaryRow({ label, value, discount = false, bold = false }) {
  return (
    <div className="flex justify-between items-center">
      <span className={`text-gray-600 ${bold ? 'font-semibold' : ''}`}>
        {label}
      </span>
      <span className={`${discount ? 'text-green-600' : bold ? 'font-bold text-gray-900' : 'text-gray-900'}`}>
        {value}
      </span>
    </div>
  );
}
