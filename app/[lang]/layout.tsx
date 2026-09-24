import "../globals.css";

import {
  Inter,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";

import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { getCTA, getMenu, getSite } from "@/lib/graphql";
import { SpeedInsights } from "@vercel/speed-insights/next";

const interHeading = Inter({ subsets: ['latin'], variable: '--font-heading' });

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans'
});

const fontJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const site = await getSite(lang);

  return {
    title: {
      default: site?.title ?? siteConfig.site_name,
      template: `%s | ${site?.title ?? siteConfig.site_name}`,
    },
    description:
      site?.description ?? siteConfig.site_description,
    metadataBase: new URL(
      site?.url ?? siteConfig.site_domain
    ),
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: [
        { url: "/favicon/favicon.ico" },
        { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
      },
    },
    manifest: "/favicon/site.webmanifest",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const [footerMenu, headerMenu, site, cta] =
    await Promise.all([
      getMenu("footer", lang),
      getMenu("primary", lang),
      getSite(lang),
      getCTA(lang),
    ]);
  return (
    <html translate="no" lang={lang} suppressHydrationWarning className={cn("font-sans", plusJakartaSans.variable, interHeading.variable)}>
      <head>
        <meta name="google" content="notranslate" />
        <meta name="microsoft" content="notranslate" />
      </head>
      <body className={cn("min-h-screen font-sans antialiased bg-secondary", plusJakartaSans.variable, fontJakarta.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SpeedInsights />
          <Nav menu={headerMenu} site={site} cta={cta} languages={site?.languages ?? []} />
          {children}
          <Footer footerMenu={footerMenu} site={site} />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
