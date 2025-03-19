import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../ContextReducer/ContextReducer';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (!API_URL) {
          throw new Error('VITE_API_URL is not defined in the .env file');
        }
        const response = await axios.get(`${API_URL}/api/products/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details');
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;
    if (!selectedSize) {
      alert('Please select a size before adding to cart!');
      return;
    }

    try {
      const success = await addToCart({
        _id: product._id,
        quantity: quantity,
        name: product.name,
        price: product.options[selectedSize],
        img: product.img,
        selectedOptions: { size: selectedSize },
      });
      if (success) {
        alert('Product added to cart successfully!');
      } else {
        alert('Please log in to add items to your cart!');
        navigate('/login');
      }
    } catch (error) {
      alert('Failed to add product to cart');
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-red-600 text-xl mb-4">{error}</div>
        <button onClick={() => navigate(-1)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Go Back
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-gray-600 text-xl mb-4">Product not found</div>
        <button onClick={() => navigate(-1)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto pt-8">
        <nav className="mb-8">
          <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Products
          </button>
        </nav>

        <div className="bg-white rounded-xl shadow-md overflow-hidden md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <img
              src={product.img || 'https://via.placeholder.com/600x400'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center mb-4">
                  {product.categoryName && (
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                      {product.categoryName.name}
                    </span>
                  )}
                  {product.subCategory && (
                    <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      {product.subCategory.name}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                ${selectedSize ? product.options[selectedSize] : product.price.toFixed(2)}
              </div>
            </div>

            <div className="border-t border-gray-200 my-6 pt-6">
              <p className="text-gray-700 mb-6">{product.description || 'No description available.'}</p>

              {product.options && Object.keys(product.options).length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Select Size</h3>
                  <select
                    value={selectedSize}
                    onChange={handleSizeChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Choose a size</option>
                    {Object.entries(product.options).map(([size, price]) => (
                      <option key={size} value={size}>
                        {size} - ${price}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center space-x-4 mb-6">
                <div className="w-24">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;