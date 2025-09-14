import React, { useState, useContext, useEffect } from 'react';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import { CartContext } from '../App';
import { useLocation } from 'react-router-dom';

function ProductListingPage() {
  const { products } = useContext(CartContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({ category: 'All', price: { min: 0, max: 500 } });
  const location = useLocation(); // To get search query from URL if we pass it that way

  // Example of how to get a search query from URL (if using URL params or query strings)
  // const query = new URLSearchParams(location.search).get('search');
  // For simplicity here, we'll assume search is handled more directly or passed via context.

  useEffect(() => {
    let tempProducts = [...products];

    // Apply category filter
    if (filters.category !== 'All') {
      tempProducts = tempProducts.filter(product => product.category === filters.category);
    }

    // Apply price filter
    tempProducts = tempProducts.filter(product =>
      product.price >= filters.price.min && product.price <= filters.price.max
    );

    // Apply search filter (if search term were passed via context or props)
    // const searchTerm = /* get search term from context or state in Header/SearchBar */;
    // if (searchTerm) {
    //   tempProducts = tempProducts.filter(product =>
    //     product.name.toLowerCase().includes(searchTerm.toLowerCase())
    //   );
    // }

    setFilteredProducts(tempProducts);
  }, [products, filters]); // Re-run when products or filters change

  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <FilterSidebar onFilterChange={handleFilterChange} products={products} />
      <div className="flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-600 text-lg mt-10">No products found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default ProductListingPage;