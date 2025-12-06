export default function BasicInfoSection({
  formData,
  handleInputChange,
  errors,
  categories,
  isLoadingCategories
}) {
  return (
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
  );
}