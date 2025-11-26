'use client';

import { useState, useEffect, useRef } from 'react';
import { Package, Plus, X, Upload, Trash2 } from 'lucide-react';
import Link from 'next/link';

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
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Refs for file inputs
  const mainImageInputRef = useRef(null);
  const additionalImagesInputRef = useRef(null);

  // Function to reset the entire form
  const resetForm = () => {
    console.log('Resetting form...');
    
    // Reset form data
    setFormData({
      title: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      variants: [{ name: '', options: [{ value: '', additionalPrice: '' }] }]
    });
    
    // Reset images
    setMainImage(null);
    setAdditionalImages([]);
    
    // Reset errors
    setErrors({});
    
    // Reset file inputs
    if (mainImageInputRef.current) {
      mainImageInputRef.current.value = '';
    }
    if (additionalImagesInputRef.current) {
      additionalImagesInputRef.current.value = '';
    }
    
    console.log('Form reset complete');
  };

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/category/getcategory');
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const result = await response.json();
        
        console.log('Categories API Response:', result);
        
        // Handle the categories API response structure
        if (result.success && Array.isArray(result.data)) {
          setCategories(result.data);
        } else if (Array.isArray(result)) {
          setCategories(result);
        } else if (result.categories && Array.isArray(result.categories)) {
          setCategories(result.categories);
        } else {
          console.error('Unexpected categories API response structure:', result);
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setErrors(prev => ({ ...prev, categories: 'Failed to load categories' }));
        setCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Add all the missing functions here:

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
        [field]: value.toLowerCase()
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
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, mainImg: 'Please select a valid image (JPEG, PNG, WebP)' }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, mainImg: 'Image size must be less than 5MB' }));
        return;
      }
      
      setMainImage(file);
      setErrors(prev => ({ ...prev, mainImg: '' }));
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    const validFiles = files.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        return false;
      }
      return true;
    });
    
    if (validFiles.length !== files.length) {
      setErrors(prev => ({ 
        ...prev, 
        images: 'Some files were skipped. Only JPEG, PNG, and WebP files under 5MB are allowed.' 
      }));
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
      
      // Append basic product data
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('stock', formData.stock);
      
      // Append variants as JSON string
      formDataToSend.append('variants', JSON.stringify(formData.variants));
      
      // Append main image
      formDataToSend.append('mainImg', mainImage);
      
      // Append additional images
      additionalImages.forEach((image, index) => {
        formDataToSend.append('images', image);
      });

      console.log('Submitting form data:', {
        title: formData.title,
        category: formData.category,
        price: formData.price,
        stock: formData.stock,
        variants: formData.variants
      });

      // Send to your product creation API
      const response = await fetch('http://localhost:5000/api/v1/product/creatproduct', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();
      console.log('API Response:', result);

      if (response.ok && result.success) {
        console.log('Product created successfully, resetting form...');
        
        // Reset the entire form - THIS SHOULD HAPPEN AUTOMATICALLY
        resetForm();
        
        // Call callback functions if provided
        if (onProductAdded) onProductAdded();
        if (onBack) onBack();
      } else {
        console.log('Product creation failed:', result);
        setErrors({ 
          submit: result.message || result.error || 'Failed to create product' 
        });
      }
    } catch (error) {
      console.error('Error creating product:', error);
      setErrors({ 
        submit: 'Network error. Please check your connection and try again.' 
      });
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
        <div className="flex gap-2">
          {/* Optional: Add a reset button */}
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <X className="h-4 w-4" />
            Reset Form
          </button>
          <Link 
            href="/dashboard/products"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            Back to Products
          </Link>
        </div>
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
                className={`w-full px-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-colors ${
                  errors.title ? 'ring-2 ring-red-500' : ''
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
                disabled={isLoadingCategories}
                className={`w-full px-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-colors ${
                  errors.category ? 'ring-2 ring-red-500' : ''
                } ${isLoadingCategories ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                <option value="">{isLoadingCategories ? 'Loading categories...' : 'Select a category'}</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categories && <p className="mt-1 text-sm text-red-600">{errors.categories}</p>}
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-colors ${
                  errors.price ? 'ring-2 ring-red-500' : ''
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
                min="1"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-colors ${
                  errors.stock ? 'ring-2 ring-red-500' : ''
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
              className={`w-full px-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-colors ${
                errors.description ? 'ring-2 ring-red-500' : ''
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
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors bg-gray-50 hover:bg-gray-100">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-600">Upload</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleMainImageChange}
                    ref={mainImageInputRef}
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
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
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
                <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors bg-gray-50 hover:bg-gray-100">
                  <Upload className="h-6 w-6 text-gray-400" />
                  <span className="mt-1 text-xs text-gray-600">Add More</span>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleAdditionalImagesChange}
                    ref={additionalImagesInputRef}
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
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
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
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg flex items-center gap-2 transition-colors text-sm"
              >
                <Plus className="h-4 w-4" />
                Add Variant
              </button>
            </div>

            {formData.variants.map((variant, variantIndex) => (
              <div key={variantIndex} className="p-4 border border-gray-200 rounded-lg space-y-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Variant {variantIndex + 1}</h4>
                  {formData.variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(variantIndex)}
                      className="text-red-500 hover:text-red-700 transition-colors"
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
                      className={`w-full px-3 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                        errors[`variant-${variantIndex}-name`] ? 'ring-2 ring-red-500' : ''
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
                      className="text-purple-600 hover:text-purple-800 text-sm flex items-center gap-1 transition-colors"
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
                          className={`w-full px-3 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                            errors[`variant-${variantIndex}-option-${optionIndex}-value`] ? 'ring-2 ring-red-500' : ''
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
                          min="0"
                          placeholder="Extra price"
                          value={option.additionalPrice}
                          onChange={(e) => handleOptionChange(variantIndex, optionIndex, 'additionalPrice', e.target.value)}
                          className="w-full px-3 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                        />
                      </div>
                      {variant.options.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeOption(variantIndex, optionIndex)}
                          className="text-red-500 hover:text-red-700 transition-colors"
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
              disabled={isSubmitting || isLoadingCategories}
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Creating Product...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Create Product
                </>
              )}
            </button>
            <Link
              href="/dashboard/products"
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-4 rounded-lg transition-colors text-center"
            >
              Cancel
            </Link>
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