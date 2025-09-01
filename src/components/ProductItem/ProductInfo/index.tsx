import { useCartStore } from "@/stores/cart";
import { useWishlist, useWishlistStore } from "@/stores/wishlist";
import { Product } from "@/types";
import { ActionIcon, Group, Select, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { ChevronDown } from "tabler-icons-react";
import styles from "./ProductInfo.module.css";
import AddToCartBtn from "@/components/AddToCartBtn";
import { AddToCartProduct } from "@/api/products/AddToCartApi";
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

  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => setAddedToCart(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [addedToCart]);

  const handleAddToCart = async () => {
    if (product?.type === "variable") {
      const allSelected = product?.attributes?.every(
        (attr: any) => selectedAttributes[attr.slug]
      );
      if (!allSelected) {
        setError(true);
        return;
      }
    }
console.log("produce",product);

    addToCart(product, selectedAttributes);

    setAddedToCart(true);
    const data = await AddToCartProduct(product?.id)
    useCartStore.getState().setCartItems(data?.items);
    console.log("data",data);
    
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

      <Text weight={500} mb={20}>
        ${product.prices?.price ?? 0}.00
      </Text>
      {product?.type === "variable" &&
        product?.attributes?.map((attr: any) => {
          const selectedValue = selectedAttributes[attr.slug] || "";
          return (
            <Select
              key={attr?.id}
              placeholder={`Pick a ${attr?.name}`}
              data={attr?.options || []}
              size="md"
              mb={20}
              radius={2}
              rightSection={<ChevronDown size={20} color="#22B8CF" />}
              styles={{ rightSection: { pointerEvents: "none" } }}
              aria-label={`Pick a ${attr?.name}`}
              value={selectedValue}
              onChange={(value) =>
                setSelectedAttributes((prev: any) => ({
                  ...prev,
                  [attr.slug]: value || "",
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
        />
        <ActionIcon
          variant="outline"
          size={50}
          color="cyan"
          radius={2}
          onClick={handleClickWishlist}
          className={styles["heart-button"]}
          aria-label={hearted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FiHeart
            className={`${styles.heart} ${hearted ? styles.active : ""}`}
          />
        </ActionIcon>
      </Group>
      <Text weight={600} size={15}>
        Type
      </Text>
      <Text
        size={14}
        color="dark.3"
        mb={20}
        style={{ textTransform: "capitalize" }}
      >
        {product.type}
      </Text>
      <Text weight={600} size={15}>
        Categories
      </Text>
      <Text size={14} color="dark.3" mb={20}>
        {product?.categories?.map((c: any) => c.name)?.join(", ")}{" "}
      </Text>

      <Text weight={600} size={15}>
        Description
      </Text>
      <Text
        size={14}
        color="dark.3"
        mb={20}
        dangerouslySetInnerHTML={{ __html: product?.short_description }}
      />

      <Text weight={600} size={15}>
        Tags
      </Text>
      <Text size={14} color="dark.3">
       {product?.tags?.map((c: any) => c.name)?.join(", ")}{" "}
      </Text>
    </>
  );
};

export default ProductInfo;
