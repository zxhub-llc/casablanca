import { ZXSectionParsed } from "./graphql/zx/parser";

export function isHeroSection(
    section: ZXSectionParsed
): section is Extract<
    ZXSectionParsed,
    { layout: "hero" }
> {
    return section.layout === "hero";
}

export function isAboutSection(
    section: ZXSectionParsed
): section is Extract<
    ZXSectionParsed,
    { layout: "about" }
> {
    return section.layout === "about";
}

export function isServicesSection(
    section: ZXSectionParsed
): section is Extract<
    ZXSectionParsed,
    { layout: "services" }
> {
    return section.layout === "services";
}

export function isFeaturesSection(
    section: ZXSectionParsed
): section is Extract<
    ZXSectionParsed,
    { layout: "features" }
> {
    return section.layout === "features";
}

export function isTeamSection(
    section: ZXSectionParsed
): section is Extract<
    ZXSectionParsed,
    { layout: "team" }
> {
    return section.layout === "team";
}

export function isTestimonialsSection(
    section: ZXSectionParsed
): section is Extract<
    ZXSectionParsed,
    { layout: "testimonials" }
> {
    return section.layout === "testimonials";
}

export function isFaqSection(
    section: ZXSectionParsed
): section is Extract<
    ZXSectionParsed,
    { layout: "faq" }
> {
    return section.layout === "faq";
}

export function isNewsletterSection(
    section: ZXSectionParsed
): section is Extract<
    ZXSectionParsed,
    { layout: "newsletter" }
> {
    return section.layout === "newsletter";
}

export function isGallerySection(
    section: ZXSectionParsed
): section is Extract<
    ZXSectionParsed,
    { layout: "gallery" }
> {
    return section.layout === "gallery";
}

export function isCaseStudiesSection(
    section: ZXSectionParsed
): section is Extract<ZXSectionParsed, { layout: "case_studies" }> {
    return section.layout === "case_studies";
}

export function isCtaBannerSection(
    section: ZXSectionParsed
): section is Extract<ZXSectionParsed, { layout: "cta_banner" }> {
    return section.layout === "cta_banner";
}

export function isContactSection(
    section: ZXSectionParsed
): section is Extract<
    ZXSectionParsed,
    { layout: "contact" }
> {
    return section.layout === "contact";
}