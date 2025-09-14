import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../App';

function ProductDetailPage() {
  const { id } = useParams();
  const { products, dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="text-center text-lg mt-10">Product not found.</div>;
  }

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    navigate('/cart'); // Optionally navigate to cart after adding
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
      <div className="md:w-1/2 flex justify-center">
        <img src={product.image} alt={product.name} className="max-w-full h-auto rounded-lg shadow-md" style={{ maxWidth: '400px' }} />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
        <p className="text-2xl font-semibold text-blue-600 mb-6">${product.price.toFixed(2)}</p>
        <p className="text-gray-700 leading-relaxed mb-8">{product.description}</p>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Add to Cart
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;