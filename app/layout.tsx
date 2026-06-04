import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://packthistrip.com"),
  title: {
    default: "PackThisTrip - Smart Packing Lists for Any Trip",
    template: "%s - PackThisTrip"
  },
  description: "Build a custom packing list based on your destination, weather, trip length, luggage type, and activities.",
  openGraph: {
    title: "PackThisTrip - Smart Packing Lists for Any Trip",
    description: "Build a custom packing list based on your destination, weather, trip length, luggage type, and activities.",
    url: "https://packthistrip.com",
    siteName: "PackThisTrip",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
