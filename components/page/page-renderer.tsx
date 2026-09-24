import {
    getAboutBlocks,
    getCaseStudies,
    getContacts,
    getFaqs,
    getFeatures,
    getGallery,
    getHeroById,
    getNewsletters,
    getServices,
    getSocial,
    getTeam,
    getTestimonials,
    ZXContactForm,
    ZXPageSection,
} from "@/lib/graphql";

import {
    parseSections,
} from "@/lib/graphql/zx/parser";


import { HeroSection } from "../sections";
import { isAboutSection, isCaseStudiesSection, isContactSection, isCtaBannerSection, isFaqSection, isFeaturesSection, isGallerySection, isHeroSection, isNewsletterSection, isServicesSection, isTeamSection, isTestimonialsSection } from "@/lib/type-guards";
import ContactSection from "../sections/contact/contact-section";
import AboutSection from "../sections/about/about-section";
import ServicesSection from "../sections/service/services-section";
import FeaturesSection from "../sections/feature/features-section";
import FaqSection from "../sections/faq/faq-section";
import NewsletterSection from "../sections/newsletter/newsletters-section";
import GallerySection from "../sections/gallery/gallery-section";
import CaseStudiesSection from "../sections/case-studies/case-studies-section";
import CtaBannerSection from "../sections/cta-banner/cta-banner-section";

interface PageRendererProps {
    sections?: ZXPageSection[];
    lang?: string;
}

