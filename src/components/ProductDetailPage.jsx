import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../App";

function ProductDetailPage() {
  const { id } = useParams();
  const { products, dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="text-center text-lg mt-10 text-gray-600">
        Product not found.
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    navigate("/cart"); // Optionally navigate to cart after adding
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-100 py-10">
      <div className="container mx-auto p-6 bg-white rounded-2xl shadow-xl flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
        {/* Product Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full h-auto rounded-2xl shadow-lg hover:scale-105 transform transition duration-500"
            style={{ maxWidth: "400px" }}
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-3xl font-bold text-indigo-600 mb-6">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">{product.description}</p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-black hover:to-black text-white font-bold py-3 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
