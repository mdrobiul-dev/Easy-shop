"use client";

import { useState } from "react";
import CategoriesHeader from "../../components/dashboard/categories/CategoriesHeader";
import CategoriesStats from "../../components/dashboard/categories/CategoriesStats";
import CategoriesFilters from "../../components/dashboard/categories/CategoriesFilters";
import CategoriesGrid from "../../components/dashboard/categories/CategoriesGrid";
import EditCategoryModal from "../../components/dashboard/categories/EditCategoryModal";
import CreateCategoryModal from "../../components/dashboard/categories/CreateCategoryModal";

// Mock categories data
const initialCategories = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    description: "Smartphones, laptops, gadgets and electronic devices",
    products: 89,
    status: "active",
    image: "/api/placeholder/40/40",
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    name: "Clothing",
    slug: "clothing",
    description: "Men, women and kids fashion apparel",
    products: 156,
    status: "active",
    image: "/api/placeholder/40/40",
    createdAt: "2024-01-02",
  },
  {
    id: 3,
    name: "Home & Garden",
    slug: "home-garden",
    description: "Furniture, decor, and garden supplies",
    products: 67,
    status: "active",
    image: "/api/placeholder/40/40",
    createdAt: "2024-01-03",
  },
  {
    id: 4,
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    description: "Sports equipment and outdoor gear",
    products: 42,
    status: "active",
    image: "/api/placeholder/40/40",
    createdAt: "2024-01-05",
  },
  {
    id: 5,
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    description: "Cosmetics, skincare, and personal hygiene",
    products: 78,
    status: "active",
    image: "/api/placeholder/40/40",
    createdAt: "2024-01-07",
  },
  {
    id: 6,
    name: "Toys & Games",
    slug: "toys-games",
    description: "Children toys, board games, and video games",
    products: 34,
    status: "inactive",
    image: "/api/placeholder/40/40",
    createdAt: "2024-01-08",
  },
  {
    id: 7,
    name: "Books & Media",
    slug: "books-media",
    description: "Books, magazines, and digital media",
    products: 23,
    status: "active",
    image: "/api/placeholder/40/40",
    createdAt: "2024-01-10",
  },
  {
    id: 8,
    name: "Automotive",
    slug: "automotive",
    description: "Car accessories and automotive parts",
    products: 19,
    status: "active",
    image: "/api/placeholder/40/40",
    createdAt: "2024-01-12",
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [editingCategory, setEditingCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
    status: "active",
  });

  // Filter categories based on search and status
  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || category.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (category) => {
    setEditingCategory({ ...category });
    setIsEditModalOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setCategories(
      categories.map((cat) =>
        cat.id === editingCategory.id ? editingCategory : cat
      )
    );
    setIsEditModalOpen(false);
    setEditingCategory(null);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const category = {
      ...newCategory,
      id: Math.max(...categories.map((c) => c.id)) + 1,
      slug:
        newCategory.slug || newCategory.name.toLowerCase().replace(/\s+/g, "-"),
      products: 0,
      image: "/api/placeholder/40/40",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setCategories([...categories, category]);
    setIsCreateModalOpen(false);
    setNewCategory({
      name: "",
      slug: "",
      description: "",
      status: "active",
    });
  };

  const handleDelete = (categoryId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this category? This action cannot be undone."
      )
    ) {
      setCategories(categories.filter((cat) => cat.id !== categoryId));
    }
  };

  const toggleStatus = (categoryId) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, status: cat.status === "active" ? "inactive" : "active" }
          : cat
      )
    );
  };

  const totalProducts = categories.reduce((sum, cat) => sum + cat.products, 0);
  const activeCategories = categories.filter(
    (cat) => cat.status === "active"
  ).length;

  return (
    <div className="p-6 space-y-6">
      <CategoriesHeader onCreateCategory={() => setIsCreateModalOpen(true)} />

      <CategoriesStats
        categories={categories}
        totalProducts={totalProducts}
        activeCategories={activeCategories}
      />

      <CategoriesFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      <CategoriesGrid
        categories={filteredCategories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={toggleStatus}
        onCreateCategory={() => setIsCreateModalOpen(true)}
      />

      {isEditModalOpen && editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onUpdate={handleUpdate}
          onClose={() => setIsEditModalOpen(false)}
          setCategory={setEditingCategory}
        />
      )}

      {isCreateModalOpen && (
        <CreateCategoryModal
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          onCreate={handleCreate}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </div>
  );
}
