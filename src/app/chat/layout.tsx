import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'AI Chat Demo',
    description:
        'Interactive AI chat feature built with Next.js as part of Lanang Lanusa’s portfolio. Explore multi-model AI integration and real-time responses.',
    keywords: [
        'AI chat demo',
        'Next.js AI integration',
        'AI chatbot portfolio project',
    ],
    authors: [{ name: 'Kadek Lanang Lanusa Putera', url: 'https://lananglanusa.my.id' }],
    creator: 'Kadek Lanang Lanusa Putera',
    openGraph: {
        title: 'AI Chat Demo - Lanang Lanusa',
        description:
            'Interactive AI chat feature built with Next.js as part of Lanang Lanusa’s portfolio. Explore multi-model AI integration and real-time responses.',
        url: 'https://lananglanusa.my.id/chat',
        siteName: 'LanangLanusa.my.id',
        images: [
            {
                url: 'https://lananglanusa.my.id/chat-og-image.webp',
                width: 1200,
                height: 675,
                alt: 'Chat with AI – Lanang Lanusa',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Chat Demo - Lanang Lanusa',
        description:
            'Interactive AI chat feature built with Next.js as part of Lanang Lanusa’s portfolio. Explore multi-model AI integration and real-time responses.',
        images: ['https://lananglanusa.my.id/chat-og-image.webp'],
    },
};

export default function ChatLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children
}