/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      AKENEO_BASE_URL: process.env.AKENEO_BASE_URL,
      AKENEO_CLIENT_ID: process.env.AKENEO_CLIENT_ID,
      AKENEO_CLIENT_SECRET: process.env.AKENEO_CLIENT_SECRET,
      AKENEO_USERNAME: process.env.AKENEO_USERNAME,
      AKENEO_PASSWORD: process.env.AKENEO_PASSWORD,
    },
  }
  
  export default nextConfig;
  