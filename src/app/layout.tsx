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
  title: "Claynix | Handcrafted Jewelry",
  description: "Discover exquisite handcrafted jewelry for the modern soul. Necklaces, rings, earrings, and bracelets crafted with love and precision.",
  keywords: ["jewelry", "handcrafted", "gold", "diamond", "necklaces", "rings", "earrings", "bracelets"],
  authors: [{ name: "Claynix" }],
  openGraph: {
    title: "Claynix | Handcrafted Jewelry",
    description: "Discover exquisite handcrafted jewelry for the modern soul.",
    type: "website",
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
