import { Button, Card, Divider, Group, Text, TextInput, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { useState } from 'react';
import { ExclamationMark, Check } from 'tabler-icons-react';
import { customAxiosCS } from '@/lib/axios';
import { useCart, useTotalPrice } from '@/stores/cart';
import styles from './OrderSummary.module.css';
import { useRouter } from 'next/router';

const OrderSummary = () => {
  const { totalPrice } = useTotalPrice();
  const { cart } = useCart();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  const router = useRouter();
  const handleCheckout = async () => {
    try {
      setLoading(true);

      const body = {
        email: "john.doe@email.com",
        billing_address: {
          first_name: form.name || "John",
          last_name: "Doe",
          address_1: form.address || "123 Main St",
          address_2: "Apartment 4B",
          city: "Georgetown",
          state: "GU",
          postcode: "11201",
          country: "GY",
          email: "john.doe@email.com",
          phone: form.phone || "+5927712345",
        },
        shipping_address: {
          first_name: form.name || "John",
          last_name: "Doe",
          address_1: "123 Main St",
          address_2: "Apartment 4B",
          city: "Georgetown",
          state: "GU",
          postcode: "11201",
          country: "GY",
          phone: "+5927712345",
        },
        customer_note: "Please deliver after 5pm.",
        payment_method: "cod",
        shipping_lines: [
          {
            method_id: "free_shipping:1",
            method_title: "Free Shipping",
            total: "0",
          },
        ],
        payment_data: {},
        customer_password: "myStrongPassword123",
      };

      const response = await customAxiosCS.post("/checkout", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.data?.status) {
        notifications.show({
          title: "Order Placed",
          message: "Your order has been placed successfully!",
          color: "green",
          icon: <Check />,
        });

        // Redirect to thank-you page
        router.push("/success");
      } else {
        throw new Error(response?.data?.message || "Failed to place order.");
      }

    } catch (err: any) {
      console.error("Checkout error:", err);
      notifications.show({
        title: "Order Failed",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again later.",
        color: "red",
        icon: <ExclamationMark />,

      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <Card
      withBorder
      padding={30}
      radius={0}
      bg="gray.0"
      className={styles.card}
    >
      <Text weight={600} size={18} mb={20}>
        Order Summary
      </Text>

      <TextInput
        label="Full Name"
        placeholder="Enter your name"
        value={form.name}
        onChange={(e) => handleChange('name', e.currentTarget.value)}
        required
        mb={15}
      />
      <TextInput
        label="Phone Number"
        placeholder="Enter your phone number"
        value={form.phone}
        onChange={(e) => handleChange('phone', e.currentTarget.value)}
        required
        mb={15}
      />
      <Textarea
        label="Delivery Address"
        placeholder="Enter your full address"
        value={form.address}
        onChange={(e) => handleChange('address', e.currentTarget.value)}
        required
        mb={15}
      />

      <Group position="apart" noWrap>
        <Text weight={500}>Shipping</Text>
        <Text size={14}>FREE</Text>
      </Group>
      <Divider my={15} />
      <Group position="apart" noWrap>
        <Text weight={600}>Total</Text>
        <Text weight={600}>${totalPrice}.00</Text>
      </Group>

      <Button
        w="100%"
        h={50}
        size="md"
        radius={0}
        mt={20}
        onClick={handleCheckout}
        loading={loading}
      >
        PLACE ORDER (COD)
      </Button>
    </Card>
  );
};

export default OrderSummary;
