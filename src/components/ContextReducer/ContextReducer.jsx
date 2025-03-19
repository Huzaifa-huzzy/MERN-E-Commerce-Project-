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

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user || !user.token) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, user]);

  const fetchServerCart = async () => {
    if (!user || !user.token) {
      setServerCart(null);
      return;
    }

    setIsLoading(true);
    try {
      if (!API_URL) {
        throw new Error('VITE_API_URL is not defined in the .env file');
      }
      const response = await axios.get(`${API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const serverCartData = response.data.cart || response.data;
      setServerCart(serverCartData);
      setIsLoading(false);
    } catch (error) {
      setServerCart(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServerCart();
  }, [user]);

  const addToCart = async (product) => {
    setIsLoading(true);
    if (!user || !user.token) {
      setIsLoading(false);
      return false; // Return false if user is not logged in
    }

    try {
      if (!API_URL) {
        throw new Error('VITE_API_URL is not defined in the .env file');
      }
      await axios.post(
        `${API_URL}/api/cart/add`,
        { productId: product._id, quantity: product.quantity || 1 },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      await fetchServerCart();
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const removeFromCart = async (productId) => {
    setIsLoading(true);
    if (user && user.token) {
      try {
        if (!API_URL) {
          throw new Error('VITE_API_URL is not defined in the .env file');
        }
        await axios.delete(
          `${API_URL}/api/cart/remove/${productId}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        await fetchServerCart();
        return true;
      } catch (error) {
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