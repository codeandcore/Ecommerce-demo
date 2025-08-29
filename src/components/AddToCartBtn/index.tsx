import { Button } from '@mantine/core';
import React from 'react';
import { FaShoppingCart, FaBox } from 'react-icons/fa';
import styles from './AddToCartBtn.module.css';

type AddToCartBtnProps = {
  height: number;
  size: string;
  addedToCart: boolean;
  handleAddToCart: () => void;
  disabled?: boolean; // <-- Added
};

const AddToCartBtn = ({
  height,
  size,
  addedToCart,
  handleAddToCart,
  disabled = false,
}: AddToCartBtnProps) => {
  const isDisabled = disabled || addedToCart;

  return (
    <Button
      h={height}
      radius={2}
      w="100%"
      size={size}
      onClick={handleAddToCart}
      disabled={isDisabled}
      styles={(theme) => ({
        root: {
          '&:disabled, &[data-disabled]': {
            backgroundColor: theme.colors.cyan[6],
            color: 'white',
            cursor: 'not-allowed',
          },
        },
      })}
      className={`${styles['cart-btn']} ${addedToCart ? styles.added : ''}`}
      aria-label="Add to cart"
    >
      <FaShoppingCart className={styles.cart} />
      <FaBox className={styles.box} />
      <span className={styles['cart-text']}>
        {disabled
          ? 'OUT OF STOCK'
          : addedToCart
          ? 'ADDED!'
          : 'ADD TO CART'}
      </span>
    </Button>
  );
};

export default AddToCartBtn;
