import type { ZXPageSection } from "./types";

export type ZXSectionParsed =
    | {
        id: string;
        layout: "hero";
        data: {
            hero?: number;
            transparentHeader?: boolean;
            darkMode?: boolean;
            minHeight?: string;
        };
    }

    | {
        id: string;
        layout: "slider";
        data: {
            slider?: number;
        };
    }

    | {
        id: string;
        layout: "gallery";
        data: {
            gallery?: number[];
            title?: string;
            subtitle?: string;
            highlight?: string;
            perPage?: number;
            showBanner?: boolean;
        };
    }

    | {
        id: string;
        layout: "services";
        data: {
            services?: number[];
            title?: string;
            description?: string;
            highlight?: string;
            heroImage?: string;
            heroMobile?: string;
            showBanner?: boolean;
        };
    }

    | {
        id: string;
        layout: "features";
        data: {
            features?: number[];
            title?: string;
            description?: string;
            highlight?: string;
            heroImage?: string;
            heroMobile?: string;
            showBanner?: boolean;
        };
    }

    | {
        id: string;
        layout: "team";
        data: {
            team?: number[];
            title?: string;
            subtitle?: string;
            showBanner?: boolean;
        };
    }

    | {
        id: string;
        layout: "testimonials";
        data: {
            testimonials?: number[];
            title?: string;
            subtitle?: string;
            autoplay?: boolean;
            showBanner?: boolean;
        };
    }

    | {
        id: string;
        layout: "faq";
        data: {
            faqs?: number[];
            title?: string;
            description?: string;
            highlight?: string;
            heroImage?: string;
            heroMobile?: string;
            showBanner?: boolean;
        };
    }
    | {
        id: string;
        layout: "contact";
        data: {
            formId?: string;
            title?: string;
            description?: string;
            email?: string;
            phone?: string;
            address?: string;
            map?: string;
            highlight?: string;
            heroImage?: string;
            heroMobile?: string;
            showBanner?: boolean;
            buttonText?: string;
            buttonUrl?: string;
            secondaryButtonText?: string;
            secondaryButtonUrl?: string;
        };
    }

    | {
        id: string;
        layout: "documentation";
        data: {
            title?: string;
            content?: string;
            container?: "narrow" | "default" | "wide" | "full";
            anchor?: string;
        };
    }

    | {
        id: string;
        layout: "stats";
        data: {
            title?: string;
            subtitle?: string;
            stats?: number[];
            showBanner?: boolean;
        };
    }

    | {
        id: string;
        layout: "about";
        data: {
            highlight?: string;
            aboutBlocks?: number[];
            heroImage?: string;
            heroMobile?: string;
            showBanner?: boolean;
        };
    }

    | {
        id: string;
        layout: "timeline";
        data: {
            title?: string;
            subtitle?: string;
            timeline?: number[];
            showBanner?: boolean;
        };
    }

    | {
        id: string;
        layout: "industries";
        data: {
            title?: string;
            subtitle?: string;
            industries?: number[];
            showBanner?: boolean;
        };
    }

    | {
        id: string;
        layout: "case_studies";
        data: {
            caseStudies?: number[];
            title?: string;
            subtitle?: string;
            highlight?: string;
            featured?: boolean;
            showBanner?: boolean;
        };
    }

    | {
        id: string;
        layout: "pricing";
        data: {
            title?: string;
            subtitle?: string;
            plans?: number[];
            showBanner?: boolean;
        };
    }

    | {
        id: string;
        layout: "certifications";
        data: {
            title?: string;
            subtitle?: string;
            certifications?: number[];
            showBanner?: boolean;
        };
    }

    | {
        id: string;
        layout: "newsletter";
        data: {
            newsletters?: number[];
        };
    }

    | {
        id: string;
        layout: "cta_banner";
        data: {
            title?: string;
            description?: string;
            highlight?: string;
            buttonText?: string;
            buttonUrl?: string;
            backgroundImage?: string;
            backgroundMobile?: string;
            showBanner?: boolean;
        };
    }

    | {
        id: string;
        layout: string;
        data: Record<string, unknown>;
    };

