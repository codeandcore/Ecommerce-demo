import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import { Product } from '@/types';
import { Anchor, Button, Select, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ChevronDown, Trash } from 'tabler-icons-react';
import AddToCartBtn from '../AddToCartBtn';
import styles from './WishlistItem.module.css';

type WishlistItemProps = {
  item: Product;
};

const WishlistItem = ({ item }: any) => {
  const [selectedAttributes, setSelectedAttributes] = useState({}) as any;
  const [addedToCart, setAddedToCart] = useState(false);
  const [error, setError] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishList);

  // Auto-reset "Added to Cart" state
  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => setAddedToCart(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [addedToCart]);

  const handleAddToCart = () => {
    if (item?.type === 'variable') {
      const allSelected = item?.attributes?.every((attr:any) => selectedAttributes[attr.slug]);
      if (!allSelected) {
        setError(true);
        return;
      }
    }

    addToCart(item, selectedAttributes);
    setAddedToCart(true);
  };

  return (
    <div>
      <Anchor component={Link} href={`/product/${item.id}`} className={styles.link}>
        <div className={styles['image-wrapper']}>
          <Image
            src={item.images?.[0]?.src}
            alt={item.images?.[0]?.alt || item.name}
            fill
            style={{ objectFit: 'cover', objectPosition: '50% 10%' }}
            sizes="(min-width: 1400px) 298px, (min-width: 1200px) 25vw, (min-width: 768px) 33vw, (min-width: 500px) 50vw, 100vw"
          />
        </div>
      </Anchor>

      <Anchor component={Link} href={`/product/${item.id}`} color="dark" className={styles.link}>
        <Text weight={500} mt={15}>{item.attributes?.title || item.name}</Text>
        <Text my={5}>{item.name}</Text>

        {item?.stock_status === 'instock' ? (
          <Text weight={500} mb={20}>${item.price ?? 0}.00</Text>
        ) : (
          <Text weight={500} mb={20} color="red">Out of Stock</Text>
        )}
      </Anchor>

      {/* Render variations only if product type is variable */}
      {item?.type === 'variable' && item?.attributes?.map((attr: any) => {
        const selectedValue = selectedAttributes[attr.slug] || '';
        return (
          <Select
            key={attr.id}
            placeholder={`Pick a ${attr.name}`}
            data={attr.options || []}
            size="md"
            mb={20}
            radius={2}
            rightSection={<ChevronDown size={20} color="#22B8CF" />}
            styles={{ rightSection: { pointerEvents: 'none' } }}
            aria-label={`Pick a ${attr.name}`}
            value={selectedValue}
            onChange={(value) =>
              setSelectedAttributes((prev:any) => ({
                ...prev,
                [attr.slug]: value || '',
              }))
            }
            error={error && !selectedValue}
          />
        );
      })}

      <AddToCartBtn
        height={44}
        size="sm"
        addedToCart={addedToCart}
        handleAddToCart={handleAddToCart}
        disabled={item?.stock_status !== 'instock'}
      />

      <Button
        radius={2}
        w="100%"
        h={44}
        mt={15}
        variant="default"
        leftIcon={<Trash size={18} />}
        onClick={() => removeFromWishlist(item.id)}
      >
        REMOVE
      </Button>
    </div>
  );
};

export default WishlistItem;
