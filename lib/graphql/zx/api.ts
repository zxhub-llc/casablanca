// api de zx graph
import { CACHE_TTL, graphqlFetch, graphqlFetchGraceful } from "../fetch";
import { ZXSectionParsed } from "./parser";

import * as Q from "./queries";

import type {
    ZXCTA,
    ZXContactForm,
    ZXLocation,
    ZXMenu,
    ZXPage,
    ZXSeo,
    ZXService,
    ZXSite,
    ZXTeamMember,
    ZXFaq,
    ZXGalleryItem,
    ZXHero,
    ZXMediaCloud,
    ZXSlider,
    ZXTestimonial,
    ZXAboutBlock,
    ZXCaseStudy,
    ZXCertification,
    ZXIndustry,
    ZXNewsletter,
    ZXPricingPlan,
    ZXStat,
    ZXTimelineItem,
    ZXFeature,
    ZXSocial,
    ZXPaymentGateway,
} from "./types";

// SITE

export async function getSite(
    lang?: string
): Promise<ZXSite> {

    const data =
        await graphqlFetch<{
            zxSite: ZXSite;
        }>(
            Q.GET_SITE,
            { lang },
            ["site"],
            CACHE_TTL.site
        );

    return data.zxSite;
}

export async function getSocial(): Promise<ZXSocial | null> {
    const data = await graphqlFetch<{
        zxSocial: ZXSocial | null;
    }>(
        Q.GET_SOCIAL,
        {},
        ["social"],
        CACHE_TTL.social
    );

    return data?.zxSocial ?? null;
}

// CTA

export async function getCTA(
    lang?: string
): Promise<ZXCTA> {

    const data =
        await graphqlFetchGraceful<{
            zxCta: ZXCTA;
        }>(
            Q.GET_CTA,
            {
                zxCta: {
                    enabled: false,
                },
            },
            { lang },
            ["cta"],
            CACHE_TTL.cta
        );

    return data.zxCta;
}

// MENU

export async function getMenu(
    slug: string,
    lang?: string
): Promise<ZXMenu | null> {

    const data =
        await graphqlFetchGraceful<{
            zxMenu: ZXMenu | null;
        }>(
            Q.GET_MENU,
            { zxMenu: null },
            { slug, lang },
            ["menu", slug],
            CACHE_TTL.menu
        );

    return data.zxMenu;
}

// PAGE

export async function getAllZxPages(
    lang?: string
): Promise<ZXPage[]> {

    const data =
        await graphqlFetchGraceful<{
            zxPages: ZXPage[];
        }>(
            Q.GET_ALL_ZX_PAGES,
            { zxPages: [] },
            { lang },
            ["pages"],
            CACHE_TTL.pages
        );

    return data.zxPages;
}

export async function getZxPageBySlug(
    slug: string,
    lang?: string
): Promise<ZXPage | null> {

    const data =
        await graphqlFetchGraceful<{
            zxPage: ZXPage | null;
        }>(
            Q.GET_ZX_PAGE,
            { zxPage: null },
            { slug, lang },
            ["pages", `page-${slug}`],
            CACHE_TTL.pages
        );

    return data.zxPage;
}

// SEO

export async function getPageSeo(
    id: number
): Promise<ZXSeo | null> {

    const data =
        await graphqlFetchGraceful<{
            zxSeo: ZXSeo | null;
        }>(
            Q.GET_SEO,
            { zxSeo: null },
            { id },
            ["seo", `seo-${id}`],
            CACHE_TTL.pages
        );

    return data.zxSeo;
}

// SERVICES

export async function getServices(
    lang?: string
): Promise<ZXService[]> {

    const data =
        await graphqlFetchGraceful<{
            zxServices: ZXService[];
        }>(
            Q.GET_SERVICES,
            { zxServices: [] },
            { lang },
            ["services"],
            CACHE_TTL.services
        );

    return data.zxServices;
}

// FEATURES

export async function getFeatures(
    lang?: string
): Promise<ZXFeature[]> {
    const data =
        await graphqlFetchGraceful<{
            zxFeatures: ZXFeature[];
        }>(
            Q.GET_FEATURES,
            { zxFeatures: [] },
            { lang },
            ["features"],
            CACHE_TTL.services
        );

    return data.zxFeatures;
}

// TEAM

export async function getTeam(
    lang?: string
): Promise<ZXTeamMember[]> {

    const data =
        await graphqlFetchGraceful<{
            zxTeam: ZXTeamMember[];
        }>(
            Q.GET_TEAM,
            { zxTeam: [] },
            { lang },
            ["team"],
            CACHE_TTL.team
        );

    return data.zxTeam;
}

// LOCATIONS

export async function getAllLocations(): Promise<ZXLocation[]> {

    const data =
        await graphqlFetchGraceful<{
            zxLocations: ZXLocation[];
        }>(
            Q.GET_LOCATIONS,
            { zxLocations: [] },
            undefined,
            ["locations"],
            CACHE_TTL.site
        );

    return data.zxLocations;
}

