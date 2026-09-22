"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

import { ZXAboutBlock } from "@/lib/graphql";
import { cn } from "@/lib/utils";
import { Container, Section } from "@/components/craft";
import { BentoFeatures } from "../components/bento-features";
import { Banner } from "../components/banner";
import { AboutCTA } from "../components/about-cta";
import { PalmShadowOverlay } from "@/components/palm-shadow-overlay";

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
    abouts?: ZXAboutBlock[];
    highlight?: string;
    heroImage?: string;
    heroMobile?: string;
    showBanner?: boolean;
}

export default function AboutSection({
    abouts = [],
    heroImage,
    heroMobile,
    showBanner,
}: AboutSectionProps) {
    const about = abouts?.[0];
    if (!about) return null;

    const features = about.features ?? [];
    const hasVideo = !!about.videoUrl;

    return (
        <>
            {showBanner && (
                <Banner image={heroImage} mobile={heroMobile} title={about.title} />
            )}

            {hasVideo ? (
                <>
                    <PinnedVideoAbout about={about} />
                    {features.length > 0 && (
                        <Section className="w-full max-w-screen overflow-hidden px-4 lg:px-8 bg-background">
                            <Container className="w-full max-w-screen mx-auto py-8 lg:py-14 px-4 lg:px-8">
                                <BentoFeatures
                                    items={features}
                                    titleKey="title"
                                    descriptionKey="description"
                                    iconKey="icon"
                                    itemClassName="border-2 border-border/70 bg-background"
                                />
                            </Container>
                        </Section>
                    )}
                </>
            ) : (
                <StaticAbout about={about} />
            )}
        </>
    );
}

