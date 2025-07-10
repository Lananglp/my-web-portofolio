module.exports = {
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'my-web-portofolio-pearl.vercel.app',
                    },
                ],
                destination: 'https://lananglanusa.my.id/:path*',
                permanent: true,
            },
        ];
    },
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
