import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../App';
import { useLocation, useNavigate } from 'react-router-dom';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const { products, setProducts } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();


  // Reset search term if navigating away from home or if component mounts
  useEffect(() => {
    if (location.pathname !== '/') {
        setSearchTerm(''); // Clear search if not on the product listing page
    }
  }, [location.pathname]);


  const handleSearch = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
        navigate('/'); 
    }
    // The ProductListingPage will handle the actual filtering based on the search term
    // We'll pass the search term via context or props later if needed,
    // but for simplicity, we can just rely on the ProductListingPage to read the input.
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        placeholder="Search products..."
        className="p-2 rounded-l-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-md"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;