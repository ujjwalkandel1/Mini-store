// components/SearchBar.js
import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // search icon from react-icons

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { products, setProducts } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/") {
      setSearchTerm(""); // Clear search if not on home
    }
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
    }
    // ProductListingPage will handle filtering
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-md shadow-md">
      <input
        type="text"
        placeholder="Search "
        className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 transition"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white p-3 rounded-r-lg transition shadow-lg"
      >
        <FaSearch className="mr-2" />
        Search
      </button>
    </form>
  );
}

export default SearchBar;
