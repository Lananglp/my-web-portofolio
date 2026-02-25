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
    default: 'Kadek Lanang Lanusa Putera | Web Developer from Bali - Lanang Lanusa', // a default is required when creating a template
  },
  description:
    'Kadek Lanang Lanusa Putera is a frontend developer from Bali with expertise in React, Next.js, Laravel, and modern UI development. Explore his works and complete portfolio here.',
  keywords: [
    'Lanang Lanusa',
    'Kadek Lanang Lanusa Putera',
    'Web Developer from Bali',
    'Frontend Developer Indonesia',
    'Next.js Developer',
    'React Developer Indonesia',
    'Web Developer Portfolio',
    'Young Programmer from Bali',
  ],
  authors: [{ name: 'Kadek Lanang Lanusa Putera', url: 'https://lananglanusa.my.id' }],
  creator: 'Kadek Lanang Lanusa Putera',
  openGraph: {
    title: 'Kadek Lanang Lanusa Putera | Web Developer from Bali',
    description:
      'Personal portfolio of Kadek Lanang Lanusa Putera, a frontend developer from Bali skilled in Next.js, Laravel, and React. Discover his best projects and contributions.',
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
    title: 'Kadek Lanang Lanusa Putera | Web Developer from Bali',
    description:
      'Get to know Kadek Lanang Lanusa Putera, a young developer from Bali with expertise in React, Next.js, and Laravel.',
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