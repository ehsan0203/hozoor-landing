/// خروجی کاملاً استاتیک است تا روی IIS بدون Node میزبانی شود.
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    webpackBuildWorker: false,
    workerThreads: true,
  },
  eslint: { ignoreDuringBuilds: true },
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
