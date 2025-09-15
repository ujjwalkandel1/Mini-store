import React, { useState, createContext, useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ProductListingPage from './components/ProductListingPage.jsx';
import ProductDetailPage from './components/ProductDetailPage.jsx';
import CartPage from './components/CartPage.jsx';

// Create a Context for the cart
export const CartContext = createContext();

// Simple reducer for cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);
    case 'UPDATE_QUANTITY':
        return state.map(item =>
            item.id === action.payload.id
                ? { ...item, quantity: action.payload.quantity }
                : item
        );
    default:
      return state;
  }
};


function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [products, setProducts] = useState([
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    category: "Electronics",
    image: "https://picsum.photos/200/200?random=1",
    description: "High-quality wireless headphones with noise cancellation.",
  },
  {
    id: 2,
    name: "Smartwatch",
    price: 199.99,
    category: "Electronics",
    image: "https://picsum.photos/200/200?random=2",
    description: "Track your fitness and receive notifications.",
  },
  {
    id: 3,
    name: "Leather Wallet",
    price: 45.0,
    category: "Accessories",
    image: "https://picsum.photos/200/200?random=3",
    description: "Genuine leather wallet with multiple card slots.",
  },
  {
    id: 4,
    name: "Coffee Mug",
    price: 12.5,
    category: "Home Goods",
    image: "https://picsum.photos/200/200?random=4",
    description: "Ceramic coffee mug, perfect for your morning brew.",
  },
  {
    id: 5,
    name: "Yoga Mat",
    price: 30.0,
    category: "Fitness",
    image: "https://picsum.photos/200/200?random=5",
    description: "Non-slip yoga mat for all your exercises.",
  },
  {
    id: 6,
    name: "Desk Lamp",
    price: 25.0,
    category: "Home Goods",
    image: "https://picsum.photos/200/200?random=6",
    description: "Adjustable LED desk lamp.",
  },
]);


  return (
    <CartContext.Provider value={{ cart, dispatch, products, setProducts }}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<ProductListingPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartContext.Provider>
  );
}

export default App;