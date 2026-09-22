"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "motion/react";

import { ZXFeature } from "@/lib/graphql";
import { Banner } from "../components/banner";
import { Showcase } from "./showcase";
import { cn } from "@/lib/utils";
import { Container, Section } from "@/components/craft";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface FeaturesSectionProps {
    features?: ZXFeature[];
    title?: string;
    description?: string;
    heroImage?: string;
    highlight?: string;
    showBanner?: boolean;
}

export default function FeaturesSection({
    features = [],
    title,
    description,
    heroImage,
    highlight,
    showBanner,
}: FeaturesSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const isVisible = useInView(sectionRef, { once: true, margin: "-100px" });

    // titleKey="title" | descriptionKey="desc" | iconKey="image"
    const content = useMemo(
        () =>
            features.map((f) => ({
                title: f.title,
                description: f.desc,
                image: f.image,
            })),
        [features]
    );

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const isMobile = window.innerWidth <= 1024;

            gsap.set(contentRef.current, {
                opacity: 0,
                scale: 1.08,
                y: 60,
                filter: "blur(10px)",
            });

            gsap.to(contentRef.current, {
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            if (descriptionRef.current) {
                ScrollTrigger.create({
                    trigger: isMobile ? sectionRef.current : descriptionRef.current,
                    start: isMobile ? "top 8%" : "top 12%",
                    end: () => `+=${window.innerHeight}`,
                    pin: sectionRef.current,
                    pinSpacing: true,
                    anticipatePin: 1,
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <Section
            className={cn(
                "w-full max-w-screen overflow-hidden px-4 sm:px-4 md:px-4 lg:px-8",
                showBanner ? "bg-background" : "bg-brand-background"
            )}
        >
            <Container className="w-full max-w-screen mx-auto pt-8 lg:pt-14 px-4 sm:px-4 md:px-4 lg:px-8 rounded-3xl overflow-hidden">
                {showBanner && <Banner image={heroImage} title={highlight} />}

                <div ref={sectionRef}>
                    <div ref={contentRef}>
                        {(title || description || highlight) && (
                            <div className="mx-auto mb-8 max-w-8xl text-center">
                                <div className="space-y-12 md:space-y-20">
                                    <div className="space-y-8 md:space-y-12 text-center">
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
                                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                                transition={{ delay: 0.1, duration: 0.5 }}
                                                className="text-2xl font-normal tracking-tight text-foreground lg:text-6xl font-jakarta"
                                            >
                                                {title}
                                            </motion.h3>
                                        )}

                                        {description && (
                                            <motion.div
                                                ref={descriptionRef}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                                transition={{ delay: 0.2, duration: 0.5 }}
                                                className="text-xs font-medium uppercase font-jakarta max-w-5xl mx-auto text-center"
                                            >
                                                {description}
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <Showcase content={content} />
                    </div>
                </div>
            </Container>
        </Section>
    );
}