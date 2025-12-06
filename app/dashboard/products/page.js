'use client';

import { useState } from 'react';
import ProductsHeader from '../../components/dashboard/products/ProductsHeader';
import ProductsStats from '../../components/dashboard/products/ProductsStats';
import ProductsFilters from '../../components/dashboard/products/ProductsFilters';
import ProductsTable from '../../components/dashboard/products/ProductsTable';
import EditProductModal from '../../components/dashboard/products/EditProductModal';

const initialProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 299.99,
    stock: 45,
    status: 'active',
    sales: 142,
    rating: 4.8,
    image: '/api/placeholder/40/40'
  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'Electronics',
    price: 199.99,
    stock: 32,
    status: 'active',
    sales: 98,
    rating: 4.6,
    image: '/api/placeholder/40/40'
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    category: 'Accessories',
    price: 49.99,
    stock: 0,
    status: 'out-of-stock',
    sales: 87,
    rating: 4.9,
    image: '/api/placeholder/40/40'
  },
  {
    id: 4,
    name: 'Phone Case',
    category: 'Accessories',
    price: 14.99,
    stock: 156,
    status: 'active',
    sales: 234,
    rating: 4.3,
    image: '/api/placeholder/40/40'
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    price: 129.99,
    stock: 23,
    status: 'active',
    sales: 76,
    rating: 4.7,
    image: '/api/placeholder/40/40'
  },
  {
    id: 6,
    name: 'Desk Lamp',
    category: 'Home',
    price: 39.99,
    stock: 67,
    status: 'active',
    sales: 54,
    rating: 4.5,
    image: '/api/placeholder/40/40'
  }
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const categories = ['all', ...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (product) => {
    setEditingProduct({ ...product });
    setIsEditModalOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setProducts(products.map(p => 
      p.id === editingProduct.id ? editingProduct : p
    ));
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <ProductsHeader />
      
      <ProductsStats products={products} categories={categories} />
      
      <ProductsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      
      <ProductsTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isEditModalOpen && editingProduct && (
        <EditProductModal
          product={editingProduct}
          onUpdate={handleUpdate}
          onClose={() => setIsEditModalOpen(false)}
          setProduct={setEditingProduct}
        />
      )}
    </div>
  );
}