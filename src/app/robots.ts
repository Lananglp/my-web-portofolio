import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            // disallow bagian khusus jika ada, misalnya /admin
            // disallow: '/secret',
        },
        sitemap: 'https://lananglanusa.my.id/sitemap.xml',
    };
}
