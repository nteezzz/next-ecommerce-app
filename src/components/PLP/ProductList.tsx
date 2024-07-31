"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import ProductListCard from './ProductListCard';
import { AkeneoListProduct } from '@/types/akeneoListProduct';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<AkeneoListProduct[]>([]);
  const [nextLink, setNextLink] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokenExpiration, setTokenExpiration] = useState<Date | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchToken = useCallback(async () => {
    try {
      const response = await axios.post('/api/token');
      const expirationTime = new Date(Date.now() + response.data.expires_in * 1000);
      setToken(response.data.access_token);
      setTokenExpiration(expirationTime);
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      if (!token || !tokenExpiration || new Date() >= tokenExpiration) {
        await fetchToken();
      }
    };
    checkToken();
    const interval = setInterval(checkToken, 60 * 1000);
    return () => clearInterval(interval);
  }, [token, tokenExpiration, fetchToken]);

  const fetchProducts = useCallback(async (link: string | null) => {
    if (link !== null && token) {
      try {
        const response = await axios.get(link, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts((prevProducts) => [...prevProducts, ...response.data._embedded.items]);
        setNextLink(response.data._links.next ? response.data._links.next.href : null);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchProducts('/api/products'); // Initial fetch
  }, [fetchProducts]);

  const lastProductElementRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && nextLink) {
        fetchProducts(`/api/products?link=${encodeURIComponent(nextLink)}`);
      }
    });
    if (node) observer.current.observe(node);
  }, [nextLink, fetchProducts]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product, index) => {
          if (products.length === index + 1) {
            return <div ref={lastProductElementRef} key={product.uuid}><ProductListCard product={product} accessToken={token} /></div>;
          } else {
            return <ProductListCard key={product.uuid} product={product} accessToken={token} />;
          }
        })}
      </div>
    </div>
  );
};

export default ProductList;
