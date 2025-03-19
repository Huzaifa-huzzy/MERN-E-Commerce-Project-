// Home.jsx
import Hero from '../Hero/Hero';
import Card from '../Card/Card';
import { useState, useEffect } from 'react';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Group products by CategoryName and limit to 4 per category
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
            {/* Pass the filtered products to Card */}
            <Card products={categoryProducts} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;