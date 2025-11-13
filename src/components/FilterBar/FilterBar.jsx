import React from 'react';
import { Filter, Grid } from 'lucide-react';
import './FilterBar.css';

const categories = ['All', 'Electronics', 'Clothing', 'Books'];
const sortOptions = [
  { value: 'name', label: 'Name A-Z' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' }
];

const FilterBar = ({ selectedCategory, onCategoryChange, sortBy, onSortChange, productCount }) => {
  return (
    <div className="filter-bar">
      <div className="filter-section">
        <div className="section-header">
          <Filter size={20} />
          <span>Categories</span>
        </div>
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <div className="section-header">
          <Grid size={20} />
          <span>Sort & Filter</span>
        </div>
        <div className="filter-controls">
          <select 
            value={sortBy} 
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-select"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="product-count">
            {productCount} product{productCount !== 1 ? 's' : ''} found
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;