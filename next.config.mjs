/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },
  images: {
    domains: ["flagsapi.com"],
  },
  reactStrictMode: true,
};

export default nextConfig;
