"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

import { ZXService } from "@/lib/graphql";
import { Banner } from "../components/banner";
import { Container, Section } from "@/components/craft";
import { PalmShadowOverlay } from "@/components/palm-shadow-overlay";

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
    services?: ZXService[];
    title?: string;
    description?: string;
    heroImage?: string;
    heroMobile?: string;
    highlight?: string;
    showBanner?: boolean;
}

interface CardItem {
    title: string;
    description?: string;
    icon?: string;
}

export default function ServicesSection({
    services = [],
    title,
    description,
    heroImage,
    heroMobile,
    highlight,
    showBanner,
}: ServicesSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsWrapRef = useRef<HTMLDivElement>(null);
    const items: CardItem[] = showBanner
        ? (services[0]?.features ?? []).map((f) => ({
            title: f.title,
            description: f.desc,
            icon: f.icon,
        }))
        : services.map((s) => ({
            title: s.title,
            description: s.shortDesc,
            icon: s.icon,
        }));

    useLayoutEffect(() => {
        if (!sectionRef.current || items.length === 0) return;

        const mm = gsap.matchMedia();

        // ── DESKTOP ──
        mm.add("(min-width: 1024px)", () => {
            const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]", sectionRef.current);

            gsap.set(cardsWrapRef.current, { height: 0 });
            gsap.set(cards, { opacity: 0, x: 200, scale: 0.95 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${window.innerHeight * (2 + cards.length * 0.4)}`,
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // 1. Se abre el espacio de las cards y el título sube solo
            tl.to(cardsWrapRef.current, {
                height: "auto",
                duration: 1.5,
                ease: "power2.inOut",
            });

            // 2. Entran las cards de derecha a izquierda (con un pequeño solape)
            tl.to(
                cards,
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.35,
                },
                "-=0.6"
            );

            // 3. Pausa final antes de soltar el pin
            tl.to({}, { duration: 0.8 });
        });

        // ── MÓVIL ──
        mm.add("(max-width: 1023px)", () => {
            const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]", sectionRef.current);

            cards.forEach((card) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, x: 80 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 88%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        });

        return () => mm.revert();
    }, [items.length]);

    if (items.length === 0) return null;

    return (
        <>
            {showBanner && (
                <Banner image={heroImage} mobile={heroMobile} title={services[0]?.title} />
            )}

            <section
                ref={sectionRef}
                className="relative flex min-h-screen w-full items-center overflow-hidden bg-secondary"
            >
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-brand-background to-transparent" />
                <div className="pointer-events-none absolute inset-0 -scale-x-100">
                    <PalmShadowOverlay />
                </div>
                <Container className="mx-auto w-full max-w-screen px-4 py-12 text-black lg:px-16 lg:py-0">
                    {(title || description || highlight) && (
                        <div className="mx-auto max-w-8xl space-y-6 text-center">
                            {highlight && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4 }}
                                    className="text-sm font-medium uppercase tracking-[0.2em] text-foreground font-jakarta"
                                >
                                    {highlight}
                                </motion.p>
                            )}

                            {title && (
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1, duration: 0.5 }}
                                    className="mt-2 text-5xl font-normal leading-[0.95] tracking-tighter text-foreground md:text-7xl font-jakarta"
                                >
                                    {title}
                                </motion.h3>
                            )}

                            {description && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="text-sm font-medium uppercase text-foreground font-jakarta"
                                >
                                    {description}
                                </motion.div>
                            )}
                        </div>
                    )}

                    <div ref={cardsWrapRef} className="lg:h-0 lg:overflow-hidden">
                        <div className="mx-auto grid max-w-8xl grid-cols-1 gap-5 pb-4 pt-6 md:grid-cols-4 lg:pt-10">
                            {items.map((item, i) => (
                                <ServiceCard key={`${item.title}-${i}`} item={item} />
                            ))}
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}

/* ─────────────────────────────────────────────
   CARD INDIVIDUAL
───────────────────────────────────────────── */
function ServiceCard({ item }: { item: CardItem }) {
    return (
        <div data-service-card className="will-change-transform">
            <div
                className="group relative flex aspect-9/14 h-full flex-col justify-end overflow-hidden rounded-3xl bg-brand-background bg-cover bg-center py-4 px-4 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={
                    item.icon
                        ? { backgroundImage: `url("${item.icon}")` }
                        : undefined
                }
            >
                {/* Degradado para legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

                {/* Contenido */}
                <div className="relative z-10 bg-background rounded-full text-foreground px-4 w-fit h-8 flex items-center justify-center">
                    <h4 className="text-sm font-semibold font-jakarta">
                        {item.title}
                    </h4>

                    {item.description && (
                        <p className="mt-3 text-xs text-white/85 font-jakarta">
                            {item.description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}