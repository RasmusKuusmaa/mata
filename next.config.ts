import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Google's OAuth profile-photo host (Ship 3.3's sign-in avatar).
    remotePatterns: [{ hostname: "lh3.googleusercontent.com" }],
  },
};

export default nextConfig;