export default async function PageRenderer({
    sections,
    lang,
}: PageRendererProps) {
    if (!sections?.length) {
        return null;
    }

    // ── PARSE ─────────────────────────────────────

    const parsed =
        parseSections(sections);

    // ── FILTER SECTIONS ───────────────────────────

    const heroSections =
        parsed.filter(isHeroSection);

    const aboutSections =
        parsed.filter(isAboutSection);

    const servicesSections =
        parsed.filter(isServicesSection);

    const featuresSections =
        parsed.filter(isFeaturesSection);

    const teamSections =
        parsed.filter(isTeamSection);

    const testimonialSections =
        parsed.filter(
            isTestimonialsSection
        );

    const faqSections =
        parsed.filter(isFaqSection);

    const newsletterSections =
        parsed.filter(isNewsletterSection);

    const gallerySections =
        parsed.filter(
            isGallerySection
        );

    const caseStudiesSections =
        parsed.filter(
            isCaseStudiesSection
        );

    const contactSections =
        parsed.filter(
            isContactSection
        );

    // ── FETCH PARALLEL ────────────────────────────

    const [
        heroes,
        abouts,
        services,
        features,
        team,
        testimonials,
        faqs,
        newsletters,
        gallery,
        caseStudies,
        contacts,
        social,
    ] = await Promise.all([
        Promise.all(
            heroSections.map(
                (section) => {
                    const heroId =
                        section.data
                            .hero;

                    if (!heroId) {
                        return null;
                    }

                    return getHeroById(
                        heroId,
                        lang
                    );
                }
            )
        ),

        aboutSections.length
            ? getAboutBlocks(lang)
            : Promise.resolve([]),

        servicesSections.length
            ? getServices(lang)
            : Promise.resolve([]),

        featuresSections.length
            ? getFeatures(lang)
            : Promise.resolve([]),

        teamSections.length
            ? getTeam(lang)
            : Promise.resolve([]),

        testimonialSections.length
            ? getTestimonials(lang)
            : Promise.resolve([]),

        faqSections.length
            ? getFaqs(lang)
            : Promise.resolve([]),

        newsletterSections.length
            ? getNewsletters(lang)
            : Promise.resolve([]),

        gallerySections.length
            ? getGallery(lang)
            : Promise.resolve([]),

        caseStudiesSections.length
            ? getCaseStudies(lang)
            : Promise.resolve([]),

        contactSections.length
            ? getContacts(lang)
            : Promise.resolve([]),

        getSocial(),
    ]);

    // ── MAPS ──────────────────────────────────────

    const heroesMap = new Map(
        heroes
            .filter(Boolean)
            .map((hero) => [
                hero!.id,
                hero!,
            ])
    );

    // ── RENDER ────────────────────────────────────

    return (
        <>
            {parsed.map(
                (section, i) => {
                    switch (
                    section.layout
                    ) {
                        case "hero": {
                            if (!isHeroSection(section)) {
                                return null;
                            }

                            const heroId = section.data.hero;

                            if (!heroId) {
                                return null;
                            }

                            const hero = heroesMap.get(heroId);

                            if (!hero) {
                                return null;
                            }

                            return (
                                <HeroSection
                                    id={section.id}
                                    key={i}
                                    hero={hero}
                                />
                            );
                        }

                        case "about": {

                            if (!isAboutSection(section)) {
                                return null;
                            }

                            const ids =
                                section.data.aboutBlocks ?? [];

                            const filtered =
                                ids.length
                                    ? abouts.filter(
                                        (b) =>
                                            ids.includes(
                                                Number(b.id)
                                            )
                                    )
                                    : abouts;

                            return (
                                <AboutSection
                                    id={section.id}
                                    key={i}
                                    abouts={filtered}
                                    highlight={section.data.highlight}
                                    heroImage={section.data.heroImage}
                                    heroMobile={section.data.heroMobile}
                                    showBanner={section.data.showBanner}
                                />
                            );
                        }

                        case "features": {
                            if (!isFeaturesSection(section)) {
                                return null;
                            }

                            const ids =
                                section.data.features ?? [];

                            const filtered =
                                ids.length > 0
                                    ? features.filter((features) =>
                                        ids.includes(Number(features.id))
                                    )
                                    : features;

                            return (
                                <FeaturesSection
                                    id={section.id}
                                    key={i}
                                    features={filtered}
                                    title={section.data.title}
                                    description={section.data.description}
                                    heroImage={section.data.heroImage}
                                    highlight={section.data.highlight}
                                    showBanner={section.data.showBanner}
                                />
                            );
                        }

                        case "services": {
                            if (!isServicesSection(section)) {
                                return null;
                            }

                            const ids =
                                section.data.services ?? [];

                            const filtered =
                                ids.length > 0
                                    ? services.filter((service) =>
                                        ids.includes(Number(service.id))
                                    )
                                    : services;

                            return (
                                <ServicesSection
                                    id={section.id}
                                    key={i}
                                    services={filtered}
                                    title={section.data.title}
                                    description={section.data.description}
                                    heroImage={section.data.heroImage}
                                    heroMobile={section.data.heroMobile}
                                    highlight={section.data.highlight}
                                    showBanner={section.data.showBanner}
                                />
                            );
                        }

                        case "faq": {
                            if (!isFaqSection(section)) {
                                return null;
                            }

                            const ids =
                                section.data.faqs ?? [];

                            const filtered =
                                ids.length > 0
                                    ? faqs.filter((faq) =>
                                        ids.includes(Number(faq.id))
                                    )
                                    : faqs;

                            return (
                                <FaqSection
                                    id={section.id}
                                    key={i}
                                    faqs={filtered}
                                    title={section.data.title}
                                    description={section.data.description}
                                    heroImage={section.data.heroImage}
                                    heroMobile={section.data.heroMobile}
                                    highlight={section.data.highlight}
                                    showBanner={section.data.showBanner}
                                />
                            );
                        }

                        case "newsletter": {
                            if (!isNewsletterSection(section)) {
                                return null;
                            }

                            const ids =
                                section.data.newsletters ?? [];

                            const filtered =
                                ids.length > 0
                                    ? newsletters.filter((newsletter) =>
                                        ids.includes(Number(newsletter.id))
                                    )
                                    : newsletters;

                            return (
                                <NewsletterSection
                                    id={section.id}
                                    key={i}
                                    newsletter={filtered[0]}
                                />
                            );
                        }

                        case "gallery": {
                            if (!isGallerySection(section)) {
                                return null;
                            }

                            const ids = section.data.gallery ?? [];

                            const filtered =
                                ids.length > 0
                                    ? gallery.filter((galleryItem) => ids.includes(Number(galleryItem.id)))
                                    : gallery;

                            return (
                                <GallerySection
                                    id={section.id}
                                    key={i}
                                    items={filtered}
                                    highlight={section.data.highlight}
                                    title={section.data.title}
                                />
                            );
                        }

                        case "case_studies": {
                            if (!isCaseStudiesSection(section)) return null;

                            const ids = section.data.caseStudies ?? [];
                            const byIds = ids.length > 0
                                ? caseStudies.filter((c) => ids.includes(Number(c.id)))
                                : [];
                            const filtered = byIds.length > 0 ? byIds : caseStudies;

                            return (
                                <CaseStudiesSection
                                    id={section.id}
                                    key={i}
                                    items={filtered}
                                    highlight={section.data.highlight}
                                    title={section.data.title}
                                />
                            );
                        }

                        case "cta_banner": {
                            if (!isCtaBannerSection(section)) return null;

                            return (
                                <CtaBannerSection
                                    id={section.id}
                                    key={i}
                                    title={section.data.title}
                                    description={section.data.description}
                                    highlight={section.data.highlight}
                                    buttonText={section.data.buttonText}
                                    buttonUrl={section.data.buttonUrl}
                                    backgroundImage={section.data.backgroundImage}
                                    backgroundMobile={section.data.backgroundMobile}
                                />
                            );
                        }

                        case "contact": {

                            if (!isContactSection(section)) {
                                return null;
                            }

                            const formId =
                                section.data.formId;

                            const normalizedFormId =
                                formId?.trim().toLowerCase();

                            const fallbackForm: ZXContactForm = {
                                formId: formId || 'contact',
                                title: section.data.title || 'Contact',
                                fields: [],
                            }

                            const form =
                                contacts.find(
                                    (c) =>
                                        c.formId
                                            ?.trim()
                                            .toLowerCase() === normalizedFormId
                                ) ?? fallbackForm

                            return (
                                <ContactSection
                                    id={section.id}
                                    key={i}
                                    contact={form}
                                    highlight={section.data.highlight}
                                    title={section.data.title}
                                    description={section.data.description}
                                    social={social}
                                    email={section.data.email}
                                    phone={section.data.phone}
                                    address={section.data.address}
                                    map={section.data.map}
                                    heroImage={section.data.heroImage}
                                    heroMobile={section.data.heroMobile}
                                    lang={lang}
                                    showBanner={section.data.showBanner}
                                    buttonText={section.data.buttonText}
                                    buttonUrl={section.data.buttonUrl}
                                    secondaryButtonText={section.data.secondaryButtonText}
                                    secondaryButtonUrl={section.data.secondaryButtonUrl}
                                />
                            );
                        }

                        default:
                            return null;
                    }
                }
            )}
        </>
    );
}