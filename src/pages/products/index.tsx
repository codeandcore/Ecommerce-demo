import { Container, Grid, MediaQuery, rem } from "@mantine/core";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";
import FilterAccordion from "@/components/FilterAccordion";
import ProductsFilter from "@/components/ProductsFilter";
import ProductsGrid from "@/components/ProductsGrid";
import { Product } from "@/types";
import { getAllProducts } from "@/api/products/getAllProducts";

interface Params extends ParsedUrlQuery {
  category: string;
}

type Props = {
  products: any;
  recommendedProducts: Product[];
  category: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const response = await getAllProducts();
  return {
    props: {
      products: response,
      category: "",
      recommendedProducts: [],
    },
  };
};

const Products = ({
  products,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log("products", products);

  const resetFilter = () => {
    setProductsData(products)
  }

  const [productsData, setProductsData] = useState(products);

  return (
    <>
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
    </>
  );
};

export default Products;
