import type { Metadata, Viewport } from "next";
import "@fontsource-variable/figtree";
import "@fontsource-variable/inter";
import { Providers } from "@/components/ui/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grippi — every platform, one honest number (redesign concept)",
  description:
    "A redesign concept for grippi.io: blended ROAS, forecasts and AI insights for eCommerce brands and agencies. Not the official site.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
  ],
};

// Applies the saved theme (or the OS setting) before first paint so there is no flash.
const themeScript = `(function(){var t='system';try{var s=localStorage.getItem('theme');if(s==='dark'||s==='light'||s==='system')t=s}catch(e){}var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var e=document.documentElement;e.dataset.theme=d?'dark':'light';e.dataset.themePref=t})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
