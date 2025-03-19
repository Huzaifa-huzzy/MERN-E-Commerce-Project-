import React from 'react';
import { useCart } from '../ContextReducer/ContextReducer';
import { useNavigate } from 'react-router-dom';

function Card({ products }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return <div className="text-gray-500 text-center">No products available</div>;
  }

  const handleAddToCart = async (e, product) => {
    e.stopPropagation(); // Prevent navigation when clicking the add to cart button
    try {
      await addToCart(product);
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div 
          key={product._id} 
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          onClick={() => handleProductClick(product._id)}
        >
          <div className="h-48 overflow-hidden">
            <img 
              src={product.img || 'https://via.placeholder.com/300x200'} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {product.name}
            </h3>
            <p className="text-gray-600 mt-1 font-medium">
              ${product.price.toFixed(2)}
            </p>
            {product.options && (
              <div className="mt-2 flex flex-row gap-2 flex-wrap">
                {Object.entries(product.options).map(([key, value]) => (
                  <span 
                    key={key} 
                    className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded"
                  >
                    <span className="font-medium">{key}:</span> {value}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="p-4 pt-0">
            <button 
              onClick={(e) => handleAddToCart(e, product)} 
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;