/* ─────────────────────────────────────────────
   VERSIÓN CON VIDEO
───────────────────────────────────────────── */
function PinnedVideoAbout({ about }: { about: ZXAboutBlock }) {
    const sectionRef = useRef<HTMLElement>(null);
    const mainContentRef = useRef<HTMLDivElement>(null);
    const headingRevealRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [showControls, setShowControls] = useState(true);

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        if (isPlaying) {
            controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2500);
        }
    };

    useEffect(() => {
        if (!isPlaying) {
            setShowControls(true);
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        } else {
            handleMouseMove();
        }
        return () => {
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        };
    }, [isPlaying]);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        videoRef.current?.pause();
        if (videoRef.current) videoRef.current.currentTime = 0;
        setIsPlaying(false);

        const ctx = gsap.context(() => {
            const isDesktop = window.innerWidth >= 1024;

            gsap.set(ctaRef.current, { opacity: 0 });
            gsap.set(videoContainerRef.current, { height: 0, overflow: "hidden" });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${window.innerHeight * 2}`,
                    scrub: true,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onLeave: () => {
                        videoRef.current?.pause();
                        setIsPlaying(false);
                    },
                    onLeaveBack: () => {
                        videoRef.current?.pause();
                        setIsPlaying(false);
                    }
                },
            });

            // 1. El encabezado se va
            if (isDesktop) {
                tl.to(headingRevealRef.current, {
                    y: -60,
                    opacity: 0,
                    height: 0,
                    marginBottom: 0,
                    duration: 1.5,
                    ease: "power2.inOut",
                });
            }

            // 2. El video se abre (height 0 → auto)
            tl.to(
                videoContainerRef.current,
                {
                    height: "auto",
                    duration: 1.5,
                    ease: "power2.inOut",
                    onReverseComplete: () => {
                        videoRef.current?.pause();
                        setIsPlaying(false);
                    },
                },
                isDesktop ? "-=1.2" : ">+=0.2"
            );

            // 3. Aparece el CTA
            tl.to(ctaRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2");

            // 4. Pausa final antes de soltar el pin
            tl.to({}, { duration: 1.5 });
        }, sectionRef);

        return () => {
            ctx.revert();
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
            setIsPlaying(false);
            if (videoContainerRef.current) {
                videoContainerRef.current.style.height = "0px";
                videoContainerRef.current.style.overflow = "hidden";
            }
        };
    }, [about.title, about.videoUrl]);

    const togglePlay = () => {
        const v = videoRef.current;
        if (!v) return;
        if (isPlaying) v.pause();
        else v.play().catch(() => { });
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-secondary"
        >
            <div className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-brand-background to-transparent" />
            <PalmShadowOverlay />
            <div
                ref={mainContentRef}
                className="relative z-30 flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-10"
            >
                <div
                    ref={headingRevealRef}
                    className="flex flex-col w-full max-w-8xl items-center text-center"
                >
                    {about.highlight && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="mb-4 text-sm font-medium uppercase tracking-[0.2em] font-jakarta"
                        >
                            {about.highlight}
                        </motion.p>
                    )}

                    {about.title && (
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="mt-2 text-5xl font-normal leading-[0.95] tracking-tighter text-foreground md:text-7xl font-jakarta"
                        >
                            {about.title}
                        </motion.h2>
                    )}

                    {about.subtitle && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mt-6 text-sm font-medium uppercase font-jakarta"
                        >
                            {about.subtitle}
                        </motion.div>
                    )}

                    {about.content && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="prose prose-lg dark:prose-invert mt-6 max-w-4xl text-md md:text-lg leading-tight tracking-tight text-foreground font-jakarta"
                            dangerouslySetInnerHTML={{ __html: about.content }}
                        />
                    )}
                </div>

                {/* VIDEO */}
                <div
                    ref={videoContainerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => isPlaying && setShowControls(false)}
                    className="group relative mt-6 w-full overflow-hidden rounded-lg shadow-2xl md:aspect-[1920/1080] md:w-[90%]"
                >
                    <video
                        ref={videoRef}
                        src={about.videoUrl}
                        loop
                        muted={isMuted}
                        playsInline
                        preload="auto"
                        className="w-full object-contain"
                    />

                    {/* Play / Pause */}
                    <div
                        className={cn(
                            "pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-500",
                            showControls || !isPlaying ? "opacity-100" : "opacity-0"
                        )}
                    >
                        <button
                            onClick={togglePlay}
                            className="pointer-events-auto flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                        >
                            {isPlaying ? (
                                <svg width="24" height="24" viewBox="0 0 14 14" fill="currentColor">
                                    <rect x="2" y="1" width="4" height="12" rx="1" />
                                    <rect x="8" y="1" width="4" height="12" rx="1" />
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 14 14" fill="currentColor">
                                    <path d="M3 1.5l9 5.5-9 5.5V1.5z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mute */}
                    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                        <button
                            onClick={toggleMute}
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                        >
                            {isMuted ? <VolumeX /> : <Volume2 />}
                        </button>
                    </div>
                </div>

                {/* CTA debajo del video */}
                <div ref={ctaRef} className="flex w-full flex-col items-center pointer-events-auto">
                    {about.ctaText && about.ctaUrl && (
                        <AboutCTA text={about.ctaText} url={about.ctaUrl} />
                    )}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   VERSIÓN SIN VIDEO
───────────────────────────────────────────── */
function StaticAbout({ about }: { about: ZXAboutBlock }) {
    const features = about.features ?? [];

    return (
        <Section className="w-full max-w-screen overflow-hidden bg-background px-4 lg:px-8">
            <Container className="mx-auto w-full max-w-screen overflow-hidden rounded-3xl px-4 pt-8 lg:px-8 lg:pt-14">
                <div className="flex flex-col items-center space-y-20">
                    {/* HEADER */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className={cn(
                            "grid gap-10 lg:items-center",
                            about.image
                                ? "lg:grid-cols-2"
                                : "mx-auto w-full grid-cols-1 text-center md:max-w-4xl"
                        )}
                    >
                        {/* CONTENT */}
                        <div className="space-y-12 md:space-y-20">
                            <div className="space-y-8 text-center md:space-y-12">
                                {about.highlight && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4 }}
                                        className="text-sm font-medium uppercase tracking-[0.2em]"
                                    >
                                        {about.highlight}
                                    </motion.p>
                                )}

                                {about.title && (
                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1, duration: 0.5 }}
                                        className="text-4xl font-normal tracking-tight text-foreground lg:text-6xl"
                                    >
                                        {about.title}
                                    </motion.h3>
                                )}

                                {about.subtitle && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                        className="text-sm font-medium uppercase"
                                    >
                                        {about.subtitle}
                                    </motion.div>
                                )}
                            </div>

                            {about.content && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="prose prose-lg dark:prose-invert max-w-none text-base leading-relaxed tracking-tight text-foreground"
                                    dangerouslySetInnerHTML={{ __html: about.content }}
                                />
                            )}
                        </div>

                        {/* IMAGE */}
                        {about.image && (
                            <motion.div
                                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.7 }}
                                className="overflow-hidden rounded-3xl"
                            >
                                <Image
                                    src={about.image}
                                    alt={about.title ?? "About"}
                                    width={1200}
                                    height={800}
                                    className="h-full w-full object-cover"
                                />
                            </motion.div>
                        )}
                    </motion.div>

                    {/* FEATURES */}
                    <BentoFeatures
                        items={features}
                        titleKey="title"
                        descriptionKey="description"
                        iconKey="icon"
                        itemClassName="border-2 border-border/70 bg-background"
                    />

                    {about.ctaText && about.ctaUrl && (
                        <AboutCTA text={about.ctaText} url={about.ctaUrl} />
                    )}
                </div>
            </Container>
        </Section>
    );
}