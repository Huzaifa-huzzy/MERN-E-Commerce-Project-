// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import About from './components/Navbar/About';
import Services from './components/Navbar/Services';
import Contact from './components/Navbar/Contact';
import Home from './components/Navbar/Home';
import Footer from './components/Footer/Footer'; // Note: "Footeer" seems like a typo, should be "Footer"?
import Login from './components/Navbar/Login';
import Signup from './components/Navbar/Signup';
import Shop from './components/Shop/Shop';
import ProductDetail from './components/Product/ProductDetail';
import Cart from './components/Cart/Cart';
import { CartProvider } from './components/ContextReducer/ContextReducer';

// Create a Layout component to handle Footer conditionally
function Layout({ children }) {
  const location = useLocation();
  const hideFooter = location.pathname === '/shop';

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">{children}</div>
      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <CartProvider> {/* Wrap everything with CartProvider */}
      <BrowserRouter>
        {/* Sticky Navbar */}
        <div className="w-full fixed h-16 z-50 shadow-md">
          <Navbar />
        </div>
        
        {/* Main content wrapper with conditional Footer */}
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;