import { Plus, Trash2, X } from 'lucide-react';

export default function VariantItem({
  variant,
  variantIndex,
  onVariantChange,
  onOptionChange,
  onRemoveVariant,
  onAddOption,
  onRemoveOption,
  errors,
  variantsCount
}) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg space-y-4 bg-gray-50">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">Variant {variantIndex + 1}</h4>
        {variantsCount > 1 && (
          <button
            type="button"
            onClick={() => onRemoveVariant(variantIndex)}
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
            onChange={(e) => onVariantChange(variantIndex, 'name', e.target.value)}
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
            onClick={() => onAddOption(variantIndex)}
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
                onChange={(e) => onOptionChange(variantIndex, optionIndex, 'value', e.target.value)}
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
                onChange={(e) => onOptionChange(variantIndex, optionIndex, 'additionalPrice', e.target.value)}
                className="w-full px-3 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              />
            </div>
            {variant.options.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveOption(variantIndex, optionIndex)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}