/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "lightslategrey-mink-262348.hostingersite.com",
    ],
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: "/api/cart",
          destination:
            "https://lightslategrey-mink-262348.hostingersite.com/wp-json/wc/store/v1/cart",
        },
        {
          source: "/api/cart/add-item",
          destination:
            "https://lightslategrey-mink-262348.hostingersite.com/wp-json/wc/store/v1/cart/add-item",
        },
        {
          source: "/:path*",
          destination: `${process.env.NEXT_PUBLIC_BE_URL}/:path*`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
