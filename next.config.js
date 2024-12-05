const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const CompressionPlugin = require('compression-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.plugins.push(new CompressionPlugin());
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.youtube.com',
        port: '',
        pathname: '/embed/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
    localPatterns: [
      {
        pathname: '/images/**',
        search: '',
      },
    ],
  },
};

module.exports = withPlugins(
  [
    withBundleAnalyzer({
      compress: true,
    }),
  ],
  nextConfig,
);
