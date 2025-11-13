import { Product } from '../types';

const API_BASE_URL = 'https://fakestoreapi.com';

export class ApiService {
  /**
   * Fetches all products from the API
   * @returns Promise<Product[]> Array of all products
   */
  static async fetchAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  /**
   * Fetches all available categories
   * @returns Promise<string[]> Array of category names
   */
  static async fetchCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
}

