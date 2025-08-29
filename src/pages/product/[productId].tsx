"use client";

import { Container, MediaQuery, rem, SimpleGrid, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductById } from "@/api/products/getProductById";
import { getAllProducts } from "@/api/products/getAllProducts";
import ProductItem from "@/components/ProductItem";
import ProductCard from "@/components/ProductsGrid/ProductCard";

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { productId } = router.query;

  const [product, setProduct] = useState<any>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchData = async () => {
      try {
        const prod = await getProductById(productId as string);
        setProduct(prod);

        // Optionally fetch recommended products
        const allProducts = await getAllProducts();
        const recommended = allProducts
          .filter((p: any) => p.id !== prod.id)
          .slice(0, 6);
        setRecommendedProducts(recommended);
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

          {recommendedProducts.length > 0 && (
            <>
              <Title order={3} size={18} weight={600} mt={30} mb={10}>
                You May Also Like
              </Title>

              {/* Desktop grid */}
              <MediaQuery smallerThan={768} styles={{ display: "none" }}>
                <SimpleGrid
                  cols={3}
                  spacing={20}
                  breakpoints={[
                    { minWidth: 900, cols: 3, spacing: 30 },
                    { minWidth: 1000, cols: 3, spacing: 40 },
                    { minWidth: 1100, cols: 3, spacing: 40 },
                    { minWidth: 1200, cols: 3, spacing: 50 },
                  ]}
                >
                  {recommendedProducts.map((prod: any) => (
                    <div key={prod.id}>
                      <ProductCard
                        product={prod}
                        withHeart={false}
                        sizes="(min-width: 1200px) 346px, 33vw"
                      />
                    </div>
                  ))}
                </SimpleGrid>
              </MediaQuery>

              {/* Mobile carousel */}
              <MediaQuery largerThan={768} styles={{ display: "none" }}>
                <Carousel
                  slideSize="80%"
                  slideGap="md"
                  withControls={false}
                  loop
                  breakpoints={[
                    { minWidth: 500, slideSize: "65%", slideGap: "md" },
                    { minWidth: 600, slideSize: "50%", slideGap: "md" },
                  ]}
                >
                  {recommendedProducts.map((prod: any) => (
                    <Carousel.Slide key={prod.id}>
                      <ProductCard
                        product={prod}
                        withHeart={false}
                        sizes="(min-width: 1200px) 560px, (min-width: 600px) 50vw, (min-width: 500px) 65vw, 80vw"
                      />
                    </Carousel.Slide>
                  ))}
                </Carousel>
              </MediaQuery>
            </>
          )}
        </Container>
      </MediaQuery>
    </>
  );
};

export default ProductPage;
