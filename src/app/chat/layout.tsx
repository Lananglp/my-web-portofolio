import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Chat with AI | Free AI Conversations',
    description:
        'Experience free AI-powered chat conversations on Kadek Lanang Lanusa Putera’s portfolio website. Try out various AI models and enjoy multilingual support.',
    keywords: [
        'AI chat',
        'free AI',
        'AI conversation',
        'AI chatbot',
        'Kadek Lanang Lanusa',
        'Next.js AI chat',
        'AI on portfolio site',
    ],
    authors: [{ name: 'Kadek Lanang Lanusa Putera', url: 'https://lananglanusa.my.id' }],
    creator: 'Kadek Lanang Lanusa Putera',
    openGraph: {
        title: 'Chat with AI | Free AI Conversations',
        description:
            'Try out free AI chat on Lanang Lanusa’s portfolio. Powered by multiple AI models, no registration needed.',
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
        title: 'Chat with AI | Free AI Conversations',
        description:
            'Start a free AI conversation now on Lanang Lanusa’s portfolio site, using various AI models via API integrations.',
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