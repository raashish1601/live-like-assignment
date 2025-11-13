import { useState, useEffect, useMemo } from 'react';
import { CategorySidebar } from './components/CategorySidebar/CategorySidebar';
import { FilterControls } from './components/FilterControls/FilterControls';
import { ProductList } from './components/ProductList/ProductList';
import { PriceRangeFilter } from './components/PriceRangeFilter/PriceRangeFilter';
import { ApiService } from './services/apiService';
import { addDiscountToProducts } from './utils/discountCalculator';
import { filterByPriceRange, sortProducts } from './utils/productFilter';
import { Product, SortOption } from './types';
import './App.css';
import './components/PriceRangeFilter/PriceRangeFilterOverlay.css';

function App() {
  const [categories, setCategories] = useState<string[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('none');
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [priceBounds, setPriceBounds] = useState({ min: 0, max: 1000 });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories and products on mount
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
        setAllProducts(productsData);

        // Calculate initial price range from products
        if (productsData.length > 0) {
          const prices = productsData.map((p) => p.price);
          const minPrice = Math.floor(Math.min(...prices));
          const maxPrice = Math.ceil(Math.max(...prices));
          setPriceBounds({ min: minPrice, max: maxPrice });
          setPriceRange({ min: minPrice, max: maxPrice });
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

  // Get products based on selected category
  const categoryProducts = useMemo(() => {
    if (!selectedCategory) {
      return allProducts;
    }
    return allProducts.filter((product) => product.category === selectedCategory);
  }, [allProducts, selectedCategory]);

  // Add discount information to products
  const productsWithDiscount = useMemo(() => {
    return addDiscountToProducts(categoryProducts);
  }, [categoryProducts]);

  // Filter products by price range
  const filteredProducts = useMemo(() => {
    return filterByPriceRange(
      productsWithDiscount,
      priceRange.min,
      priceRange.max
    );
  }, [productsWithDiscount, priceRange]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortOption);
  }, [filteredProducts, sortOption]);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    // Reset sort option when switching categories (discount sorting only for all categories)
    if (category !== null && (sortOption === 'discount-asc' || sortOption === 'discount-desc')) {
      setSortOption('none');
    }
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  if (loading) {
    return (
      <div className="app-loading">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="app">
      <CategorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      <div className="app__content">
        <FilterControls
          sortOption={sortOption}
          onSortChange={setSortOption}
          onFilterClick={() => setShowPriceFilter(true)}
          isAllCategoriesSelected={selectedCategory === null}
        />
        <ProductList
          products={sortedProducts}
          quantities={quantities}
          onQuantityChange={handleQuantityChange}
        />
      </div>
      {showPriceFilter && (
        <>
          <div
            className="price-range-filter-overlay"
            onClick={() => setShowPriceFilter(false)}
          />
          <PriceRangeFilter
            minPrice={priceBounds.min}
            maxPrice={priceBounds.max}
            currentMin={priceRange.min}
            currentMax={priceRange.max}
            onPriceRangeChange={handlePriceRangeChange}
            onClose={() => setShowPriceFilter(false)}
          />
        </>
      )}
    </div>
  );
}

export default App;

