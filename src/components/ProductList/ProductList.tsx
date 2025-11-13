import { ProductWithDiscount } from '../../types';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductList.css';

interface ProductListProps {
  products: ProductWithDiscount[];
  quantities: Record<number, number>;
  onQuantityChange: (productId: number, quantity: number) => void;
}

export const ProductList = ({
  products,
  quantities,
  onQuantityChange,
}: ProductListProps) => {
  if (products.length === 0) {
    return (
      <div className="product-list product-list--empty">
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantity={quantities[product.id] || 0}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </div>
  );
};

