import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import ReduxProvider from "./ReduxProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s - Lanang Lanusa',
    default: 'Lanang Lanusa | Web Developer Bali (Next.js)',
  },
  description:
    'Personal website of Lanang Lanusa, a Bali-based web developer working with Next.js to build clean and modern web experiences. See projects, services, and more.',
  keywords: [
    'Lanang Lanusa',
    'Kadek Lanang Lanusa Putera',
    'Web Developer from Bali',
    'Frontend Developer Indonesia',
    'Next.js Developer',
  ],
  authors: [{ name: 'Kadek Lanang Lanusa Putera', url: 'https://lananglanusa.my.id' }],
  creator: 'Kadek Lanang Lanusa Putera',
  openGraph: {
    title: 'Lanang Lanusa | Web Developer Bali (Next.js)',
    description:
      'Personal website of Lanang Lanusa, a Bali-based web developer working with Next.js to build clean and modern web experiences. See projects, services, and more.',
    url: 'https://lananglanusa.my.id',
    siteName: 'LanangLanusa.my.id',
    images: [
      {
        url: 'https://lananglanusa.my.id/og-image.webp',
        width: 1200,
        height: 675,
        alt: 'Kadek Lanang Lanusa Putera - Web Developer from Bali',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lanang Lanusa | Web Developer Bali (Next.js)',
    description:
      'Personal website of Lanang Lanusa, a Bali-based web developer working with Next.js to build clean and modern web experiences. See projects, services, and more.',
    images: ['https://lananglanusa.my.id/og-image.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://lananglanusa.my.id" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Kadek Lanang Lanusa Putera",
                alternateName: "Lanang Lanusa",
                url: "https://lananglanusa.my.id",
                sameAs: [
                  "https://www.youtube.com/@lananglanusa",
                  "https://soundcloud.com/lanang-lanusa-putera"
                ],
                jobTitle: "Web Developer",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Bali",
                  addressCountry: "ID"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Lanang Lanusa",
                url: "https://lananglanusa.my.id",
                description:
                  "Personal website of Lanang Lanusa, a Bali-based web developer working with Next.js to build clean and modern web experiences."
              }
            ]),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} antialiased`}
      >
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            // defaultTheme="system"
            defaultTheme="dark"
            // enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReduxProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}