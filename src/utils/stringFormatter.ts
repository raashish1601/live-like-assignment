/**
 * Formats category name for display
 * Capitalizes first letter of each word and handles special cases
 * @param category - Category name string
 * @returns Formatted category name
 */
export const formatCategoryName = (category: string): string => {
  return category
    .split(' ')
    .map((word) => {
      // Handle apostrophes (e.g., "men's" -> "Men's")
      if (word.includes("'")) {
        const parts = word.split("'");
        return parts[0].charAt(0).toUpperCase() + parts[0].slice(1) + "'" + parts[1];
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

