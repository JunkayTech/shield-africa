/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Keep static assets (public/) out of serverless function bundles —
  // the admin media routes reference public/ paths for the local dev
  // fallback, which otherwise drags every image into the function.
  outputFileTracingExcludes: {
    '*': ['./public/**'],
  },
}

export default nextConfig
