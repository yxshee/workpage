import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Yash Dogra | Portfolio",
  description: "Creative Developer & ML Engineer specializing in NLP and computer vision.",
  openGraph: {
    title: "Yash Dogra | Portfolio",
    description: "Creative Developer & ML Engineer",
    images: [
      {
        url: "/images/core/image1.webp",
        width: 1200,
        height: 630,
        alt: "Yash Dogra Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Dogra | Portfolio",
    description: "Creative Developer & ML Engineer",
    images: ["/images/core/image1.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="vignette" />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
