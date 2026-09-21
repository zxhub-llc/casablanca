import type { ZXPageSection } from "./types";

export type ZXSectionParsed =
    | {
        layout: "hero";
        data: {
            hero?: number;
            transparentHeader?: boolean;
            darkMode?: boolean;
            minHeight?: string;
        };
    }

    | {
        layout: "slider";
        data: {
            slider?: number;
        };
    }

    | {
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
        layout: "team";
        data: {
            team?: number[];
            title?: string;
            subtitle?: string;
            showBanner?: boolean;
        };
    }

    | {
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
        layout: "documentation";
        data: {
            title?: string;
            content?: string;
            container?: "narrow" | "default" | "wide" | "full";
            anchor?: string;
        };
    }

    | {
        layout: "stats";
        data: {
            title?: string;
            subtitle?: string;
            stats?: number[];
            showBanner?: boolean;
        };
    }

    | {
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
        layout: "timeline";
        data: {
            title?: string;
            subtitle?: string;
            timeline?: number[];
            showBanner?: boolean;
        };
    }

    | {
        layout: "industries";
        data: {
            title?: string;
            subtitle?: string;
            industries?: number[];
            showBanner?: boolean;
        };
    }

    | {
        layout: "case_studies";
        data: {
            caseStudies?: number[];
            title?: string;
            subtitle?: string;
            highlight?: string;   // 👈 nuevo
            featured?: boolean;
            showBanner?: boolean;
        };
    }

    | {
        layout: "pricing";
        data: {
            title?: string;
            subtitle?: string;
            plans?: number[];
            showBanner?: boolean;
        };
    }

    | {
        layout: "certifications";
        data: {
            title?: string;
            subtitle?: string;
            certifications?: number[];
            showBanner?: boolean;
        };
    }

    | {
        layout: "newsletter";
        data: {
            newsletters?: number[];
        };
    }

    | {
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
        layout: "woocommerce_products";
        data: {
            title?: string;
            description?: string;
            highlight?: string;
            mode?: string;
            products?: number[];
            category?: number;
            limit?: number;
            columns?: number;
            showPrice?: boolean;
            showCart?: boolean;
            heroImage?: string;
            heroMobile?: string;
            showBanner?: boolean;
        };
    }

    | {
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

                    case "woocommerce_products":
                        return {
                            layout: "woocommerce_products" as const,
                            data: {
                                title: raw.title as string | undefined,
                                description: raw.description as string | undefined,
                                highlight: raw.highlight as string | undefined,
                                mode: raw.mode as string | undefined,
                                products: (raw.products ?? []) as number[],
                                category: raw.category as number | undefined,
                                limit: raw.limit as number | undefined,
                                columns: raw.columns as number | undefined,
                                showPrice: raw.show_price ?? true,
                                showCart: raw.show_cart ?? true,
                                heroImage: raw.hero_image?.url as string | undefined,
                                heroMobile: raw.hero_mobile?.url as string | undefined,
                                showBanner: raw.show_banner ?? false,
                            },
                        };

                    case "features":
                        return {
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
                            layout: "newsletter",
                            data: {
                                newsletters: raw.newsletters ?? [],
                            },
                        };

                    case "gallery":
                        return {
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