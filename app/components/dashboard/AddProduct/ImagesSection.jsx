import { Upload, X } from 'lucide-react';

export default function ImagesSection({
  mainImage,
  setMainImage,
  additionalImages,
  setAdditionalImages,
  mainImageInputRef,
  additionalImagesInputRef,
  errors,
  setErrors  // Add this prop
}) {
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

  return (
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
  );
}