/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  baseUrl: ".",
  paths: {
    "components/*": ["components/*"],
    "config/*": ["config/*"],
    "core/*": ["core/*"],
    "pages/*": ["pages/*"],
    "styles/*": ["styles/*"],
    "util/*": ["util/*"],
  },
};

module.exports = nextConfig;