export function parseSections(
    sections?: ZXPageSection[]
): ZXSectionParsed[] {
    if (!sections?.length) {
        return [];
    }

    return sections
        .map((section) => {
            try {
                const raw = JSON.parse(
                    section.rawJson || "{}"
                );

                switch (section.layout) {
                    case "about":
                        return {
                            id: section.id,
                            layout: "about",
                            data: {
                                highlight: raw.highlight,
                                heroImage: raw.hero_image?.url,
                                heroMobile: raw.hero_mobile?.url,
                                aboutBlocks: raw.about ? [Number(raw.about)] : [],
                                showBanner: raw.show_banner ?? false,
                            },
                        };
                    case "services":
                        return {
                            id: section.id,
                            layout: "services",
                            data: {
                                services: raw.services ?? [],
                                title: raw.title,
                                description: raw.description,
                                highlight: raw.highlight,
                                heroImage: raw.hero_image?.url,
                                heroMobile: raw.hero_mobile?.url,
                                showBanner: raw.show_banner ?? false,
                            },
                        };

                    case "features":
                        return {
                            id: section.id,
                            layout: "features",
                            data: {
                                features: raw.features ?? [],
                                title: raw.title,
                                description: raw.description,
                                highlight: raw.highlight,
                                heroImage: raw.hero_image?.url,
                                heroMobile: raw.hero_mobile?.url,
                                showBanner: raw.show_banner ?? false,
                            },
                        };

                    case "faq":
                        return {
                            id: section.id,
                            layout: "faq",
                            data: {
                                faqs: raw.faq ?? [],
                                title: raw.title,
                                description: raw.description,
                                highlight: raw.highlight,
                                heroImage: raw.hero_image?.url,
                                heroMobile: raw.hero_mobile?.url,
                                showBanner: raw.show_banner ?? false,
                            },
                        };

                    case "newsletter":
                        return {
                            id: section.id,
                            layout: "newsletter",
                            data: {
                                newsletters: raw.newsletters ?? [],
                            },
                        };

                    case "gallery":
                        return {
                            id: section.id,
                            layout: "gallery",
                            data: {
                                gallery: raw.gallery ?? [],
                                title: raw.title,
                                subtitle: raw.subtitle,
                                highlight: raw.highlight,
                                perPage: raw.per_page,
                                showBanner: raw.show_banner ?? false,
                            },
                        };

                    case "case_studies":
                        return {
                            id: section.id,
                            layout: "case_studies",
                            data: {
                                caseStudies: raw.case_studies ?? [],
                                title: raw.title,
                                subtitle: raw.subtitle,
                                highlight: raw.highlight,
                                featured: raw.featured,
                                showBanner: raw.show_banner ?? false,
                            },
                        };

                    case "cta_banner":
                        return {
                            id: section.id,
                            layout: "cta_banner" as const,
                            data: {
                                title: raw.title,
                                description: raw.description,
                                highlight: raw.highlight,
                                buttonText: raw.button_text,
                                buttonUrl: raw.button_url,
                                backgroundImage: raw.hero_image?.url,
                                backgroundMobile: raw.hero_mobile?.url,
                                showBanner: raw.show_banner ?? false,
                            },
                        };

                    case "contact":
                        return {
                            id: section.id,
                            layout: "contact",
                            data: {
                                title: raw.title,
                                description: raw.description,
                                email: raw.email,
                                phone: raw.phone,
                                address: raw.address,
                                map: raw.map,
                                highlight: raw.highlight,
                                heroImage: raw.hero_image?.url,
                                heroMobile: raw.hero_mobile?.url,
                                formId: raw.form_id,
                                showBanner: raw.show_banner ?? false,
                                buttonText: raw.button_text,
                                buttonUrl: raw.button_url,
                                secondaryButtonText: raw.secondary_button_text,
                                secondaryButtonUrl: raw.secondary_button_url,
                            },
                        };

                    default:
                        return {
                            id: section.id,
                            layout: section.layout,
                            data: raw,
                        };
                }
            } catch {
                return null;
            }
        })
        .filter(Boolean) as ZXSectionParsed[];
}