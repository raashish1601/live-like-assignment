import './PriceRangeFilter.css';

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  currentMin: number;
  currentMax: number;
  onPriceRangeChange: (min: number, max: number) => void;
  onClose: () => void;
}

export const PriceRangeFilter = ({
  minPrice,
  maxPrice,
  currentMin,
  currentMax,
  onPriceRangeChange,
  onClose,
}: PriceRangeFilterProps) => {
  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseFloat(event.target.value) || minPrice;
    onPriceRangeChange(Math.min(newMin, currentMax), currentMax);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseFloat(event.target.value) || maxPrice;
    onPriceRangeChange(currentMin, Math.max(newMax, currentMin));
  };

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
          <label className="price-range-filter__label">
            Min Price: ${currentMin.toFixed(2)}
          </label>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={currentMin}
            onChange={handleMinChange}
            className="price-range-filter__slider"
            step="0.01"
          />
        </div>
        <div className="price-range-filter__slider-container">
          <label className="price-range-filter__label">
            Max Price: ${currentMax.toFixed(2)}
          </label>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={currentMax}
            onChange={handleMaxChange}
            className="price-range-filter__slider"
            step="0.01"
          />
        </div>
        <div className="price-range-filter__range-display">
          <span>Range: ${currentMin.toFixed(2)} - ${currentMax.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

