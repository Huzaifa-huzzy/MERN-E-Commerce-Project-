import Hero from '../Hero/Hero';
import Card from '../Card/Card';
import { useState, useEffect } from 'react';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!API_URL) {
          throw new Error('API_URL is not defined in environment variables');
        }
        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); 

  const groupedProducts = products.reduce((acc, product) => {
    const category = product.CategoryName;
    if (!acc[category]) {
      acc[category] = [];
    }
    if (acc[category].length < 4) {
      acc[category].push(product);
    }
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        {Object.entries(groupedProducts).map(([categoryName, categoryProducts]) => (
          <div key={categoryName} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 capitalize">
              {categoryName}
            </h2>
            <Card products={categoryProducts} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;