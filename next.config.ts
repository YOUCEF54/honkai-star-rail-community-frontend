// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'http://localhost:8080/:path*', // Spring Boot API
//       },
//       {
//         source: '/images/:path*',
//         destination: 'http://localhost:8080/images/:path*', // Proxy image requests to Spring
//       },
//     ];
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
/** @type {import('tailwindcss').Config} */
const nextConfig = {
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
    ],
  },
  theme: {
    extend: {
      clipPath: {
        'card-left': 'polygon(0 0, 85% 0, 100% 100%, 0 100%)',
        'card-middle': 'polygon(15% 0, 85% 0, 100% 100%, 0 100%)',
        'card-right': 'polygon(0 0, 100% 0, 100% 100%, 15% 100%)',
      },
    },
  },
  // Add any other Next.js configurations you might have here
};

module.exports = nextConfig;
