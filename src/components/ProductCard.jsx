import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';

function ProductCard({ product }) {
  const { dispatch } = useContext(CartContext);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`} className="block">
        <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-4 rounded" />
        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">{product.name}</h3>
      </Link>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;