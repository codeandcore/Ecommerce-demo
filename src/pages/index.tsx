"use client";

import React, { useEffect, useState } from "react";
import { getFeaturedProducts } from "@/api/products/getFeaturedProducts";
import Brands from "@/components/Brands";
import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getFeaturedProducts();
        setProducts(response ? response: []);
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Hero />
      {loading ? (
        <p>Loading featured products...</p>
      ) : (
        <FeaturedProducts products={products} />
      )}
      <Brands />
    </>
  );
};

export default Home;
