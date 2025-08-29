import {
  Button,
  Card,
  Divider,
  Group,
  Text,
  TextInput,
  Textarea,
  Tabs,
  Checkbox,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { useState, useEffect } from "react";
import { ExclamationMark, Check } from "tabler-icons-react";
import { customAxiosCS } from "@/lib/axios";
import { useCart, useTotalPrice } from "@/stores/cart";
import styles from "./OrderSummary.module.css";
import { useRouter } from "next/router";

const OrderSummary = () => {
  const { totalPrice } = useTotalPrice();
  const { cart } = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(true);

  const [billing, setBilling] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "+5927712345",
    address_1: "",
    address_2: "",
    city: "Georgetown",
    state: "GU",
    postcode: "11201",
    country: "GY",
  });

  const [shipping, setShipping] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "+5927712345",
    address_1: "",
    address_2: "",
    city: "Georgetown",
    state: "GU",
    postcode: "11201",
    country: "GY",
  });

  // Sync shipping with billing if checkbox is checked
  useEffect(() => {
    if (sameAsBilling) {
      setShipping({
        first_name: billing.first_name,
        last_name: billing.last_name,
        email: billing.email,
        phone: "+5927712345",
        address_1: billing.address_1,
        address_2: billing.address_2,
        city: "Georgetown",
        state: "GU",
        postcode: "11201",
        country: "GY",
      });
    }
  }, [sameAsBilling, billing]);

  const handleBillingChange = (key: string, value: string) => {
    setBilling((prev) => ({ ...prev, [key]: value }));
  };

  const handleShippingChange = (key: string, value: string) => {
    setShipping((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const body = {
        email: billing.email,
        billing_address: { ...billing },
        shipping_address: { ...(sameAsBilling ? billing : shipping) },
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

      <Tabs defaultValue="billing">
        <Tabs.List mb={20}>
          <Tabs.Tab value="billing">Billing Address</Tabs.Tab>
          <Tabs.Tab value="shipping">Shipping Address</Tabs.Tab>
        </Tabs.List>

        {/* Billing Address */}
        <Tabs.Panel value="billing">
          <Group grow mb={15}>
            <TextInput
              label="First Name"
              value={billing.first_name}
              onChange={(e) =>
                handleBillingChange("first_name", e.currentTarget.value)
              }
              required
            />
            <TextInput
              label="Last Name"
              value={billing.last_name}
              onChange={(e) =>
                handleBillingChange("last_name", e.currentTarget.value)
              }
              required
            />
          </Group>
          <TextInput
            label="Email"
            value={billing.email}
            onChange={(e) =>
              handleBillingChange("email", e.currentTarget.value)
            }
            required
            mb={15}
          />
          <TextInput
            label="Phone"
            value={billing.phone}
            onChange={(e) =>
              handleBillingChange("phone", e.currentTarget.value)
            }
            required
            mb={15}
            disabled
          />
          <Textarea
            label="Address Line 1"
            value={billing.address_1}
            onChange={(e) =>
              handleBillingChange("address_1", e.currentTarget.value)
            }
            required
            mb={15}
          />
          <TextInput
            label="Address Line 2"
            value={billing.address_2}
            onChange={(e) =>
              handleBillingChange("address_2", e.currentTarget.value)
            }
            mb={15}
          />
          <Group grow mb={15}>
            <TextInput
              label="City"
              value={billing.city}
              onChange={(e) =>
                handleBillingChange("city", e.currentTarget.value)
              }
              disabled
            />
            <TextInput
              label="State"
              value={billing.state}
              onChange={(e) =>
                handleBillingChange("state", e.currentTarget.value)
              }
              disabled
            />
          </Group>
          <Group grow mb={15}>
            <TextInput
              label="Postcode"
              value={billing.postcode}
              onChange={(e) =>
                handleBillingChange("postcode", e.currentTarget.value)
              }
              disabled
            />
            <TextInput
              label="Country"
              value={billing.country}
              onChange={(e) =>
                handleBillingChange("country", e.currentTarget.value)
              }
              disabled
            />
          </Group>
        </Tabs.Panel>

        {/* Shipping Address */}
        <Tabs.Panel value="shipping">
          <Checkbox
            label="Same as Billing Address"
            checked={sameAsBilling}
            onChange={(e) => setSameAsBilling(e.currentTarget.checked)}
            mb={20}
          />
          {!sameAsBilling && (
            <>
              <Group grow mb={15}>
                <TextInput
                  label="First Name"
                  value={shipping.first_name}
                  onChange={(e) =>
                    handleShippingChange("first_name", e.currentTarget.value)
                  }
                />
                <TextInput
                  label="Last Name"
                  value={shipping.last_name}
                  onChange={(e) =>
                    handleShippingChange("last_name", e.currentTarget.value)
                  }
                />
              </Group>
              <TextInput
                label="Email"
                value={shipping.email}
                onChange={(e) =>
                  handleShippingChange("email", e.currentTarget.value)
                }
                mb={15}
              />
              <TextInput
                label="Phone"
                value={shipping.phone}
                onChange={(e) =>
                  handleShippingChange("phone", e.currentTarget.value)
                }
                mb={15}
                disabled
              />
              <Textarea
                label="Address Line 1"
                value={shipping.address_1}
                onChange={(e) =>
                  handleShippingChange("address_1", e.currentTarget.value)
                }
                mb={15}
              />
              <TextInput
                label="Address Line 2"
                value={shipping.address_2}
                onChange={(e) =>
                  handleShippingChange("address_2", e.currentTarget.value)
                }
                mb={15}
              />
              <Group grow mb={15}>
                <TextInput
                  label="City"
                  value={shipping.city}
                  onChange={(e) =>
                    handleShippingChange("city", e.currentTarget.value)
                  }
                  disabled
                />
                <TextInput
                  label="State"
                  value={shipping.state}
                  onChange={(e) =>
                    handleShippingChange("state", e.currentTarget.value)
                  }
                  disabled
                />
              </Group>
              <Group grow mb={15}>
                <TextInput
                  label="Postcode"
                  value={shipping.postcode}
                  onChange={(e) =>
                    handleShippingChange("postcode", e.currentTarget.value)
                  }
                  disabled
                />
                <TextInput
                  label="Country"
                  value={shipping.country}
                  onChange={(e) =>
                    handleShippingChange("country", e.currentTarget.value)
                  }
                  disabled
                />
              </Group>
            </>
          )}
        </Tabs.Panel>
      </Tabs>

      <Divider my={15} />
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
