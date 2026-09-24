"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ZXCaseStudy } from "@/lib/graphql";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudiesSectionProps {
    id: string;
    items: ZXCaseStudy[];
    highlight?: string;
    title?: string;
}

interface Photo {
    id: string;
    src: string;
    alt: string;
}

const PER_SLIDE_DESKTOP = 5;
const PER_SLIDE_MOBILE = 3;

const chunk = <T,>(arr: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );

export default function CaseStudiesSection({
    id,
    items,
    highlight,
    title,
}: CaseStudiesSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const touchX = useRef<number | null>(null);

    const [index, setIndex] = useState(0);
    const [isDesktop, setIsDesktop] = useState(
        () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
    );

    useEffect(() => {
        const mql = window.matchMedia("(min-width: 1024px)");
        const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    const photos = useMemo<Photo[]>(
        () =>
            items
                .flatMap((c) =>
                    c.thumbnail
                        ? [{ id: `${c.id}-thumb`, src: c.thumbnail, alt: c.title ?? "" }]
                        : (c.gallery ?? []).map((src, idx) => ({
                            id: `${c.id}-${idx}`,
                            src,
                            alt: c.title ?? "",
                        }))
                )
                .filter((p) => !!p.src),
        [items]
    );

    const perSlide = isDesktop ? PER_SLIDE_DESKTOP : PER_SLIDE_MOBILE;
    const slides = useMemo<Photo[][]>(() => chunk(photos, perSlide), [photos, perSlide]);
    const total = slides.length;

    useEffect(() => {
        setIndex((i) => Math.min(i, Math.max(total - 1, 0)));
    }, [total]);

    const goTo = useCallback(
        (next: number) => {
            const i = Math.max(0, Math.min(total - 1, next));
            setIndex(i);
            gsap.to(trackRef.current, {
                xPercent: -100 * i,
                duration: 0.8,
                ease: "power3.inOut",
                overwrite: "auto",
            });
        },
        [total]
    );

    useLayoutEffect(() => {
        if (!sectionRef.current || total === 0) return;

        const mm = gsap.matchMedia();

        const buildPinTimeline = () => {
            const els = gsap.utils.toArray<HTMLElement>(
                '[data-slide="0"] [data-case-item]',
                sectionRef.current
            );

            gsap.set(wrapRef.current, { height: 0 });
            gsap.set(els, { opacity: 0, x: 200, scale: 0.95 });
            gsap.set("[data-carousel-ui]", { opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${window.innerHeight * (2 + els.length * 0.4)}`,
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            tl.to(wrapRef.current, {
                height: "auto",
                duration: 1.5,
                ease: "power2.inOut",
            });

            tl.to(
                els,
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

            tl.to("[data-carousel-ui]", { opacity: 1, duration: 0.4 }, ">-0.2");

            tl.to({}, { duration: 0.8 });
        };

        mm.add("(min-width: 1024px)", buildPinTimeline);

        mm.add("(max-width: 1023px)", buildPinTimeline);

        return () => mm.revert();
    }, [total]);

    if (total === 0) return null;

    const onTouchStart = (e: React.TouchEvent) => {
        touchX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) < 50) return;
        goTo(index + (dx < 0 ? 1 : -1));
    };

    const pad = (n: number) => String(n).padStart(2, "0");

    return (
        <section
            id={id ?? "case_studies"}
            ref={sectionRef}
            className="relative flex min-h-screen w-full items-center overflow-hidden bg-background"
        >
            <div className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-brand-background to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-brand-background to-transparent pointer-events-none z-10" />

            <div className="mx-auto w-full max-w-8xl px-4 py-12 lg:px-8 lg:py-0 relative z-20">
                {(highlight || title) && (
                    <div className="mx-auto max-w-8xl space-y-5 text-center">
                        {highlight && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4 }}
                                className="text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-foreground font-jakarta"
                            >
                                {highlight}
                            </motion.p>
                        )}

                        {title && (
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="mt-2 text-lg font-normal leading-tight text-foreground md:text-5xl font-jakarta"
                            >
                                {title}
                            </motion.h2>
                        )}
                    </div>
                )}

                {/* altura controlada por GSAP (height:0 → auto) en ambos breakpoints */}
                <div ref={wrapRef} className="overflow-hidden">
                    {/* Viewport: -mr-3 + pr-3 por slide = gap de 12px entre slides sin romper el xPercent */}
                    <div
                        ref={viewportRef}
                        className="-mr-3 overflow-hidden pt-8 lg:mt-10 lg:pt-0"
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                    >
                        <div ref={trackRef} className="flex will-change-transform">
                            {slides.map((group, s) => {
                                const isMosaic = group.length === perSlide;
                                return (
                                    <div
                                        key={s}
                                        data-slide={s}
                                        aria-hidden={s !== index}
                                        className="box-border shrink-0 basis-full pr-3"
                                    >
                                        <div
                                            className={cn(
                                                "grid grid-cols-2 gap-3 lg:h-[56vh]",
                                                isMosaic
                                                    ? "lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-2"
                                                    : "lg:grid-flow-col lg:auto-cols-fr"
                                            )}
                                        >
                                            {group.map((photo, i) => (
                                                <div
                                                    key={photo.id}
                                                    data-case-item
                                                    className={cn(
                                                        "will-change-transform",
                                                        isMosaic && i === 0
                                                            ? "col-span-2 aspect-[4/3] lg:col-span-1 lg:row-span-2 lg:aspect-auto"
                                                            : "aspect-square lg:aspect-auto"
                                                    )}
                                                >
                                                    <div className="group h-full w-full overflow-hidden rounded-2xl bg-accent">
                                                        <img
                                                            src={photo.src}
                                                            alt={photo.alt}
                                                            loading={s === 0 ? "eager" : "lazy"}
                                                            decoding="async"
                                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* CONTROLES */}
                    {total > 1 && (
                        <div
                            data-carousel-ui
                            className="mt-5 flex items-center justify-between lg:mt-4 lg:pb-1 relative z-30"
                        >
                            <span className="font-jakarta text-sm tabular-nums tracking-[0.2em] text-foreground">
                                {pad(index + 1)}
                                <span className="text-foreground/40"> / {pad(total)}</span>
                            </span>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => goTo(index - 1)}
                                    disabled={index === 0}
                                    aria-label="Anterior"
                                    className="flex size-10 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-30 cursor-pointer"
                                >
                                    <ChevronLeft className="size-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => goTo(index + 1)}
                                    disabled={index === total - 1}
                                    aria-label="Siguiente"
                                    className="flex size-10 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-30 cursor-pointer"
                                >
                                    <ChevronRight className="size-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}