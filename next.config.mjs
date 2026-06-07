/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ["better-auth", "mongodb"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
