import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fana Spa Dashboard",
  description: "Admin dashboard for managing Fana Spa bookings, clients, and services.",
  keywords: ["Fana Spa", "dashboard", "admin panel", "spa management", "appointments", "client management"],
  authors: [{ name: "Fana Spa Team" }],
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#ffffff",
  openGraph: {
    title: "Fana Spa Dashboard",
    description: "A powerful dashboard for managing Fana Spa operations and customer interactions.",
    url: "https://dashboard.fanaspa.com",
    siteName: "Fana Spa Dashboard",
    images: [
      {
        url: "https://dashboard.fanaspa.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fana Spa Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fana Spa Dashboard",
    description: "Manage bookings, customers, and services with Fana Spa's dashboard.",
    images: ["https://dashboard.fanaspa.com/twitter-card.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
