'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, X } from 'lucide-react';
import Link from 'next/link';
import AddProductHeader from '../../../components/dashboard/AddProduct/AddProductHeader';
import ProductForm from '../../../components/dashboard/AddProduct/ProductForm';

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

  const mainImageInputRef = useRef(null);
  const additionalImagesInputRef = useRef(null);

  // Function to reset the entire form
  const resetForm = () => {
    console.log('Resetting form...');
    
    setFormData({
      title: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      variants: [{ name: '', options: [{ value: '', additionalPrice: '' }] }]
    });
    
    setMainImage(null);
    setAdditionalImages([]);
    setErrors({});
    
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
        
        // Reset the entire form
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
      <AddProductHeader onReset={resetForm} />
      
      <ProductForm 
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}  
        categories={categories}
        isLoadingCategories={isLoadingCategories}
        mainImage={mainImage}
        setMainImage={setMainImage}
        additionalImages={additionalImages}
        setAdditionalImages={setAdditionalImages}
        mainImageInputRef={mainImageInputRef}
        additionalImagesInputRef={additionalImagesInputRef}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}