import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Yash Dogra | Portfolio",
  description: "Creative Developer & Visual Designer",
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
