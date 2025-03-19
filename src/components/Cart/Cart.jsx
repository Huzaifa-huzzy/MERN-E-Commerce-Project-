import React, { useEffect, useState } from 'react';
import { useCart } from '../ContextReducer/ContextReducer';

const Cart = () => {
  const { cart: localCart, serverCart, isLoading, addToCart, removeFromCart: removeFromCartContext, user, fetchServerCart } = useCart();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.token && !serverCart) {
      fetchServerCart();
    }
  }, [user, serverCart]);

  const addToServerCart = async (productId, quantity) => {
    if (!user || !user.token) {
      addToCart({ _id: productId, quantity: quantity || 1 });
      alert('Product added to local cart!');
      return;
    }

    try {
      await addToCart({ _id: productId, quantity: quantity || 1 });
      alert('Product added to cart!');
    } catch (err) {
      setError('Failed to add product');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await removeFromCartContext(productId);
      if (user && user.token) {
        await fetchServerCart();
      }
    } catch (err) {
      setError('Failed to remove product');
    }
  };

  const getDisplayCart = () => {
    if (user && user.token && serverCart) {
      const aggregated = (serverCart.products || []).reduce((acc, item) => {
        const key = item.product?._id;
        if (!key) return acc;
        if (!acc[key]) {
          acc[key] = { ...item, totalQuantity: item.quantity || 1 };
        } else {
          acc[key].totalQuantity += item.quantity || 1;
        }
        return acc;
      }, {});
      return Object.values(aggregated).map((item) => ({
        ...item,
        uniqueKey: item._id || `${item.product._id}-${item.quantity}`,
      }));
    }

    const aggregated = (localCart || []).reduce((acc, item) => {
      const optionsString = item.selectedOptions
        ? Object.entries(item.selectedOptions)
            .map(([k, v]) => `${k}:${v}`)
            .join('|')
        : '';
      const key = optionsString ? `${item._id}-${optionsString}` : item._id;

      if (!key) return acc;
      if (!acc[key]) {
        acc[key] = { ...item, totalQuantity: item.quantity || 1 };
      } else {
        acc[key].totalQuantity += item.quantity || 1;
      }
      return acc;
    }, {});

    return Object.values(aggregated).map((item) => ({
      ...item,
      uniqueKey: item._id
        ? item.selectedOptions
          ? `local-${item._id}-${Object.entries(item.selectedOptions || {})
              .map(([k, v]) => `${k}:${v}`)
              .join('|')}`
          : `local-${item._id}`
        : `local-unknown`,
    }));
  };

  const displayCart = getDisplayCart();

  const calculateTotalAmount = () => {
    return displayCart
      .reduce((total, item) => {
        const price = user ? item.product?.price : item.price;
        const quantity = item.totalQuantity || 1;
        return total + (price || 0) * quantity;
      }, 0)
      .toFixed(2);
  };

  const totalAmount = calculateTotalAmount();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-red-600 text-xl">{error}</div>
        <button
          onClick={() => setError(null)}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-tight pt-8">
          Your Shopping Cart
        </h2>

        {displayCart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <p className="text-gray-400 mt-2">Add some products to get started!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {displayCart.map((item) => {
              const id = user ? item.product?._id : item._id;
              const name = user ? item.product?.name : item.name;
              const price = user ? item.product?.price : item.price;
              const quantity = item.totalQuantity || 1;
              const options = user ? item.product?.selectedOptions : item.selectedOptions;

              if (!id || !name) return null;

              return (
                <div
                  key={item.uniqueKey}
                  className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-md flex-shrink-0">
                      <img
                        src={item.product?.img || item.img || 'https://via.placeholder.com/80'}
                        alt={name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                      <p className="text-gray-600">
                        {quantity}x - ${price ? (price * quantity).toFixed(2) : '0.00'}
                      </p>

                      {/* Display selected options */}
                      {options && Object.keys(options).length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {Object.entries(options).map(([key, value], index, arr) => (
                              <span key={key}>
                                <span className="capitalize">{key}</span>: {value}
                                {index < arr.length - 1 ? ', ' : ''}
                              </span>
                            ))}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
            <div className="mt-8 flex items-center justify-end space-x-4">
              <div className="text-xl font-semibold text-gray-800">Total: ${totalAmount}</div>
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-indigo-700 transition-colors duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;