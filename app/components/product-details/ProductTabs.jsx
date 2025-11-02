"use client";

export function ProductTabs({ product, activeTab, onTabChange }) {
  const tabs = [
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: "Reviews" },
    { id: "shipping", label: "Shipping & Returns" },
  ];

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-8">
        {activeTab === "specifications" && <SpecificationsTab product={product} />}
        {activeTab === "reviews" && <ReviewsTab reviews={product.reviews} />}
        {activeTab === "shipping" && <ShippingTab product={product} />}
      </div>
    </div>
  );
}

function SpecificationsTab({ product }) {
  const specifications = {
    "Brand": product.brand,
    "Category": product.category,
    "Weight": product.weight ? `${product.weight} units` : null,
    "Dimensions": product.dimensions ? 
      `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth}` : null,
    "SKU": product.sku,
    "Minimum Order": product.minimumOrderQuantity ? `${product.minimumOrderQuantity} units` : null,
    "Warranty": product.warrantyInformation,
    "Availability": product.availabilityStatus,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {Object.entries(specifications).map(([key, value]) => 
        value && (
          <div key={key} className="flex justify-between py-2 border-b border-gray-100">
            <span className="font-medium text-gray-900">{key}</span>
            <span className="text-gray-600 capitalize">{value}</span>
          </div>
        )
      )}
    </div>
  );
}

function ReviewsTab({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">{review.reviewerName}</span>
              <div className="flex text-yellow-400 text-sm">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-600">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

function ShippingTab({ product }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Shipping Information</h4>
        <p className="text-gray-600">{product.shippingInformation}</p>
      </div>
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Return Policy</h4>
        <p className="text-gray-600">{product.returnPolicy}</p>
      </div>
    </div>
  );
}