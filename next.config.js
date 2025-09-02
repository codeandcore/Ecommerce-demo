/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "lightslategrey-mink-262348.hostingersite.com",
      "ip.codeandcore.com",
    ],
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: "/api/:path*",
          destination: `${process.env.NEXT_PUBLIC_BE_URL}/:path*`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