export async function getLocation(
    lang?: string,
    slug?: string
): Promise<ZXLocation | null> {

    const data =
        await graphqlFetchGraceful<{
            zxLocation: ZXLocation | null;
        }>(
            Q.GET_LOCATION,
            { zxLocation: null },
            { lang, slug },
            ["locations"],
            CACHE_TTL.site
        );

    return data.zxLocation;
}

// CONTACT FORM

export async function getContactForm(
    lang?: string,
    formId = "contact"
): Promise<ZXContactForm | null> {

    const data =
        await graphqlFetchGraceful<{
            zxContactForm: ZXContactForm | null;
        }>(
            Q.GET_CONTACT_FORM,
            { zxContactForm: null },
            { lang, formId },
            ["forms"],
            CACHE_TTL.forms
        );

    return data.zxContactForm;
}

export async function submitContactForm(
    formData: Record<string, unknown>,
    formId = "contact",
    lang?: string
) {

    return graphqlFetch<{
        zxSubmitContact: {
            success: boolean;
            message: string;
        };
    }>(
        Q.SUBMIT_CONTACT_FORM,
        {
            formId,
            lang,
            data: JSON.stringify(formData),
        },
        [],
        0
    );
}

// LAYOUT HELPERS

export async function getLayoutData(
    lang?: string
) {

    const [site, menu, cta] =
        await Promise.all([
            getSite(lang),
            getMenu("primary", lang),
            getCTA(lang),
        ]);

    return {
        site,
        menu,
        cta,
    };
}

export async function getLayoutDataFull(
    lang?: string
) {

    const [
        site,
        menuPrimary,
        menuFooter,
        cta,
    ] = await Promise.all([
        getSite(lang),
        getMenu("primary", lang),
        getMenu("footer", lang),
        getCTA(lang),
    ]);

    return {
        site,
        menuPrimary,
        menuFooter,
        cta,
    };
}


// ── SLIDER ────────────────────────────────────────────────────

export async function getSlider(
    id: number,
    lang?: string
): Promise<ZXSlider | null> {
    const data = await graphqlFetchGraceful<{
        zxSlider: ZXSlider | null;
    }>(
        Q.GET_SLIDER,
        { zxSlider: null },
        { id, lang },
        ["slider", `slider-${id}`, lang ?? "default"],
        CACHE_TTL.misc
    );

    return data.zxSlider;
}

// ── HERO ──────────────────────────────────────────────────────

export async function getHeroById(
    id: number,
    lang?: string
): Promise<ZXHero | null> {
    const data = await graphqlFetchGraceful<{
        zxHero: ZXHero | null;
    }>(
        Q.GET_HERO,
        { zxHero: null },
        { id, lang },
        ["hero", `hero-${id}`, lang ?? "default"],
        CACHE_TTL.misc
    );

    return data.zxHero;
}

export async function getHeroBySlug(
    slug: string,
    lang?: string
): Promise<ZXHero | null> {
    const data = await graphqlFetchGraceful<{
        zxHero: ZXHero | null;
    }>(
        Q.GET_HERO,
        { zxHero: null },
        { slug, lang },
        ["hero", `hero-${slug}`, lang ?? "default"],
        CACHE_TTL.misc
    );

    return data.zxHero;
}

// ── TESTIMONIALS ─────────────────────────────────────────────

export async function getTestimonials(
    lang?: string,
    perPage?: number
): Promise<ZXTestimonial[]> {
    const data = await graphqlFetchGraceful<{
        zxTestimonials: ZXTestimonial[];
    }>(
        Q.GET_TESTIMONIALS,
        { zxTestimonials: [] },
        { lang, perPage },
        ["testimonials"],
        CACHE_TTL.misc
    );

    return data.zxTestimonials;
}

// ── FAQS ──────────────────────────────────────────────────────

export async function getFaqs(
    lang?: string
): Promise<ZXFaq[]> {
    const data = await graphqlFetchGraceful<{
        zxFaqs: ZXFaq[];
    }>(
        Q.GET_FAQS,
        { zxFaqs: [] },
        { lang },
        ["faqs"],
        CACHE_TTL.misc
    );

    return data.zxFaqs;
}

// ── GALLERY ───────────────────────────────────────────────────

export async function getGallery(
    lang?: string,
    perPage?: number
): Promise<ZXGalleryItem[]> {
    const data = await graphqlFetchGraceful<{
        zxGallery: ZXGalleryItem[];
    }>(
        Q.GET_GALLERY,
        { zxGallery: [] },
        { lang, perPage },
        ["gallery"],
        CACHE_TTL.misc
    );

    return data.zxGallery;
}

// ── CONTACTS ───────────────────────────────────────────────────

export async function getContacts(
    lang?: string,
    perPage?: number
): Promise<ZXContactForm[]> {
    const data = await graphqlFetchGraceful<{
        zxContacts: ZXContactForm[];
    }>(
        Q.GET_CONTACTS,
        { zxContacts: [] },
        { lang, perPage },
        ["contacts"],
        CACHE_TTL.misc
    );

    return data.zxContacts;
}

