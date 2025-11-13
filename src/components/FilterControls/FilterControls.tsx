import { SortOption } from '../../types';
import './FilterControls.css';

interface FilterControlsProps {
  sortOption: SortOption;
  onSortChange: (sortOption: SortOption) => void;
  onFilterClick: () => void;
  isAllCategoriesSelected: boolean;
}

export const FilterControls = ({
  sortOption,
  onSortChange,
  onFilterClick,
  isAllCategoriesSelected,
}: FilterControlsProps) => {
  const handleSortClick = () => {
    const sortOptions: SortOption[] = [
      'none',
      'price-asc',
      'price-desc',
      ...(isAllCategoriesSelected ? (['discount-asc', 'discount-desc'] as SortOption[]) : []),
    ];

    const currentIndex = sortOptions.indexOf(sortOption);
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    onSortChange(sortOptions[nextIndex]);
  };

  const getSortButtonText = (): string => {
    switch (sortOption) {
      case 'price-asc':
        return 'Sorting: Price (Low to High)';
      case 'price-desc':
        return 'Sorting: Price (High to Low)';
      case 'discount-asc':
        return 'Sorting: Discount (Low to High)';
      case 'discount-desc':
        return 'Sorting: Discount (High to Low)';
      default:
        return 'Sorting';
    }
  };

  return (
    <div className="filter-controls">
      <button
        className={`filter-controls__button filter-controls__button--sort ${
          sortOption !== 'none' ? 'filter-controls__button--active' : ''
        }`}
        onClick={handleSortClick}
      >
        {getSortButtonText()}
      </button>
      <button
        className="filter-controls__button filter-controls__button--filter"
        onClick={onFilterClick}
      >
        Filtering
      </button>
    </div>
  );
};
