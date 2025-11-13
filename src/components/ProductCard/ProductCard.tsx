import { ProductWithDiscount } from '../../types';
import './ProductCard.css';

interface ProductCardProps {
  product: ProductWithDiscount;
  quantity: number;
  onQuantityChange: (productId: number, quantity: number) => void;
}

export const ProductCard = ({ product, quantity, onQuantityChange }: ProductCardProps) => {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === '') {
      onQuantityChange(product.id, 0);
      return;
    }

    if (value.startsWith('0') && value.length > 1) {
      const newValue = value.replace(/^0+/, '');
      if (newValue === '') {
        onQuantityChange(product.id, 0);
        return;
      }
      const newQuantity = parseInt(newValue, 10);
      if (!isNaN(newQuantity)) {
        onQuantityChange(product.id, newQuantity);
      }
      return;
    }

    const newQuantity = parseInt(value, 10);
    if (!isNaN(newQuantity)) {
      onQuantityChange(product.id, newQuantity);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === '0') {
      event.target.select();
    }
  };

  const displayPrice = product.discountedPrice || product.price;
  const hasDiscount = product.discount > 0;

  return (
    <div className="product-card">
      <h3 className="product-card__title">{product.title}</h3>
      <div className="product-card__content">
        <div className="product-card__image-container">
          <img src={product.image} alt={product.title} className="product-card__image" />
        </div>
        <div className="product-card__details">
          <div className="product-card__price-container">
            {hasDiscount && (
              <span className="product-card__original-price">${product.price.toFixed(2)}</span>
            )}
            <span className="product-card__price">${displayPrice.toFixed(2)}</span>
            {hasDiscount && (
              <span className="product-card__discount-badge">-{product.discount}%</span>
            )}
          </div>
          <div className="product-card__rating-container">
            <span className="product-card__rating">
              ⭐ {product.rating.rate.toFixed(1)} ({product.rating.count})
            </span>
          </div>
          <div className="product-card__quantity-container">
            <label className="product-card__quantity-label">Quantity:</label>
            <input
              type="number"
              min="0"
              value={quantity || ''}
              onChange={handleQuantityChange}
              onFocus={handleFocus}
              className="product-card__quantity-input"
            />
          </div>
          <div className="product-card__description-container">
            <label className="product-card__description-label">Description:</label>
            <p className="product-card__description">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
