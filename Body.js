import React, { useEffect, useState } from 'react';
import Card from "./Card";
import Shimmercard from "./Shimmercard";
import axios from 'axios';

const Body = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/suggestions?q=${value}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/search?q=${query}`);
      setProducts(response.data);
      setSuggestions([]);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <>
      <div className="p-4 m-4 justify-center items-center flex">
        <div>
          <label>User Name</label>
          <input
            className='border border-black'
            value={query}
            onChange={handleSearchChange}
            placeholder="Search for products..."
          />
          <button type="submit" className='border border-black p-2 ml-2' onClick={handleSearchSubmit}>Search</button>
        </div>
      </div>
      <div className="suggestions-container">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="suggestion-item"
            onClick={() => {
              setQuery(suggestion);
              setSuggestions([]);
              handleSearchSubmit(new Event('submit'));
            }}
          >
            {suggestion}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap">
        {products.length === 0 ? (
          Array.from({ length: 10 }).map((_, index) => <Shimmercard key={index} />)
        ) : (
          products.map((product) => <Card key={product.id} resdata={product} />)
        )}
      </div>
    </>
  );
};

export default Body;
