import React, { useState, useEffect, useRef } from "react";
import Card from "../Card/Card";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const lastScrollTop = useRef(0);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!API_URL) {
          throw new Error('VITE_API_URL is not defined in the .env file');
        }

        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop.current) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
      lastScrollTop.current = st <= 0 ? 0 : st;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = products.reduce((acc, product) => {
    if (!acc[product.CategoryName]) {
      acc[product.CategoryName] = new Set();
    }
    acc[product.CategoryName].add(product.SubCategory || product.collectionName);
    return acc;
  }, {});

  const filteredProducts = products.filter((product) => {
    const matchesCollection =
      !selectedCollection ||
      product.SubCategory === selectedCollection ||
      product.collectionName === selectedCollection;

    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.CategoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.SubCategory && product.SubCategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.collectionName && product.collectionName.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;

    return matchesCollection && matchesSearch;
  });

  const getCategoryDescription = () => {
    if (!selectedCollection) {
      return products.length > 0 ? products[0].description : "Browse all our products";
    }
    const product = products.find(
      (p) => p.SubCategory === selectedCollection || p.collectionName === selectedCollection
    );
    return product ? product.description : "";
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleCollectionClick = (collection) => {
    setSelectedCollection(collection);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="relative">
      <div
        className={`md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30 transition-all duration-300 ease-in-out ${
          showFloatingButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-3 rounded-full shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="font-medium">Menu</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <div
          className={`fixed md:static inset-y-0 pt-24 left-0 z-10 w-64 bg-gray-100 p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:h-screen md:sticky md:top-0`}
        >
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          {Object.entries(categories).map(([categoryName, collections]) => (
            <div key={categoryName} className="mb-4">
              <button
                className="w-full text-left font-semibold text-gray-800 py-2 flex justify-between items-center"
                onClick={() => setOpenCategory(openCategory === categoryName ? null : categoryName)}
              >
                {categoryName}
                <span>{openCategory === categoryName ? "▲" : "▼"}</span>
              </button>
              {openCategory === categoryName && (
                <div className="ml-4 mt-2">
                  {Array.from(collections).map((collectionName) => (
                    <button
                      key={collectionName}
                      className={`block w-full text-left py-1 px-2 text-gray-600 hover:bg-gray-200 rounded ${
                        selectedCollection === collectionName ? "bg-gray-200 font-medium" : ""
                      }`}
                      onClick={() => handleCollectionClick(collectionName)}
                    >
                      {collectionName}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button
            className="w-full text-left py-2 text-gray-600 hover:bg-gray-200 rounded"
            onClick={() => handleCollectionClick(null)}
          >
            Show All
          </button>
        </div>

        <div className="flex-1 p-4 md:p-8" style={{ paddingTop: "94px" }}>
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">
              {selectedCollection ? selectedCollection : "All Products"}
            </h1>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-64 py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <p className="text-gray-600 text-2xl mb-4">{getCategoryDescription()}</p>
          <Card products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

export default Shop;