import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://yxsheeworks.vercel.app/"),
  title: "Yash Dogra | Work Portfolio",
  description: "Portfolio of Yash Dogra — Creative Developer & ML Engineer specializing in NLP and computer vision.",
  keywords: ["Yash Dogra", "yxshee", "full stack developer", "ML engineer", "portfolio", "web developer", "software engineer", "NLP", "computer vision"],
  authors: [{ name: "Yash Dogra" }],
  openGraph: {
    type: "website",
    url: "https://yxsheeworks.vercel.app",
    title: "Yash Dogra | Work Portfolio",
    description: "Portfolio of Yash Dogra — Creative Developer & ML Engineer specializing in NLP and computer vision.",
    siteName: "Yash Dogra",
    locale: "en_US",
    images: [
      {
        url: "/images/core/Works.jpeg",
        secureUrl: "/images/core/Works.jpeg",
        width: 1200,
        height: 630,
        alt: "Yash Dogra - Creative Developer & ML Engineer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yxshee",
    creator: "@yxshee",
    title: "Yash Dogra | Work Portfolio",
    description: "Portfolio of Yash Dogra — Creative Developer & ML Engineer specializing in NLP and computer vision.",
    images: ["/images/core/Works.jpeg"],
  },
  icons: {
    icon: [
      {
        url: "/favicon-light.ico",
        type: "image/x-icon",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.ico",
        type: "image/x-icon",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

// Script to prevent flash of wrong theme and sync header height
const themeScript = `
(function(){
  try {
    const storedTheme = localStorage.getItem('theme');
    const systemDarkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if(storedTheme === 'dark' || (!storedTheme && systemDarkModeQuery.matches)) {
      document.documentElement.setAttribute('data-theme','dark');
      document.documentElement.style.backgroundColor = '#000000';
    }
  } catch(themeInitError) {}
  
  // Header height sync utility
  function debounce(fn, ms) {
    let timeoutId;
    return function() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(fn, ms);
    };
  }
  
  function syncHeaderHeight() {
    const header = document.querySelector('.header-bar');
    if (!header) return;
    const headerHeight = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--site-header-height', Math.ceil(headerHeight) + 'px');
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
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fcfcfc" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <CustomCursor />
          <div className="vignette" />
          <Header />
          <main className="layout-main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
