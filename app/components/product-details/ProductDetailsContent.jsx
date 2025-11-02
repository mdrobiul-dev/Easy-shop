"use client";

import { useState } from "react";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductTabs } from "./ProductTabs";
import { RelatedProducts } from "./RelatedProducts";

export function ProductDetailsContent({ product, relatedProducts }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specifications");

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const addToCart = () => {
    alert(`Added ${quantity} ${product.title} to cart!`);
  };

  const buyNow = () => {
    alert("Proceeding to checkout!");
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <ProductImageGallery 
            product={product}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
          />
          
          <ProductInfo 
            product={product}
            quantity={quantity}
            onIncrement={incrementQuantity}
            onDecrement={decrementQuantity}
            onAddToCart={addToCart}
            onBuyNow={buyNow}
          />
        </div>
      </div>

      <ProductTabs 
        product={product}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <RelatedProducts products={relatedProducts} />
    </>
  );
}