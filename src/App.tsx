import { useState, useMemo, useEffect } from 'react';
import { CategorySidebar } from './components/CategorySidebar/CategorySidebar';
import { FilterControls } from './components/FilterControls/FilterControls';
import { ProductList } from './components/ProductList/ProductList';
import { PriceRangeFilter } from './components/PriceRangeFilter/PriceRangeFilter';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { useProducts } from './hooks/useProducts';
import { addDiscountToProducts } from './utils/discountCalculator';
import { filterByPriceRange, filterByRating, sortProducts } from './utils/productFilter';
import { SortOption } from './types';
import { DEFAULT_PRICE_RANGE } from './constants';
import './App.css';
import './components/PriceRangeFilter/PriceRangeFilterOverlay.css';

function App() {
  const { products: allProducts, categories, loading, error, priceBounds } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('none');
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [priceRange, setPriceRange] = useState(DEFAULT_PRICE_RANGE);
  const [minRating, setMinRating] = useState(0);
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  useEffect(() => {
    if (priceBounds.max > DEFAULT_PRICE_RANGE.max) {
      setPriceRange(priceBounds);
    }
  }, [priceBounds]);

  const categoryProducts = useMemo(() => {
    if (!selectedCategory) {
      return allProducts;
    }
    return allProducts.filter((product) => product.category === selectedCategory);
  }, [allProducts, selectedCategory]);

  const productsWithDiscount = useMemo(() => {
    return addDiscountToProducts(categoryProducts);
  }, [categoryProducts]);

  const filteredByPrice = useMemo(() => {
    return filterByPriceRange(productsWithDiscount, priceRange.min, priceRange.max);
  }, [productsWithDiscount, priceRange]);

  const filteredProducts = useMemo(() => {
    return filterByRating(filteredByPrice, minRating);
  }, [filteredByPrice, minRating]);

  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortOption);
  }, [filteredProducts, sortOption]);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
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

  const handleRatingChange = (rating: number) => {
    setMinRating(rating);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
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
          <div className="price-range-filter-overlay" onClick={() => setShowPriceFilter(false)} />
          <PriceRangeFilter
            minPrice={priceBounds.min}
            maxPrice={priceBounds.max}
            currentMin={priceRange.min}
            currentMax={priceRange.max}
            minRating={minRating}
            onPriceRangeChange={handlePriceRangeChange}
            onRatingChange={handleRatingChange}
            onClose={() => setShowPriceFilter(false)}
          />
        </>
      )}
    </div>
  );
}

export default App;
