import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from '../ContextReducer/ContextReducer';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { getCartItemCount } = useCart();

  const cartItemCount = getCartItemCount();

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkAuthStatus();
    window.addEventListener('storage', checkAuthStatus);
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white">My-Clothes</span>
          </div>

          <div className="hidden sm:flex sm:items-center space-x-8">
            <NavLink to="/" className={({ isActive }) => `text-white hover:text-indigo-200 transition-colors duration-200 ${isActive ? "border-b-2 border-white" : ""}`}>Home</NavLink>
            <NavLink to="/shop" className={({ isActive }) => `text-white hover:text-indigo-200 transition-colors duration-200 ${isActive ? "border-b-2 border-white" : ""}`}>Shop</NavLink>
            <NavLink to="/about" className={({ isActive }) => `text-white hover:text-indigo-200 transition-colors duration-200 ${isActive ? "border-b-2 border-white" : ""}`}>About</NavLink>
            <NavLink to="/services" className={({ isActive }) => `text-white hover:text-indigo-200 transition-colors duration-200 ${isActive ? "border-b-2 border-white" : ""}`}>Services</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `text-white hover:text-indigo-200 transition-colors duration-200 ${isActive ? "border-b-2 border-white" : ""}`}>Contact</NavLink>
            
            {isLoggedIn && (
              <NavLink to="/cart" className="relative text-white hover:text-indigo-200 transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </NavLink>
            )}

            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-white hover:text-indigo-200 transition-colors duration-200 px-4 py-2 rounded-md border border-white hover:bg-indigo-700">Logout</button>
            ) : (
              <>
                <NavLink to="/login" className="text-white hover:text-indigo-200 transition-colors duration-200 px-4 py-2 rounded-md border border-white hover:bg-indigo-700">Login</NavLink>
                <NavLink to="/signup" className="text-white hover:text-indigo-200 transition-colors duration-200 px-4 py-2 rounded-md bg-indigo-700 hover:bg-indigo-800">Signup</NavLink>
              </>
            )}
          </div>

          <div className="sm:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-white hover:text-indigo-200 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`sm:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-indigo-700">
          <NavLink to="/shop" className={({ isActive }) => `block px-3 py-2 text-white hover:bg-indigo-600 rounded-md ${isActive ? "bg-indigo-800" : ""}`} onClick={() => setIsOpen(false)}>Shop</NavLink>
          <NavLink to="/about" className={({ isActive }) => `block px-3 py-2 text-white hover:bg-indigo-600 rounded-md ${isActive ? "bg-indigo-800" : ""}`} onClick={() => setIsOpen(false)}>About</NavLink>
          <NavLink to="/services" className={({ isActive }) => `block px-3 py-2 text-white hover:bg-indigo-600 rounded-md ${isActive ? "bg-indigo-800" : ""}`} onClick={() => setIsOpen(false)}>Services</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `block px-3 py-2 text-white hover:bg-indigo-600 rounded-md ${isActive ? "bg-indigo-800" : ""}`} onClick={() => setIsOpen(false)}>Contact</NavLink>
          
          {isLoggedIn && (
            <NavLink to="/cart" className={({ isActive }) => `block px-3 py-2 text-white hover:bg-indigo-600 rounded-md ${isActive ? "bg-indigo-800" : ""}`} onClick={() => setIsOpen(false)}>
              Cart {cartItemCount > 0 && `(${cartItemCount})`}
            </NavLink>
          )}

          {isLoggedIn ? (
            <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-white hover:bg-indigo-600 rounded-md border border-white">Logout</button>
          ) : (
            <>
              <NavLink to="/login" className="block px-3 py-2 text-white hover:bg-indigo-600 rounded-md border border-white" onClick={() => setIsOpen(false)}>Login</NavLink>
              <NavLink to="/signup" className="block px-3 py-2 text-white bg-indigo-800 hover:bg-indigo-600 rounded-md" onClick={() => setIsOpen(false)}>Signup</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;