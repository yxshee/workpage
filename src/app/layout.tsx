import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://yashdogra.dev"),
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

// Script to prevent flash of wrong theme and sync header height
const themeScript = `
(function(){
  try {
    const stored = localStorage.getItem('theme');
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    if(stored === 'dark' || (!stored && media.matches)) {
      document.documentElement.setAttribute('data-theme','dark');
      document.documentElement.style.backgroundColor = '#000000';
    }
  } catch(e) {}
  
  // Header height sync utility
  function debounce(fn, ms) {
    let t;
    return function() {
      clearTimeout(t);
      t = setTimeout(fn, ms);
    };
  }
  
  function syncHeaderHeight() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const h = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--site-header-height', Math.ceil(h) + 'px');
  }
  
  // Sync on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncHeaderHeight);
  } else {
    syncHeaderHeight();
  }
  
  // Sync on resize (debounced)
  window.addEventListener('resize', debounce(syncHeaderHeight, 120));
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fcfcfc" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <CustomCursor />
          <div className="vignette" />
          <Header />
          <main className="site-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
