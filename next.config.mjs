/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    // tell image component to not optimize images (for localhost use)

    unoptimized: true,
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "localhost",
    //     port: "4000",
    //     pathname: "/**/**",
    //   },
    // ],
  },
};

export default nextConfig;
