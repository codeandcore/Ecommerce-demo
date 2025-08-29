import { Product } from '@/types';
import { Carousel } from '@mantine/carousel';
import Image from 'next/image';
import React from 'react';
import styles from './ProductImage.module.css';

type ProductImageProps = {
  product: any;
};

const ProductImage = ({ product }: any) => {
  return (
    <Carousel
      loop
      withIndicators
      className={styles.carousel}
      styles={{
        viewport: {
          height: '100%',
        },
        container: {
          height: '100%',
        },
      }}
    >
      {product.images?.map((list:any) => {
      return (<Carousel.Slide h="100%" key={list?.id}>
          <div className={styles['image-wrapper']}>
            <Image
              src={list?.src}
              alt={product.image?.alt}
              fill
              style={{ objectFit: 'cover', objectPosition: '50% 10%' }}
              sizes="(min-width: 1200px) 543px, (min-width: 768px) 50vw, 100vw"
              priority
            />
          </div>
        </Carousel.Slide>)
      })}

    </Carousel>
  );
};

export default ProductImage;
