import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";

export const metadata: Metadata = {
  metadataBase: new URL("https://packthistrip.com"),
  applicationName: "PackThisTrip",
  manifest: "/manifest.webmanifest",
  title: {
    default: "PackThisTrip - Smart Packing Lists for Any Trip",
    template: "%s - PackThisTrip"
  },
  description: "Build a custom packing list based on your destination, weather, trip length, luggage type, and activities.",
  appleWebApp: {
    capable: true,
    title: "PackThisTrip",
    statusBarStyle: "default"
  },
  formatDetection: {
    telephone: false
  },
  icons: {
    icon: "/icons/packthistrip-icon.svg",
    apple: "/icons/packthistrip-icon-192.png"
  },
  openGraph: {
    title: "PackThisTrip - Smart Packing Lists for Any Trip",
    description: "Build a custom packing list based on your destination, weather, trip length, luggage type, and activities.",
    url: "https://packthistrip.com",
    siteName: "PackThisTrip",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "PackThisTrip"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "PackThisTrip - Smart Packing Lists for Any Trip",
    description: "Build a custom packing list based on your destination, weather, trip length, luggage type, and activities.",
    images: ["/og-image.svg"]
  }
};

export const viewport: Viewport = {
  themeColor: "#0f172a"
};

const microsoftClarityId = process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 font-sans antialiased">
        {microsoftClarityId ? (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", ${JSON.stringify(microsoftClarityId)});
            `}
          </Script>
        ) : null}
        <ServiceWorkerRegistration />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
