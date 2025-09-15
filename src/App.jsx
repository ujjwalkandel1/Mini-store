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
      image: "https://picsum.photos/400?random=1",
      description: "High-quality wireless headphones with noise cancellation."
    },
    {
      id: 2,
      name: "Smartwatch",
      price: 199.99,
      category: "Electronics",
      image: "https://picsum.photos/400?random=2",
      description: "Track your fitness and receive notifications."
    },
    {
      id: 3,
      name: "Leather Wallet",
      price: 45.00,
      category: "Accessories",
      image: "https://picsum.photos/400?random=3",
      description: "Genuine leather wallet with multiple card slots."
    },
    {
      id: 4,
      name: "Coffee Mug",
      price: 12.50,
      category: "Home Goods",
      image: "https://picsum.photos/400?random=4",
      description: "Ceramic coffee mug, perfect for your morning brew."
    },
    {
      id: 5,
      name: "Yoga Mat",
      price: 30.00,
      category: "Fitness",
      image: "https://picsum.photos/400?random=5",
      description: "Non-slip yoga mat for all your exercises."
    },
    {
      id: 6,
      name: "Desk Lamp",
      price: 25.00,
      category: "Home Goods",
      image: "https://picsum.photos/400?random=6",
      description: "Adjustable LED desk lamp."
    },
    {
      id: 7,
      name: "Bluetooth Speaker",
      price: 79.99,
      category: "Electronics",
      image: "https://picsum.photos/400?random=7",
      description: "Portable Bluetooth speaker with rich bass and long battery life."
    },
    {
      id: 8,
      name: "Running Shoes",
      price: 120.00,
      category: "Fitness",
      image: "https://picsum.photos/400?random=8",
      description: "Comfortable running shoes for long distance runs."
    },
    {
      id: 9,
      name: "Sunglasses",
      price: 35.00,
      category: "Accessories",
      image: "https://picsum.photos/400?random=9",
      description: "Stylish sunglasses with UV protection."
    },
    {
      id: 10,
      name: "Backpack",
      price: 65.00,
      category: "Accessories",
      image: "https://picsum.photos/400?random=10",
      description: "Durable backpack—perfect for travel or daily commute."
    },
    {
      id: 11,
      name: "Gaming Mouse",
      price: 49.99,
      category: "Electronics",
      image: "https://picsum.photos/400?random=11",
      description: "High precision gaming mouse with customizable buttons."
    },
    {
      id: 12,
      name: "Desk Organizer",
      price: 22.50,
      category: "Home Goods",
      image: "https://picsum.photos/400?random=12",
      description: "Keep your desk tidy with multiple compartments."
    },
    {
      id: 13,
      name: "Water Bottle",
      price: 18.00,
      category: "Fitness",
      image: "https://picsum.photos/400?random=13",
      description: "Stainless steel water bottle, keeps drinks hot or cold."
    },
    {
      id: 14,
      name: "E-reader",
      price: 129.99,
      category: "Electronics",
      image: "https://picsum.photos/400?random=14",
      description: "Lightweight e-reader with adjustable backlight."
    },
    {
      id: 15,
      name: "Throw Pillow",
      price: 25.00,
      category: "Home Goods",
      image: "https://picsum.photos/400?random=15",
      description: "Soft decorative throw pillow for your sofa or bed."
    },
    {
      id: 16,
      name: "Wireless Charger",
      price: 39.99,
      category: "Electronics",
      image: "https://picsum.photos/400?random=16",
      description: "Wireless charger pad compatible with most smartphones."
    }
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
