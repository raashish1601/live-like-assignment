import { Product, ProductWithDiscount } from '../types';

/**
 * Calculates discount percentage based on category
 * @param category - Product category name
 * @returns Discount percentage (0-100)
 */
export const getDiscountPercentage = (category: string): number => {
  const categoryLower = category.toLowerCase();
  
  // Handle "jewelery" (API spelling) and "jewellery" (common spelling)
  if (categoryLower.includes('jewel')) {
    return 10;
  }
  
  // Handle "men's clothing" category
  if (categoryLower.includes("men") && categoryLower.includes("clothing")) {
    return 30;
  }
  
  return 0;
};

/**
 * Calculates discounted price for a product
 * @param price - Original price
 * @param discountPercentage - Discount percentage
 * @returns Discounted price
 */
export const calculateDiscountedPrice = (price: number, discountPercentage: number): number => {
  return price * (1 - discountPercentage / 100);
};

/**
 * Adds discount information to products
 * @param products - Array of products
 * @returns Array of products with discount information
 */
export const addDiscountToProducts = (products: Product[]): ProductWithDiscount[] => {
  return products.map((product) => {
    const discountPercentage = getDiscountPercentage(product.category);
    const discountedPrice = calculateDiscountedPrice(product.price, discountPercentage);
    
    return {
      ...product,
      discount: discountPercentage,
      discountedPrice: discountedPrice,
    };
  });
};

