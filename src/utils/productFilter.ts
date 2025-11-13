import { ProductWithDiscount, SortOption } from '../types';

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

export const filterByRating = (
  products: ProductWithDiscount[],
  minRating: number
): ProductWithDiscount[] => {
  return products.filter((product) => product.rating.rate >= minRating);
};

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
