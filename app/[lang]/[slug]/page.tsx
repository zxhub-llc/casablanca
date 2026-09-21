// app/pages/[slug]/page.tsx
// Renderiza páginas de WordPress con secciones ZX dinámicas.
// Si la página tiene template "documentation", muestra el contenido HTML directamente.
// Si es "blank", usa PageRenderer con secciones flexibles.

import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Section, Container, Prose } from "@/components/craft";
import type { Metadata } from "next";
import { getZxPageBySlug } from "@/lib/graphql";
import PageRenderer from "@/components/page/page-renderer";

export const revalidate = 3600;

async function getLang(): Promise<string> {
  const headersList = await headers();
  return headersList.get("x-lang") ?? "es";
}

// generateStaticParams: puedes mantener el de wordpress o
// complementarlo con slugs de ZX pages si los tienes disponibles.
// Por simplicidad, se deja dinámico (sin generateStaticParams).

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lang = await getLang();
  const page = await getZxPageBySlug(slug, lang);

  if (!page?.seo) return {};

  return {
    title: page.seo.title ?? page.title,
    description: page.seo.description,
    alternates: { canonical: `/pages/${slug}` },
    openGraph: page.seo.ogImage
      ? { images: [{ url: page.seo.ogImage }] }
      : undefined,
    robots: page.seo.noindex ? { index: false } : undefined,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lang = await getLang();
  const page = await getZxPageBySlug(slug, lang);

  if (!page) notFound();

  // Template "documentation": página legal/estática con HTML
  // El layout documentation dentro de sections ya maneja esto,
  // pero si el template de página completo es "documentation"
  // mostramos solo el contenido del primer section documentation.
  if (page.template === "documentation") {
    const docSection = page.sections?.find(
      (s) => s.layout === "documentation"
    );
    const data = docSection
      ? (() => {
        try {
          return JSON.parse(docSection.rawJson) as {
            title?: string;
            content?: string;
          };
        } catch {
          return null;
        }
      })()
      : null;

    return (
      <Section>
        <Container>
          <Prose>
            {data?.title && <h1>{data.title}</h1>}
            {data?.content && (
              <div
                dangerouslySetInnerHTML={{
                  __html: data.content,
                }}
              />
            )}
          </Prose>
        </Container>
      </Section>
    );
  }

  // Template "blank" (default): secciones flexibles
  return <PageRenderer sections={page.sections} lang={lang} />;
}