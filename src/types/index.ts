export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface Category {
  name: string;
}

export type SortOption = 'none' | 'price-asc' | 'price-desc' | 'discount-asc' | 'discount-desc';

export interface FilterState {
  selectedCategory: string | null;
  priceRange: {
    min: number;
    max: number;
  };
  sortOption: SortOption;
}

export interface ProductWithDiscount extends Product {
  discount: number;
  discountedPrice: number;
}
