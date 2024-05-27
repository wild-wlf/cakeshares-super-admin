/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: { styledComponents: true },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cakeshares.s3.us-west-1.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
