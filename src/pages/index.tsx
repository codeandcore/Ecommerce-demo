import { InferGetStaticPropsType } from 'next';
import { getFeaturedProducts } from '@/api/products/getFeaturedProducts';
import Brands from '@/components/Brands';
import FeaturedProducts from '@/components/FeaturedProducts';
import Hero from '@/components/Hero';
// import NewArrivals from '@/components/NewArrivals';
import Newsletter from '@/components/Newsletter';
import { getCart } from '@/api/products/getCartApi';
import React from 'react';

export const getStaticProps = async () => {
  const response = await getFeaturedProducts();
  const cartdata = await getCart()
  console.log("cartdata",cartdata);
  
  const nonce = cartdata?.headers['nonce'];
  return {
    props: {
      products: response ? response.slice(0, 4) : [],
      nonce
    },
  };
};

export default function Home({
  products,
  nonce
}: InferGetStaticPropsType<typeof getStaticProps>) {
  React.useEffect(() => {
    if (nonce) {
      localStorage.setItem('api_nonce', nonce);
    }
  }, [nonce]);

  
  return (
    <>
      <Hero />
      <FeaturedProducts products={products} />
      <Brands />
    </>
  );
}
