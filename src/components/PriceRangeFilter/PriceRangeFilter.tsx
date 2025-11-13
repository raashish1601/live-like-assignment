import { useState, useEffect } from 'react';
import './PriceRangeFilter.css';

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  currentMin: number;
  currentMax: number;
  minRating: number;
  onPriceRangeChange: (min: number, max: number) => void;
  onRatingChange: (rating: number) => void;
  onClose: () => void;
}

export const PriceRangeFilter = ({
  minPrice,
  maxPrice,
  currentMin,
  currentMax,
  minRating,
  onPriceRangeChange,
  onRatingChange,
  onClose,
}: PriceRangeFilterProps) => {
  const [localMin, setLocalMin] = useState(currentMin);
  const [localMax, setLocalMax] = useState(currentMax);
  const [localRating, setLocalRating] = useState(minRating);

  useEffect(() => {
    setLocalMin(currentMin);
    setLocalMax(currentMax);
    setLocalRating(minRating);
  }, [currentMin, currentMax, minRating]);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseFloat(event.target.value) || minPrice;
    setLocalMin(newMin);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseFloat(event.target.value) || maxPrice;
    setLocalMax(newMax);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRating = parseFloat(event.target.value) || 0;
    setLocalRating(newRating);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onPriceRangeChange(Math.min(localMin, localMax), Math.max(localMax, localMin));
    }, 300);

    return () => clearTimeout(timer);
  }, [localMin, localMax, onPriceRangeChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onRatingChange(localRating);
    }, 300);

    return () => clearTimeout(timer);
  }, [localRating, onRatingChange]);

  return (
    <div className="price-range-filter">
      <div className="price-range-filter__header">
        <h3 className="price-range-filter__title">Price Range Filter</h3>
        <button className="price-range-filter__close" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="price-range-filter__content">
        <div className="price-range-filter__slider-container">
          <label className="price-range-filter__label">Min Price: ${localMin.toFixed(2)}</label>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={localMin}
            onChange={handleMinChange}
            className="price-range-filter__slider"
            step="0.01"
          />
        </div>
        <div className="price-range-filter__slider-container">
          <label className="price-range-filter__label">Max Price: ${localMax.toFixed(2)}</label>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={localMax}
            onChange={handleMaxChange}
            className="price-range-filter__slider"
            step="0.01"
          />
        </div>
        <div className="price-range-filter__slider-container">
          <label className="price-range-filter__label">
            Min Rating: {localRating.toFixed(1)} ⭐
          </label>
          <input
            type="range"
            min="0"
            max="5"
            value={localRating}
            onChange={handleRatingChange}
            className="price-range-filter__slider"
            step="0.1"
          />
        </div>
        <div className="price-range-filter__range-display">
          <span>
            Price: ${localMin.toFixed(2)} - ${localMax.toFixed(2)} | Rating:{' '}
            {localRating.toFixed(1)}+ ⭐
          </span>
        </div>
      </div>
    </div>
  );
};
