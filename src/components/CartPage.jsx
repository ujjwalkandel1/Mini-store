import React, { useContext } from 'react';
import { CartContext } from '../App';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const { cart, dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  
  const handleRemoveFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return; 
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center text-lg mt-10">
        <p>Your cart is empty.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Shopping Cart</h1>
      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  className="p-2 hover:bg-gray-200 rounded-l-md"
                >-</button>
                <span className="px-4 py-2 border-l border-r">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-gray-200 rounded-r-md"
                >+</button>
              </div>
              <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end items-center space-x-6">
        <h2 className="text-2xl font-bold">Total: ${calculateTotal()}</h2>
        <button
          onClick={() => alert('Proceeding to checkout! (Not implemented)')}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;