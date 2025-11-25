'use client';

import { useState } from 'react';
import { Package, Plus, X, Upload, Trash2 } from 'lucide-react';
import Link from 'next/link';

// Mock categories data - you'll need to replace this with actual data from your backend
const mockCategories = [
  { _id: '1', name: 'Electronics' },
  { _id: '2', name: 'Accessories' },
  { _id: '3', name: 'Home' },
  { _id: '4', name: 'Clothing' },
];

export default function AddProductPage({ onBack, onProductAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    variants: [{ name: '', options: [{ value: '', additionalPrice: '' }] }]
  });
  
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleVariantChange = (variantIndex, field, value) => {
    setFormData(prev => {
      const updatedVariants = [...prev.variants];
      updatedVariants[variantIndex] = {
        ...updatedVariants[variantIndex],
        [field]: value.toLowerCase() // Convert to lowercase as per backend enum
      };
      return { ...prev, variants: updatedVariants };
    });
  };

  const handleOptionChange = (variantIndex, optionIndex, field, value) => {
    setFormData(prev => {
      const updatedVariants = [...prev.variants];
      const updatedOptions = [...updatedVariants[variantIndex].options];
      
      updatedOptions[optionIndex] = {
        ...updatedOptions[optionIndex],
        [field]: field === 'additionalPrice' ? parseFloat(value) || 0 : value
      };
      
      updatedVariants[variantIndex] = {
        ...updatedVariants[variantIndex],
        options: updatedOptions
      };
      
      return { ...prev, variants: updatedVariants };
    });
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { name: '', options: [{ value: '', additionalPrice: '' }] }]
    }));
  };

  const removeVariant = (variantIndex) => {
    if (formData.variants.length > 1) {
      setFormData(prev => ({
        ...prev,
        variants: prev.variants.filter((_, index) => index !== variantIndex)
      }));
    }
  };

  const addOption = (variantIndex) => {
    setFormData(prev => {
      const updatedVariants = [...prev.variants];
      updatedVariants[variantIndex].options.push({ value: '', additionalPrice: '' });
      return { ...prev, variants: updatedVariants };
    });
  };

  const removeOption = (variantIndex, optionIndex) => {
    if (formData.variants[variantIndex].options.length > 1) {
      setFormData(prev => {
        const updatedVariants = [...prev.variants];
        updatedVariants[variantIndex].options = updatedVariants[variantIndex].options.filter(
          (_, index) => index !== optionIndex
        );
        return { ...prev, variants: updatedVariants };
      });
    }
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, mainImg: 'Please select a valid image (JPEG, PNG, WebP)' }));
        return;
      }
      
      setMainImage(file);
      setErrors(prev => ({ ...prev, mainImg: '' }));
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    const validFiles = files.filter(file => allowedTypes.includes(file.type));
    
    if (validFiles.length !== files.length) {
      setErrors(prev => ({ ...prev, images: 'Some files were skipped. Only JPEG, PNG, and WebP are allowed.' }));
    } else {
      setErrors(prev => ({ ...prev, images: '' }));
    }
    
    setAdditionalImages(prev => [...prev, ...validFiles]);
  };

  const removeAdditionalImage = (index) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || parseFloat(formData.price) < 1) newErrors.price = 'Price must be a positive number';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.stock || parseInt(formData.stock) < 1) newErrors.stock = 'Stock must be a positive integer';
    if (!mainImage) newErrors.mainImg = 'Main image is required';

    // Validate variants
    formData.variants.forEach((variant, variantIndex) => {
      if (!variant.name) {
        newErrors[`variant-${variantIndex}-name`] = 'Variant name is required';
      } else if (!['color', 'size'].includes(variant.name.toLowerCase())) {
        newErrors[`variant-${variantIndex}-name`] = 'Variant name must be either "color" or "size"';
      }

      variant.options.forEach((option, optionIndex) => {
        if (!option.value.trim()) {
          newErrors[`variant-${variantIndex}-option-${optionIndex}-value`] = 'Option value is required';
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('variants', JSON.stringify(formData.variants));
      
      // Append main image
      formDataToSend.append('mainImg', mainImage);
      
      // Append additional images
      additionalImages.forEach((image, index) => {
        formDataToSend.append('images', image);
      });

      const response = await fetch('/api/products', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        alert('Product created successfully!');
        if (onProductAdded) onProductAdded();
        if (onBack) onBack();
      } else {
        setErrors({ submit: result.error || 'Failed to create product' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600">Create a new product listing</p>
        </div>
        <Link href="/dashboard/products"
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          Back to Products
        </Link>
      </div>

      {/* Product Form */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter product title"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                {mockCategories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.stock ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
              />
              {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter product description"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Images */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Image *
              </label>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-600">Upload</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleMainImageChange}
                  />
                </label>
                {mainImage && (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(mainImage)}
                      alt="Main product"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setMainImage(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              {errors.mainImg && <p className="mt-1 text-sm text-red-600">{errors.mainImg}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Images
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                  <Upload className="h-6 w-6 text-gray-400" />
                  <span className="mt-1 text-xs text-gray-600">Add More</span>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleAdditionalImagesChange}
                  />
                </label>
                {additionalImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Additional ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
            </div>
          </div>

          {/* Variants */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Variants</h3>
              <button
                type="button"
                onClick={addVariant}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg flex items-center gap-2 transition-colors text-sm"
              >
                <Plus className="h-4 w-4" />
                Add Variant
              </button>
            </div>

            {formData.variants.map((variant, variantIndex) => (
              <div key={variantIndex} className="p-4 border border-gray-200 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Variant {variantIndex + 1}</h4>
                  {formData.variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(variantIndex)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Variant Type *
                    </label>
                    <select
                      value={variant.name}
                      onChange={(e) => handleVariantChange(variantIndex, 'name', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors[`variant-${variantIndex}-name`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select type</option>
                      <option value="color">Color</option>
                      <option value="size">Size</option>
                    </select>
                    {errors[`variant-${variantIndex}-name`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`variant-${variantIndex}-name`]}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-gray-700">Options</h5>
                    <button
                      type="button"
                      onClick={() => addOption(variantIndex)}
                      className="text-purple-600 hover:text-purple-800 text-sm flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3" />
                      Add Option
                    </button>
                  </div>

                  {variant.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Option value (e.g., Red, Large)"
                          value={option.value}
                          onChange={(e) => handleOptionChange(variantIndex, optionIndex, 'value', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors[`variant-${variantIndex}-option-${optionIndex}-value`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors[`variant-${variantIndex}-option-${optionIndex}-value`] && (
                          <p className="mt-1 text-sm text-red-600">{errors[`variant-${variantIndex}-option-${optionIndex}-value`]}</p>
                        )}
                      </div>
                      <div className="w-32">
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Extra price"
                          value={option.additionalPrice}
                          onChange={(e) => handleOptionChange(variantIndex, optionIndex, 'additionalPrice', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      {variant.options.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeOption(variantIndex, optionIndex)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Create Product
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onBack}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{errors.submit}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}