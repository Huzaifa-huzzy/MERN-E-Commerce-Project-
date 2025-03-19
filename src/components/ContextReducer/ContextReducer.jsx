// src/components/ContextReducer/ContextReducer.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [user, setUser] = useState(() => {
    const savedToken = localStorage.getItem('token');
    return savedToken ? { token: savedToken } : null;
  });
  const [serverCart, setServerCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only store cart in localStorage for non-authenticated users
    if (!user || !user.token) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, user]);

  // Fetch server cart whenever user changes (login/logout) or after cart operations
  const fetchServerCart = async () => {
    if (!user || !user.token) {
      setServerCart(null);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const serverCartData = response.data.cart || response.data;
      setServerCart(serverCartData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setServerCart(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServerCart();
  }, [user]);

  const addToCart = async (product) => {
    setIsLoading(true);
    if (user && user.token) {
      try {
        await axios.post(
          'http://localhost:5000/api/cart/add',
          { productId: product._id, quantity: product.quantity || 1 },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        // Fetch updated cart from server after adding item
        await fetchServerCart();
        return true;
      } catch (error) {
        console.error('Error adding to server cart:', error);
        setIsLoading(false);
        throw error;
      }
    } else {
      setCart((prevCart) => {
        const existingItem = prevCart.find(item => String(item._id) === String(product._id));
        if (existingItem) {
          return prevCart.map(item =>
            String(item._id) === String(product._id)
              ? { ...item, quantity: (item.quantity || 1) + (product.quantity || 1) }
              : item
          );
        }
        return [...prevCart, { ...product, quantity: product.quantity || 1 }];
      });
      setIsLoading(false);
      return true;
    }
  };

  const removeFromCart = async (productId) => {
    setIsLoading(true);
    if (user && user.token) {
      try {
        await axios.delete(
          `http://localhost:5000/api/cart/remove/${productId}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        // Fetch updated cart from server after removing item
        await fetchServerCart();
        return true;
      } catch (error) {
        console.error('Error removing from server cart:', error);
        setIsLoading(false);
        throw error;
      }
    } else {
      setCart((prevCart) => prevCart.filter(item => String(item._id) !== String(productId)));
      setIsLoading(false);
      return true;
    }
  };

  const handleLogin = async (userData) => {
    const updatedUser = {
      id: userData.id,
      username: userData.name,
      email: userData.email,
      token: localStorage.getItem('token'),
    };
    setUser(updatedUser);
    // Clear local cart when logging in
    localStorage.removeItem('cart');
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setServerCart(null);
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
  };

  const getCartItemCount = () => {
    const activeCart = user && user.token && serverCart ? serverCart.products || [] : cart;
    return activeCart.reduce((total, item) => total + (item.quantity || item.totalQuantity || 1), 0);
  };

  const value = {
    cart,
    serverCart,
    isLoading,
    addToCart,
    removeFromCart,
    user,
    handleLogin,
    handleLogout,
    getCartItemCount,
    fetchServerCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}