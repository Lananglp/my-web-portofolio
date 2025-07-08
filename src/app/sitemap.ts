import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://lananglanusa.my.id';

    const routes = [
        '',
        'chat',
        // tambahkan halaman lain jika ada, misal 'projects', 'about', dll
    ];

    return routes.map((route) => ({
        url: `${baseUrl}/${route}`,
        lastModified: new Date().toISOString(),
    }));
}
