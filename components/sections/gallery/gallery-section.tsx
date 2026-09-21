"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

import { ZXGalleryItem } from "@/lib/graphql";

gsap.registerPlugin(ScrollTrigger);

interface GallerySectionProps {
    items: ZXGalleryItem[];
    highlight?: string;
    title?: string;
}

export default function GallerySection({
    items,
    highlight,
    title,
}: GallerySectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const galleryWrapRef = useRef<HTMLDivElement>(null);

    // El diseño usa 1 grande + 4 pequeñas
    const visible = items.filter((i) => i.thumbnail || i.fullUrl).slice(0, 5);

    useLayoutEffect(() => {
        if (!sectionRef.current || visible.length === 0) return;

        const mm = gsap.matchMedia();

        // ── DESKTOP: título centrado → sube → entran las imágenes ──
        mm.add("(min-width: 1024px)", () => {
            const els = gsap.utils.toArray<HTMLElement>(
                "[data-gallery-item]",
                sectionRef.current
            );

            gsap.set(galleryWrapRef.current, { height: 0 });
            gsap.set(els, { opacity: 0, x: 200, scale: 0.95 });

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

            // 1. Se abre el espacio y el título sube solo
            tl.to(galleryWrapRef.current, {
                height: "auto",
                duration: 1.5,
                ease: "power2.inOut",
            });

            // 2. Entran las imágenes de derecha a izquierda
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

            // 3. Pausa final antes de soltar el pin
            tl.to({}, { duration: 0.8 });
        });

        // ── MÓVIL: sin pin, cada imagen entra desde la derecha ──
        mm.add("(max-width: 1023px)", () => {
            const els = gsap.utils.toArray<HTMLElement>(
                "[data-gallery-item]",
                sectionRef.current
            );

            els.forEach((el) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, x: 80 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        });

        return () => mm.revert();
    }, [visible.length]);

    if (visible.length === 0) return null;

    return (
        <section
            ref={sectionRef}
            className="relative flex min-h-screen w-full items-center overflow-hidden bg-background"
        >
            <div className="mx-auto w-full max-w-[1500px] px-4 py-12 lg:px-8 lg:py-0">
                {/* ENCABEZADO (los hijos usan motion, GSAP no lo toca) */}
                {(highlight || title) && (
                    <div className="mx-auto max-w-5xl space-y-5 text-center">
                        {highlight && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4 }}
                                className="font-jakarta text-sm font-medium uppercase tracking-[0.2em] text-foreground"
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
                                className="font-jakarta text-4xl font-normal leading-[1.05] tracking-tight text-foreground md:text-6xl"
                            >
                                {title}
                            </motion.h2>
                        )}
                    </div>
                )}

                {/* GALERÍA: en desktop arranca con height 0 y GSAP la abre */}
                <div ref={galleryWrapRef} className="lg:h-0 lg:overflow-hidden">
                    <div className="grid grid-cols-2 gap-3 pt-8 lg:h-[58vh] lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-2 lg:gap-3 lg:pt-0 lg:mt-10">
                        {visible.map((item, i) => (
                            <div
                                key={item.id}
                                data-gallery-item
                                className={
                                    i === 0
                                        ? "col-span-2 aspect-[4/3] will-change-transform lg:col-span-1 lg:row-span-2 lg:aspect-auto"
                                        : "aspect-square will-change-transform lg:aspect-auto"
                                }
                            >
                                <div className="group h-full w-full overflow-hidden rounded-2xl bg-accent">
                                    <img
                                        src={item.fullUrl ?? item.thumbnail}
                                        alt={item.alt ?? item.title ?? ""}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}