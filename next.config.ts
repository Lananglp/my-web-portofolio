module.exports = {
  async headers() {
      return [
          {
              source: '/:all*(png|jpg|ico)',
              headers: [
                  {
                      key: 'Cache-Control',
                      value: 'public, max-age=0, must-revalidate',
                  },
              ],
          },
      ];
  },
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'img.icons8.com',
              port: '',
              pathname: '/**',
          },
          {
              protocol: 'https',
              hostname: 'laravel.com',
              port: '',
              pathname: '/**',
          },
          {
              protocol: 'https',
              hostname: 'www.postgresql.org',
              port: '',
              pathname: '/**',
          },
      ],
  },
}

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
