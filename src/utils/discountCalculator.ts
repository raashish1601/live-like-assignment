import { Product, ProductWithDiscount } from '../types';
import { DISCOUNTS } from '../constants';

export const getDiscountPercentage = (category: string): number => {
  const categoryLower = category.toLowerCase();

  if (categoryLower.includes('jewel')) {
    return DISCOUNTS.JEWELLERY;
  }

  if (categoryLower.includes('men') && categoryLower.includes('clothing')) {
    return DISCOUNTS.MENS_CLOTHING;
  }

  return 0;
};

export const calculateDiscountedPrice = (price: number, discountPercentage: number): number => {
  return price * (1 - discountPercentage / 100);
};

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
