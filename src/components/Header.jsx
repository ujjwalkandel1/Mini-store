import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../App";
import SearchBar from "./SearchBar";
import { FaShoppingCart } from "react-icons/fa"; 

function Header() {
  const { cart } = useContext(CartContext);

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-gray-800 tracking-wide hover:text-indigo-600 transition"
        >
          MyShop
        </Link>

        {/* Search Bar */}
        <div className="mx-120 sm:flex sm:mx-6">
          <SearchBar />
        </div>

        {/* Cart Icon */}
        <Link
          to="/cart"
          className="relative flex items-center justify-center p-3 rounded-full hover:bg-gray-100 transition-transform transform hover:scale-110"
        >
          {/* Cart Icon */}
          <FaShoppingCart className="h-7 w-7 text-gray-700" />

          {/* Badge */}
          {totalItemsInCart > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center shadow-md animate-pulse">
              {totalItemsInCart}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
