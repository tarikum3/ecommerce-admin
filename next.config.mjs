import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    // formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qvkdnhfbjppmzromhdae.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
};

//export default nextConfig;
export default withNextIntl(nextConfig);
