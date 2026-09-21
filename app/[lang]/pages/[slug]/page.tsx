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
    title: page.seo.title ?? page.title ?? name,
    description: page.seo.description,
    alternates: {
      canonical: page.seo.canonical,
    },
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
  return <PageRenderer sections={page.sections} lang={lang} />;
}