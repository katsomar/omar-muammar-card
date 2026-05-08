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
  metadataBase: new URL("https://omar-muammar-portfolio.vercel.app"),
  title: "Bablo Muammar Omar | Skyrix Technologies",
  description: "Co-Founder of Skyrix Technologies. Building the future with cutting-edge technology.",
  applicationName: "Bablo Muammar Omar",
  authors: [{ name: "Bablo Muammar Omar" }],
  creator: "Bablo Muammar Omar",
  publisher: "Bablo Muammar Omar",
  openGraph: {
    title: "Bablo Muammar Omar | Skyrix Technologies",
    description: "Co-Founder of Skyrix Technologies. Building the future with cutting-edge technology.",
    url: "https://omar-muammar-portfolio.vercel.app",
    siteName: "Bablo Muammar Omar",
    images: [
      {
        url: "/logo/logo2.png",
        width: 800,
        height: 600,
        alt: "Bablo Muammar Omar Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bablo Muammar Omar | Skyrix Technologies",
    description: "Co-Founder of Skyrix Technologies. Building the future with cutting-edge technology.",
    images: ["/logo/logo2.png"],
  },
  icons: {
    icon: "/logo/logo2.png",
    shortcut: "/logo/logo2.png",
    apple: "/logo/logo2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Bablo Muammar Omar",
              "alternateName": ["Bablo Muammar", "Muammar Omar"],
              "url": "https://omar-muammar-portfolio.vercel.app",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}

