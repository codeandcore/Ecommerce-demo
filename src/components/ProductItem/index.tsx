import { Product } from '@/types';
import { Grid, MediaQuery, Text, Title } from '@mantine/core';
import React from 'react';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: any) => {
  return (
    <>
      <Grid m={0} gutterXs={30} gutterMd={50}>
        <MediaQuery smallerThan="xs" styles={{ marginBottom: 30 }}>
          <Grid.Col span={12} sm={6} p={0}>
            <ProductImage product={product} />
          </Grid.Col>
        </MediaQuery>
        <Grid.Col span={12} sm={6} p={0}>
          <ProductInfo product={product} />
        </Grid.Col>
      </Grid>
      <Title order={2} size={16} weight={600} mt={30}>
        Product Details
      </Title>
     <Text
  color="dark.3"
  size={15}
  dangerouslySetInnerHTML={{
    __html: `
     ${product?.description}
    `,
  }}
/>
    </>
  );
};

export default ProductItem;
