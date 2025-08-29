import { useCartStore } from '@/stores/cart';
import {
  ActionIcon,
  Anchor,
  Divider,
  Group,
  NumberInput,
  NumberInputHandlers,
  Stack,
  Text,
} from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { Minus, Plus, X } from 'tabler-icons-react';
import styles from './CartItem.module.css';
import { updateCartItem } from '@/api/products/updateCartApi';
import { deleteCartItem } from '@/api/products/deleteCartItems';

type CartItemProps = {
  item: any;
};

const CartItem = ({ item }: CartItemProps) => {
  const [quantity, setQuantity] = useState<number>(item.quantity || 1);
  const [loading, setLoading] = useState(false);
  const handlers = useRef<NumberInputHandlers>();
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleUpdateQuantity = async (newQuantity: number) => {
    setLoading(true);
    try {
      await updateCartItem(item.key, newQuantity); // <-- API call
      setQuantity(newQuantity);
    } catch (error) {
      console.error('Failed to update cart item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
        increment(item.id, item.size);
    handleUpdateQuantity(newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
        decrement(item.id, item.size);
      handleUpdateQuantity(newQuantity);
    }
  };


const handleRemoveFromCart = async () => {
  try {
    removeFromCart(item.id, item.size);
    await deleteCartItem(item.key);
    // Optionally update your cart store or state after deletion
  } catch (error) {
    console.error('Failed to remove item:', error);
  }
};

  return (
    <>
      <div className={styles.grid}>
        <div>
          <Anchor component={Link} href={`/product/${item.id}`} sx={{ display: 'block' }}>
            <div className={styles['image-wrapper']}>
              <Image
                src={item.images?.[0]?.src}
                alt={item.images?.[0]?.alt || 'Product image'}
                fill
                style={{ objectFit: 'cover', objectPosition: '50% 10%' }}
                sizes="(min-width: 992px) 250px, (min-width: 768px) 50vw, (min-width: 500px) 235px, 100vw"
              />
            </div>
          </Anchor>
        </div>
        <div>
          <Stack justify="space-between" h="100%">
            <div>
              <Group position="apart" align="flex-start" w="100%" noWrap>
                <Anchor component={Link} href={`/product/${item.id}`} color="dark">
                  <Text weight={600}>{item?.attributes?.title}</Text>
                </Anchor>
                <ActionIcon onClick={handleRemoveFromCart}>
                  <X color="#000" />
                </ActionIcon>
              </Group>
            </div>
            <div>
              <Text weight={600} mb={10}>
                ${item?.prices?.price}.00
              </Text>
              <Group position="apart" noWrap>
                <Group spacing={5} noWrap>
                  <ActionIcon
                    size={38}
                    variant="default"
                    onClick={handleDecrement}
                    disabled={loading || quantity <= 1}
                  >
                    <Minus size={16} />
                  </ActionIcon>
                  <NumberInput
                    hideControls
                    value={quantity}
                    handlersRef={handlers}
                    readOnly
                    min={1}
                    step={1}
                    h={38}
                    styles={{
                      input: {
                        width: 54,
                        height: '100%',
                        textAlign: 'center',
                      },
                      wrapper: { height: '100%' },
                    }}
                    aria-label="Quantity"
                  />
                  <ActionIcon
                    size={38}
                    variant="default"
                    onClick={handleIncrement}
                    disabled={loading}
                  >
                    <Plus size={16} />
                  </ActionIcon>
                </Group>
                <Text weight={600} align="right">
                  TOTAL: ${Number(quantity) * item.prices?.price}.00
                </Text>
              </Group>
            </div>
          </Stack>
        </div>
      </div>
      <Divider my={30} />
    </>
  );
};

export default CartItem;
