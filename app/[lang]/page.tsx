import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getZxPageBySlug } from "@/lib/graphql";
import PageRenderer from "@/components/page/page-renderer";

export const revalidate = 3600;

// Mapeo de slug por idioma (igual que en la versión anterior)
const slugByLang: Record<string, string> = {
  en: "home",
  es: "inicio",
};

function getSlugForLang(lang: string): string {
  return slugByLang[lang] ?? slugByLang.es;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const slug = getSlugForLang(lang);
  const page = await getZxPageBySlug(slug, lang);

  if (!page?.seo) return {};

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical: "/" },
    openGraph: page.seo.ogImage ? { images: [{ url: page.seo.ogImage }] } : undefined,
    robots: page.seo.noindex ? { index: false } : undefined,
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const slug = getSlugForLang(lang);
  const page = await getZxPageBySlug(slug, lang);

  if (!page) notFound();

  return <PageRenderer sections={page.sections} lang={lang} />;
}