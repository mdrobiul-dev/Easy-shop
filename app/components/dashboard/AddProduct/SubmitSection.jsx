import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function SubmitSection({
  isSubmitting,
  isLoadingCategories,
  errors
}) {
  return (
    <>
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
    </>
  );
}