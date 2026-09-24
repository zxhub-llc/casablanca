"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/craft";
import { motion } from "motion/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CtaBannerSectionProps {
    id: string;
    title?: string;
    description?: string;
    highlight?: string;
    buttonText?: string;
    buttonUrl?: string;
    backgroundImage?: string;
    backgroundMobile?: string;
}

export default function CtaBannerSection({
    id,
    title,
    description,
    highlight,
    buttonText,
    buttonUrl,
    backgroundImage,
    backgroundMobile,
}: CtaBannerSectionProps) {
    const rootRef = useRef<HTMLElement>(null);

    const desktopSrc = backgroundImage || backgroundMobile || null;
    const mobileSrc = backgroundMobile || backgroundImage || null;

    const words = (title ?? "").trim().split(/\s+/).filter(Boolean);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;

            const q = gsap.utils.selector(root);
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.fromTo(
                    q("[data-cta-bg]"),
                    { yPercent: -5, scale: 1.08 },
                    {
                        yPercent: 5,
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: root,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );

                const tl = gsap.timeline({
                    defaults: { ease: "power3.out" },
                    scrollTrigger: {
                        trigger: root,
                        start: "top 65%",
                        once: true,
                    },
                });

                tl.from(q("[data-cta-eyebrow]"), {
                    autoAlpha: 0,
                    y: 12,
                    duration: 0.6,
                })
                    .from(
                        q("[data-cta-word]"),
                        { yPercent: 115, duration: 1, stagger: 0.08 },
                        "-=0.3"
                    )
                    .from(
                        q("[data-cta-desc]"),
                        { autoAlpha: 0, y: 24, duration: 0.9 },
                        "-=0.55"
                    )
                    .from(
                        q("[data-cta-button]"),
                        { autoAlpha: 0, y: 16, duration: 0.7 },
                        "-=0.55"
                    );
            });

            return () => mm.revert();
        },
        { scope: rootRef }
    );

    return (
        <section
            id={id ?? "cta_banner"}
            ref={rootRef}
            className="relative isolate w-full min-h-[90vh] md:min-h-screen overflow-hidden bg-[#001125]"
        >

            <div className="absolute inset-0 -z-10 overflow-hidden">
                {(desktopSrc || mobileSrc) && (
                    <div
                        data-cta-bg
                        className="absolute inset-x-0 top-0 h-screen will-change-transform"
                    >
                        {mobileSrc && (
                            <Image
                                src={mobileSrc}
                                alt={title || "Background"}
                                fill
                                unoptimized
                                sizes="100vw"
                                className="block object-cover sm:hidden"
                            />
                        )}
                        {desktopSrc && (
                            <Image
                                src={desktopSrc}
                                alt={title || "Background"}
                                fill
                                unoptimized
                                sizes="100vw"
                                className="hidden object-cover sm:block"
                            />
                        )}
                    </div>
                )}

                <div className="absolute inset-x-0 top-0 h-2/5 bg-linear-to-b from-brand-background to-transparent pointer-events-none z-10" />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-[#001125] to-transparent" />
            </div>

            <Container className="w-full max-w-screen mx-auto pt-8 lg:pt-14 px-4 sm:px-4 md:px-4 lg:px-8 rounded-3xl overflow-hidden relative flex min-h-[90vh] md:min-h-screen flex-col items-center justify-start text-center text-foreground">
                {highlight && (
                    <span
                        data-cta-eyebrow
                        className="mb-4 text-xs font-medium uppercase tracking-[0.3em] sm:text-sm"
                    >
                        {highlight}
                    </span>
                )}

                {title && (
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="mt-2 text-4xl font-normal leading-tight text-foreground md:text-6xl font-jakarta"
                    >
                        {title}
                    </motion.h2>
                )}

                {description && (
                    <p
                        data-cta-desc
                        className="mt-6 max-w-6xl whitespace-pre-line font-jakarta md:text-lg"
                    >
                        {description}
                    </p>
                )}

                {buttonText && buttonUrl && (
                    <Link
                        data-cta-button
                        href={buttonUrl}
                        className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#001B3D] px-8 py-3.5 text-sm font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#00305f] md:mt-10"
                    >
                        {buttonText}
                        <span
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                            →
                        </span>
                    </Link>
                )}
            </Container>
        </section>
    );
}