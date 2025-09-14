import React, { useState, useEffect } from 'react';

function FilterSidebar({ onFilterChange, products }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 }); // Example max price
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    // Dynamically get categories from products
    const categories = ['All', ...new Set(products.map(p => p.category))];
    setAvailableCategories(categories);
  }, [products]);


  useEffect(() => {
    onFilterChange({
      category: selectedCategory,
      price: priceRange,
    });
  }, [selectedCategory, priceRange, onFilterChange]); // Re-run effect when filters change

  return (
    <div className="w-full md:w-64 p-4 bg-gray-100 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Category</h3>
        {availableCategories.map(category => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="radio"
              id={category}
              name="category"
              value={category}
              checked={selectedCategory === category}
              onChange={() => setSelectedCategory(category)}
              className="mr-2"
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
            className="w-1/2 p-2 border rounded-md"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
            className="w-1/2 p-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;