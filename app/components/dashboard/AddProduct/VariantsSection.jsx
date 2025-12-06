import { Plus, Trash2, X } from 'lucide-react';
import VariantItem from './VariantItem';

export default function VariantsSection({
  formData,
  setFormData,
  errors,
  setErrors
}) {
  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { name: '', options: [{ value: '', additionalPrice: '' }] }]
    }));
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

  return (
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
        <VariantItem
          key={variantIndex}
          variant={variant}
          variantIndex={variantIndex}
          onVariantChange={handleVariantChange}
          onOptionChange={handleOptionChange}
          onRemoveVariant={removeVariant}
          onAddOption={addOption}
          onRemoveOption={removeOption}
          errors={errors}
          variantsCount={formData.variants.length}
        />
      ))}
    </div>
  );
}