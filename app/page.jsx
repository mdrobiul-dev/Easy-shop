"use client";
import { useState } from "react";
import Newsletter from "./components/home/Newsletter";
import Hero from "./components/home/Hero";
import Categories from "./components/home/Categories";
import Featured from "./components/home/Featured";
import Header from "./components/home/Header";

export default function LandingPage() {
  const [cartCount, setCartCount] = useState(0);
 

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount}/>

      <Hero />

      <Categories />

      <Featured addToCart={addToCart} />

      <Newsletter />
    </div>
  );
}
