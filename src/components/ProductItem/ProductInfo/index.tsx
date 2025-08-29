import { useCartStore } from '@/stores/cart';
import { useWishlist, useWishlistStore } from '@/stores/wishlist';
import { Product } from '@/types';
import { ActionIcon, Group, Select, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { ChevronDown } from 'tabler-icons-react';
import styles from './ProductInfo.module.css';
import AddToCartBtn from '@/components/AddToCartBtn';

type ProductInfoProps = {
  product: Product;
};

const ProductInfo = ({ product }: any) => {
  const [selectedAttributes, setSelectedAttributes] = useState({}) as any;
  const addToCart = useCartStore((state) => state.addToCart);
  const { wishlist } = useWishlist();
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const [hearted, setHearted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [error, setError] = useState(false);

  // Sync hearted state with wishlist
  useEffect(() => {
    setHearted(wishlist.some((item) => item.id === product.id));
  }, [wishlist, product.id]);

  // Reset "Added to Cart" state after 1.5s
  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => setAddedToCart(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [addedToCart]);

  const handleAddToCart = () => {
    // If variable product, ensure all attributes are selected
    if (product?.type === 'variable') {
      const allSelected = product?.attributes?.every((attr:any) => selectedAttributes[attr.slug]);
      if (!allSelected) {
        setError(true);
        return;
      }
    }

    addToCart(product, selectedAttributes);
    setAddedToCart(true);
  };

  const handleClickWishlist = () => {
    toggleWishlist(product);
    setHearted((prev) => !prev);
  };

  return (
    <>
      <Title order={1} size={20} weight={500} mb={20}>
        {product.name}
      </Title>

      {product.brand?.name && <Text mb={20}>{product.brand.name}</Text>}

      {product?.stock_status === 'instock' ? (
        <Text weight={500} mb={20}>
          ${product.price ?? 0}.00
        </Text>
      ) : (
        <Text weight={500} mb={20} color="red">
          Out of Stock
        </Text>
      )}

      {/* Render variations only if product is variable */}
      {product?.type === 'variable' &&
        product?.attributes?.map((attr: any) => {
          const selectedValue = selectedAttributes[attr.slug] || '';
          return (
            <Select
              key={attr?.id}
              placeholder={`Pick a ${attr?.name}`}
              data={attr?.options || []}
              size="md"
              mb={20}
              radius={2}
              rightSection={<ChevronDown size={20} color="#22B8CF" />}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              aria-label={`Pick a ${attr?.name}`}
              value={selectedValue}
              onChange={(value) =>
                setSelectedAttributes((prev) => ({
                  ...prev,
                  [attr.slug]: value || '',
                }))
              }
              error={error && !selectedValue}
            />
          );
        })}

      <Group noWrap mb={20}>
        <AddToCartBtn
          height={50}
          size="md"
          addedToCart={addedToCart}
          handleAddToCart={handleAddToCart}
          disabled={product?.stock_status !== 'instock'}
        />
        <ActionIcon
          variant="outline"
          size={50}
          color="cyan"
          radius={2}
          onClick={handleClickWishlist}
          className={styles['heart-button']}
          aria-label={hearted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <FiHeart className={`${styles.heart} ${hearted ? styles.active : ''}`} />
        </ActionIcon>
      </Group>

      <Text weight={600} size={15}>Material</Text>
      <Text size={14} color="dark.3" mb={20}>100% Cotton</Text>

      <Text weight={600} size={15}>Care</Text>
      <Text size={14} color="dark.3" mb={20}>Refer to product for care instructions.</Text>

      <Text weight={600} size={15}>Delivery</Text>
      <Text size={14} color="dark.3" mb={20}>
        This item is sent directly from our partner and will arrive separately
        if ordered with other items.
      </Text>

      <Text weight={600} size={15}>Returns</Text>
      <Text size={14} color="dark.3">Free returns within 30 days.</Text>
    </>
  );
};

export default ProductInfo;
