// import React from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import all component pages
import HomePage from './components/HomePage';
import ProductListing from './components/ProductListing';
import ProductDetails from './components/ProductDetails';
import AddProducts from './components/AddProducts';
import EditProduct from './components/EditProduct';
import CartPage from './components/CartPage';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound'; // Fallback for undefined routes

function App() {
  // Global state to manage items in the cart across the application
  const [cartItems, setCartItems] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    // Add the selected product to the existing cart
    setCartItems((prevItems) => [...prevItems, product]);
  };

  // Function to remove a product from the cart by ID
  const removeFromCart = (id) => {
    // Filter out the product with the given ID
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      {/* NavBar receives cartCount as a prop to display number of items */}
      <NavBar cartCount={cartItems.length} />

      {/* Define the routes using React Router */}
      <Routes>
        {/* Home route */}
        <Route path="/" element={<HomePage />} />

        {/* Product listing route */}
        <Route path="/products" element={<ProductListing />} />

        {/* Product details page with addToCart passed as prop */}
        <Route
          path="/products/:productId"
          element={<ProductDetails addToCart={addToCart} />}
        />

        {/* Add new product page */}
        <Route path="/add-product" element={<AddProducts />} />

        {/* Edit existing product page */}
        <Route path="/edit-product/:id" element={<EditProduct />} />

        {/* Cart page with cartItems and removeFromCart passed as props */}
        <Route
          path="/cart"
          element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} />}
        />

        {/* Fallback route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
// This is the main App component that sets up the routing and global state for the application.