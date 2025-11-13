import { ProductWithDiscount, SortOption } from '../types';

/**
 * Filters products based on price range
 * @param products - Array of products to filter
 * @param minPrice - Minimum price
 * @param maxPrice - Maximum price
 * @returns Filtered array of products
 */
export const filterByPriceRange = (
  products: ProductWithDiscount[],
  minPrice: number,
  maxPrice: number
): ProductWithDiscount[] => {
  return products.filter((product) => {
    const priceToCheck = product.discountedPrice || product.price;
    return priceToCheck >= minPrice && priceToCheck <= maxPrice;
  });
};

/**
 * Sorts products based on the selected sort option
 * @param products - Array of products to sort
 * @param sortOption - Sort option (price-asc, price-desc, discount-asc, discount-desc)
 * @returns Sorted array of products
 */
export const sortProducts = (
  products: ProductWithDiscount[],
  sortOption: SortOption
): ProductWithDiscount[] => {
  const sortedProducts = [...products];

  switch (sortOption) {
    case 'price-asc':
      return sortedProducts.sort((a, b) => {
        const priceA = a.discountedPrice || a.price;
        const priceB = b.discountedPrice || b.price;
        return priceA - priceB;
      });

    case 'price-desc':
      return sortedProducts.sort((a, b) => {
        const priceA = a.discountedPrice || a.price;
        const priceB = b.discountedPrice || b.price;
        return priceB - priceA;
      });

    case 'discount-asc':
      return sortedProducts.sort((a, b) => a.discount - b.discount);

    case 'discount-desc':
      return sortedProducts.sort((a, b) => b.discount - a.discount);

    default:
      return sortedProducts;
  }
};

