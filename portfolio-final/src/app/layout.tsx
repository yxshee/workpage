import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

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

// Script to prevent flash of wrong theme
const themeScript = `
(function(){
  try {
    const stored = localStorage.getItem('theme');
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    if(stored === 'dark' || (!stored && media.matches)) {
      document.documentElement.setAttribute('data-theme','dark');
    }
  } catch(e) {}
})()
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fcfcfc" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0B0F13" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <div className="vignette" />
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
