"use client";
 
import { Container, Grid, MediaQuery, rem } from "@mantine/core";
import React, { useState, useEffect } from "react";
import ProductsFilter from "@/components/ProductsFilter";
import ProductsGrid from "@/components/ProductsGrid";
import { Product } from "@/types";
import { getAllProducts } from "@/api/products/getAllProducts";
 
type Props = {};
 
const Products: React.FC<Props> = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProductsData(response);
        setAllProducts(response);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
 
    fetchProducts();
  }, []);
 
  const resetFilter = () => {
    setProductsData(allProducts);
  };
 
  if (loading) {
    return (
      <Container size={1400} px={16} pb={30}>
        <p>Loading products...</p>
      </Container>
    );
  }
 
  return (
    <MediaQuery
      largerThan={768}
      styles={{ paddingLeft: rem(32), paddingRight: rem(32) }}
    >
      <Container size={1400} px={16} pb={30}>
        <Grid m={0} gutterXs={32} columns={24} align="flex-start">
          <Grid.Col
            px={0}
            pt={10}
            mb={12}
            bg="white"
            span={24}
            xs={12}
            sm={9}
            md={8}
            lg={7}
            sx={{
              position: "sticky",
              top: "180px",
              zIndex: 12,
              "@media (max-width: 575px)": {
                top: "70px",
              },
            }}
          >
            <ProductsFilter
              productsData={productsData}
              setProductsData={setProductsData}
              resetFilter={resetFilter}
            />
          </Grid.Col>
 
          <Grid.Col p={0} span={24} xs={12} sm={15} md={16} lg={17}>
            <ProductsGrid
              products={productsData}
              recommendedProducts={productsData}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </MediaQuery>
  );
};
 
export default Products;
 