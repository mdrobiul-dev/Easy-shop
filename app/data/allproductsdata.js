import { products } from "./data";

export  const categories = [
    { name: "All", value: "all", count: products.length },
    {
      name: "Electronics",
      value: "electronics",
      count: products.filter((p) => p.category.toLowerCase() === "electronics")
        .length,
    },
    {
      name: "Footwear",
      value: "footwear",
      count: products.filter((p) => p.category.toLowerCase() === "footwear")
        .length,
    },
    {
      name: "Accessories",
      value: "accessories",
      count: products.filter((p) => p.category.toLowerCase() === "accessories")
        .length,
    },
    {
      name: "Home",
      value: "home",
      count: products.filter((p) => p.category.toLowerCase() === "home").length,
    },
  ];



  export function filterAndSortProducts(products, filters, sortBy) {
  const { category, priceRange, inStockOnly } = filters;

  return products
    .filter((product) => {
      const categoryMatch =
        category === "all" || 
        product.category.toLowerCase() === category.toLowerCase();
      
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      
      // Use stock for availability check
      const stockMatch = !inStockOnly || product.stock > 0;
      
      return categoryMatch && priceMatch && stockMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
          // Use title for sorting since API uses 'title' not 'name'
          return a.title.localeCompare(b.title);
        default:
          return 0; // No featured field in API
      }
    });
}

