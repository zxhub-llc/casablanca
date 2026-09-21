import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getZxPageBySlug } from "@/lib/graphql";
import PageRenderer from "@/components/page/page-renderer";

export const revalidate = 3600;

async function getLang(): Promise<string> {
  const headersList = await headers();
  return headersList.get("x-lang") ?? "es";
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const page = await getZxPageBySlug("inicio", lang);

  if (!page?.seo) return {};

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical: "/" },
    openGraph: page.seo.ogImage
      ? { images: [{ url: page.seo.ogImage }] }
      : undefined,
    robots: page.seo.noindex ? { index: false } : undefined,
  };
}

export default async function Home() {
  const lang = await getLang();
  const page = await getZxPageBySlug("inicio", lang);

  if (!page) notFound();

  return <PageRenderer sections={page.sections} lang={lang} />;
}