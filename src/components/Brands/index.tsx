import { Card, Container, Group, Title, Text } from "@mantine/core";
import { IconStarFilled, IconCheck } from "@tabler/icons-react";
import React from "react";

const testimonials = [
  {
    name: "Helen Winer",
    time: "4 hours ago",
    title: "Great experience",
    review: "Excellent communication. Timely delivery. Great experience overall.",
  },
  {
    name: "John Doe",
    time: "1 day ago",
    title: "Amazing service",
    review: "Super fast and reliable. Would highly recommend to anyone.",
  },
  {
    name: "Sarah Smith",
    time: "2 days ago",
    title: "Loved it!",
    review: "The entire process was seamless and the team was very helpful.",
  },
  {
    name: "Michael Brown",
    time: "3 days ago",
    title: "Fantastic",
    review: "Very professional and quick delivery. Exceeded expectations.",
  },
  {
    name: "Emily Davis",
    time: "1 week ago",
    title: "Top quality",
    review: "The product quality is top-notch. Great packaging as well.",
  },
  {
    name: "Chris Johnson",
    time: "2 weeks ago",
    title: "Highly recommended",
    review: "Really happy with the service. I’ll definitely come back again.",
  },
];

const styles: Record<string, React.CSSProperties> = {
  title: {
    fontSize: "24px",
    fontWeight: 600,
    marginBottom: "30px",
  },
  card: {
    width: "30%",
    minWidth: "280px",
    marginBottom: "20px",
    padding: "16px",
  },
  stars: {
    display: "flex",
    gap: "4px",
    marginBottom: "10px",
  },
  nameRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  verified: {
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
    color: "#00B67A",
    fontWeight: 500,
  },
};

const Testimonials = () => {
  return (
    <Container size={1200} px={16} mb={80}>
      <Title order={2} align="center" style={styles.title}>
        What Our Customers Say
      </Title>

      <Group position="center" spacing="lg" style={{ flexWrap: "wrap" }}>
        {testimonials.map((t, index) => (
          <Card key={index} shadow="sm" radius="md" withBorder style={styles.card}>
            {/* Stars */}
            <div style={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <IconStarFilled key={i} size={18} color="#00B67A" />
              ))}
            </div>

            {/* Name + Verified */}
            <div style={styles.nameRow}>
              <Text fw={600}>
                {t.name}, <span style={{ fontWeight: 400 }}>{t.time}</span>
              </Text>
              <span style={styles.verified}>
                <IconCheck size={14} stroke={2.5} /> Verified
              </span>
            </div>

            {/* Title */}
            <Text mt={8} fw={700}>
              {t.title}
            </Text>

            {/* Review */}
            <Text mt={4} size="sm" c="dimmed">
              {t.review}
            </Text>
          </Card>
        ))}
      </Group>
    </Container>
  );
};

export default Testimonials;
