import { useState, useEffect } from 'react';
import { ApiService } from '../services/apiService';
import { Product } from '../types';

interface UseProductsReturn {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  priceBounds: { min: number; max: number };
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceBounds, setPriceBounds] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [categoriesData, productsData] = await Promise.all([
          ApiService.fetchCategories(),
          ApiService.fetchAllProducts(),
        ]);

        setCategories(categoriesData);
        setProducts(productsData);

        if (productsData.length > 0) {
          const prices = productsData.map((p) => p.price);
          const minPrice = Math.floor(Math.min(...prices));
          const maxPrice = Math.ceil(Math.max(...prices));
          setPriceBounds({ min: minPrice, max: maxPrice });
        }
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, categories, loading, error, priceBounds };
};
