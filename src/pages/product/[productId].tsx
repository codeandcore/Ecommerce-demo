"use client";

import { Container, MediaQuery, rem, SimpleGrid, Title } from "@mantine/core";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductById } from "@/api/products/getProductById";
import ProductItem from "@/components/ProductItem";

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { productId } = router.query;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchData = async () => {
      try {
        const prod = await getProductById(productId as string);
        setProduct(prod);
      } catch (err) {
        console.error("Failed to fetch product data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  if (loading) {
    return (
      <Container size={1200} px={16} py={50}>
        <p>Loading product...</p>
      </Container>
    );
  }

  return (
    <>
      {product && (
        <Head>
          <title>{`${product.attributes.title} | ISRAELPHARMA`}</title>
        </Head>
      )}

      <MediaQuery
        largerThan={768}
        styles={{ paddingLeft: rem(32), paddingRight: rem(32) }}
      >
        <Container size={1200} px={16} py={50}>
          {product && <ProductItem product={product} />}
        </Container>
      </MediaQuery>
    </>
  );
};

export default ProductPage;
