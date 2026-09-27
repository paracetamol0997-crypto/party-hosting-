import type { Metadata } from 'next';
import { Outfit, Permanent_Marker, Caveat, Bebas_Neue } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const marker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marker',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://hitesh-night-out.vercel.app'),
  title: "NIGHT OUT | Hitesh's Party",
  description:
    "You're invited to Hitesh's Night Out. Good food, great drinks and bigger vibes. October 12, 2026 @ 10:00 PM.",
  openGraph: {
    title: "NIGHT OUT | Hitesh's Party",
    description:
      "You're invited to Hitesh's Night Out. Good food, great drinks and bigger vibes.",
    url: 'https://hitesh-night-out.vercel.app',
    siteName: 'Hitesh Night Out',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Hitesh's Night Out Invitation Poster",
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "NIGHT OUT | Hitesh's Party",
    description: "Good food, great drinks and bigger vibes. Oct 12, 2026.",
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${marker.variable} ${caveat.variable} ${bebas.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@400;600;700&family=Outfit:wght@400;600;700;800;900&family=Permanent+Marker&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-night-950 text-white min-h-screen antialiased selection:bg-neon-yellow selection:text-night-950">
        {children}
      </body>
    </html>
  );
}
