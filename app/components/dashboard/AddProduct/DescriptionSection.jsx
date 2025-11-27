export default function DescriptionSection({
  formData,
  handleInputChange,
  errors
}) {
  return (
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
  );
}