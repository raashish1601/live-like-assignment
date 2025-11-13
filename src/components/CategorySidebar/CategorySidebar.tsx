import { formatCategoryName } from '../../utils/stringFormatter';
import './CategorySidebar.css';

interface CategorySidebarProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export const CategorySidebar = ({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategorySidebarProps) => {
  return (
    <div className="category-sidebar">
      <h2 className="category-sidebar__title">All categories</h2>
      <ul className="category-sidebar__list">
        <li
          className={`category-sidebar__item ${
            selectedCategory === null ? 'category-sidebar__item--active' : ''
          }`}
          onClick={() => onCategorySelect(null)}
        >
          All categories
        </li>
        {categories.map((category) => (
          <li
            key={category}
            className={`category-sidebar__item ${
              selectedCategory === category ? 'category-sidebar__item--active' : ''
            }`}
            onClick={() => onCategorySelect(category)}
          >
            {formatCategoryName(category)}
          </li>
        ))}
      </ul>
    </div>
  );
};
