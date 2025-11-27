import BasicInfoSection from './BasicInfoSection';
import DescriptionSection from './DescriptionSection';
import ImagesSection from './ImagesSection';
import VariantsSection from './VariantsSection';
import SubmitSection from './SubmitSection';

export default function ProductForm({
  onSubmit,
  formData,
  setFormData,
  errors,
  setErrors,
  categories,
  isLoadingCategories,
  mainImage,
  setMainImage,
  additionalImages,
  setAdditionalImages,
  mainImageInputRef,
  additionalImagesInputRef,
  isSubmitting
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <form onSubmit={onSubmit} className="space-y-6">
        <BasicInfoSection
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
          categories={categories}
          isLoadingCategories={isLoadingCategories}
        />
        
        <DescriptionSection
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
        />
        
        <ImagesSection
          mainImage={mainImage}
          setMainImage={setMainImage}
          additionalImages={additionalImages}
          setAdditionalImages={setAdditionalImages}
          mainImageInputRef={mainImageInputRef}
          additionalImagesInputRef={additionalImagesInputRef}
          errors={errors}
          setErrors={setErrors}  
        />
        
        <VariantsSection
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
        />
        
        <SubmitSection
          isSubmitting={isSubmitting}
          isLoadingCategories={isLoadingCategories}
          errors={errors}
        />
      </form>
    </div>
  );
}