/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any other Next.js configurations you might have here
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Proxy API requests to Spring Boot backend
        destination: 'http://localhost:8080/api/:path*',
      },
      {
        source: '/images/:path*', // Proxy image requests to Spring Boot backend's static folder
        destination: 'http://localhost:8080/images/:path*',
      },
    ];
  },
  images: {
    // Whitelist external domains for the Next.js Image component.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wikia.nocookie.net',
        port: '',
        pathname: '/houkai-star-rail/images/**',
      },
      {
        protocol: 'https',
        hostname: 'www.prydwen.gg',
        port: '',
        pathname: '/static/**',
      },
      // === ADDED FOR HSR ASSETS ===
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/FortOfFans/HSR/**',
      },
      // === ADDED FOR ENKA.NETWORK ASSETS ===
      {
        protocol: 'https',
        hostname: 'enka.network',
        port: '',
        pathname: '/ui/hsr/**',
      },
    ],
  },
  // theme: {
  //   extend: {
  //     clipPath: {
  //       'card-left': 'polygon(0 0, 85% 0, 100% 100%, 0 100%)',
  //       'card-middle': 'polygon(15% 0, 85% 0, 100% 100%, 0 100%)',
  //       'card-right': 'polygon(0 0, 100% 0, 100% 100%, 15% 100%)',
  //     },
  //   },
  // },
};

module.exports = nextConfig;
