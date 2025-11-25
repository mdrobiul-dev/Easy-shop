"use client";

import { useState } from "react";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductTabs } from "./ProductTabs";
import { RelatedProducts } from "./RelatedProducts";
import { useCart } from "../../context/CartContext"; 

export function ProductDetailsContent({ product, relatedProducts }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specifications");
  const { addToCart } = useCart(); 

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const handleAddToCart = () => {
   
    const cartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      originalPrice: product.price * 1.2,
      image: product.thumbnail,
      category: product.category,
      inStock: product.stock > 0,
      maxQuantity: product.stock,
      brand: product.brand,
      description: product.description,
      rating: product.rating
    };
    
   
    for (let i = 0; i < quantity; i++) {
      addToCart(cartItem);
    }
    
    // alert(`Added ${quantity} ${product.title} to cart!`);
  };

  const buyNow = () => {
   t
    handleAddToCart();
    // You can add redirect to checkout here if you have a checkout page
    // router.push('/checkout');
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
            onAddToCart={handleAddToCart} 
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