// ── MEDIA CLOUD ───────────────────────────────────────────────

export async function getMediaCloud(): Promise<ZXMediaCloud | null> {
    const data = await graphqlFetchGraceful<{
        zxMediaCloud: ZXMediaCloud | null;
    }>(
        Q.GET_MEDIA_CLOUD,
        { zxMediaCloud: null },
        undefined,
        ["media-cloud"],
        CACHE_TTL.site
    );

    return data.zxMediaCloud;
}

export async function getStats(
    lang?: string
): Promise<ZXStat[]> {

    const data =
        await graphqlFetchGraceful<{
            zxStats: ZXStat[];
        }>(
            Q.GET_STATS,
            { zxStats: [] },
            { lang },
            ["stats"],
            CACHE_TTL.misc
        );

    return data.zxStats;
}

export async function getAboutBlocks(
    lang?: string
): Promise<ZXAboutBlock[]> {

    const data =
        await graphqlFetchGraceful<{
            zxAboutBlocks: ZXAboutBlock[];
        }>(
            Q.GET_ABOUT_BLOCKS,
            { zxAboutBlocks: [] },
            { lang },
            ["about"],
            CACHE_TTL.misc
        );

    return data.zxAboutBlocks;
}

export async function getTimeline(
    lang?: string
): Promise<ZXTimelineItem[]> {

    const data =
        await graphqlFetchGraceful<{
            zxTimeline: ZXTimelineItem[];
        }>(
            Q.GET_TIMELINE,
            { zxTimeline: [] },
            { lang },
            ["timeline"],
            CACHE_TTL.misc
        );

    return data.zxTimeline;
}

export async function getIndustries(
    lang?: string
): Promise<ZXIndustry[]> {

    const data =
        await graphqlFetchGraceful<{
            zxIndustries: ZXIndustry[];
        }>(
            Q.GET_INDUSTRIES,
            { zxIndustries: [] },
            { lang },
            ["industries"],
            CACHE_TTL.misc
        );

    return data.zxIndustries;
}

export async function getCaseStudies(
    lang?: string
): Promise<ZXCaseStudy[]> {

    const data =
        await graphqlFetchGraceful<{
            zxCaseStudies: ZXCaseStudy[];
        }>(
            Q.GET_CASE_STUDIES,
            { zxCaseStudies: [] },
            { lang },
            ["case-studies"],
            CACHE_TTL.misc
        );

    return data.zxCaseStudies;
}

export async function getPricingPlans(
    lang?: string
): Promise<ZXPricingPlan[]> {

    const data =
        await graphqlFetchGraceful<{
            zxPricingPlans: ZXPricingPlan[];
        }>(
            Q.GET_PRICING_PLANS,
            { zxPricingPlans: [] },
            { lang },
            ["pricing"],
            CACHE_TTL.misc
        );

    return data.zxPricingPlans;
}

export async function getCertifications(
    lang?: string
): Promise<ZXCertification[]> {

    const data =
        await graphqlFetchGraceful<{
            zxCertifications: ZXCertification[];
        }>(
            Q.GET_CERTIFICATIONS,
            { zxCertifications: [] },
            { lang },
            ["certifications"],
            CACHE_TTL.misc
        );

    return data.zxCertifications;
}

export async function getNewsletters(
    lang?: string
): Promise<ZXNewsletter[]> {

    const data =
        await graphqlFetchGraceful<{
            zxNewsletters: ZXNewsletter[];
        }>(
            Q.GET_NEWSLETTER,
            { zxNewsletters: [] },
            { lang },
            ["newsletter"],
            CACHE_TTL.misc
        );

    return data.zxNewsletters;
}

// ── HELPER: resolver hero desde secciones de una ZXPage ───────
//
// Uso:
//   const page = await getZxPageBySlug(slug, lang);
//   const sections = parseSections(page?.sections);
//   const hero = await resolveHeroFromSections(sections, lang);
//
export async function resolveHeroFromSections(
    sections?: ZXSectionParsed[],
    lang?: string
): Promise<ZXHero | null> {
    if (!sections) {
        return null;
    }

    const heroSection = sections.find(
        (s): s is Extract<ZXSectionParsed, { layout: "hero" }> =>
            s.layout === "hero"
    );

    if (!heroSection) {
        return null;
    }

    const heroId = heroSection.data.hero;

    if (!heroId) {
        return null;
    }

    return getHeroById(heroId, lang);
}

export async function getPaymentGateways(
    lang?: string
): Promise<ZXPaymentGateway[]> {
    const data = await graphqlFetchGraceful<{
        zxPaymentGateways: ZXPaymentGateway[];
    }>(
        Q.GET_PAYMENT_GATEWAYS,
        { zxPaymentGateways: [] },
        { lang },
        ["payment-gateways"],
        CACHE_TTL.site
    );

    return data.zxPaymentGateways ?? [];
}