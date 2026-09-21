import { headers } from "next/headers";
import type { Metadata } from "next";

import Link from "next/link";

import {
  getAllPages,
  getAllZxPages,
  getSite,
  getZxPageBySlug,
} from "@/lib/graphql";

import {
  Section, Container, Prose,
} from "@/components/craft";

import BackButton from "@/components/back";

export const revalidate = 3600;

async function getLang(): Promise<string> {
  const headersList = await headers();

  return headersList.get("x-lang") ?? "es";
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }>; }): Promise<Metadata> {
  const { slug } = await params;
  const lang = await getLang();
  const page = await getZxPageBySlug(slug, lang);

  if (!page?.seo) return {};

  return {
    title: page.seo.title ?? page.title ?? name,
    description: page.seo.description,
    alternates: { canonical: `/pages/${slug}` },
    openGraph: page.seo.ogImage
      ? { images: [{ url: page.seo.ogImage }] }
      : undefined,
    robots: page.seo.noindex ? { index: false } : undefined,
  };
}

export default async function Page() {
  const lang = await getLang();

  const pages = await getAllZxPages(lang);

  return (
    <Section>
      <Container className="space-y-6">
        <Prose className="mb-8">
          <h2>All Pages</h2>

          {pages.length > 0 ? (
            <ul className="grid gap-2">
              {pages.map((page) => (
                <li key={page.id}>
                  <Link href={`/pages/${page.slug}`}>
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">
              No pages available yet.
            </p>
          )}
        </Prose>

        <BackButton />
      </Container>
    </Section>
  );
}
