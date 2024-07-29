"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState<string | null>(null);
  const [tokenExpiration, setTokenExpiration] = useState<Date | null>(null);

  const fetchToken = async () => {
    try {
      const response = await axios.post('/api/token');
      const expirationTime = new Date(Date.now() + response.data.expires_in * 1000); // Multiply by 1000 to convert seconds to milliseconds
      setToken(response.data.access_token);
      setTokenExpiration(expirationTime);
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      if (!token || !tokenExpiration || new Date() >= tokenExpiration) {
        await fetchToken();
      }
    };
    checkToken();
    const interval = setInterval(checkToken, 60 * 1000); // 60 seconds
    return () => clearInterval(interval);
  }, [token, tokenExpiration]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (token) {
        try {
          const response = await axios.get('/api/products', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProducts(response.data._embedded.items);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      } else {
        console.log('No valid token available, cannot fetch products.');
      }
    };

    fetchProducts();
  }, [token]);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product: any) => (
          <li key={product.uuid}>{product.values.name[0].data}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
