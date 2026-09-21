"use client";

import { motion } from "motion/react";
import { Container, Section } from "@/components/craft";
import { Banner } from "../components/banner";
import { ZXProduct } from "@/lib/graphql";
import { Card, Carousel } from "../components/cards-carousel";

interface ProductsSectionProps {
    products?: ZXProduct[];
    title?: string;
    description?: string;
    heroImage?: string;
    heroMobile?: string;
    highlight?: string;
    showBanner?: boolean;
}

export default function ProductsSection({
    products = [],
    title,
    description,
    heroImage,
    heroMobile,
    highlight,
    showBanner,
}: ProductsSectionProps) {
    const cards = products.map((product, index) => (
        <Card
            key={product.id}
            product={product}
            index={index}
        />
    ));
    return (
        <Section className="w-full max-w-screen overflow-hidden">
            <Container className="w-full max-w-screen mx-auto pt-8 lg:pt-14 rounded-3xl overflow-hidden">

                {showBanner && (
                    <Banner
                        image={heroImage}
                        mobile={heroMobile}
                        title={highlight}
                    />
                )}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                >
                    {(title || description || highlight) && (
                        <div className="mx-auto mb-20 max-w-4xl text-center">

                            <div className="space-y-12 md:space-y-20">
                                <div className="space-y-8 md:space-y-12 text-center">

                                    {highlight && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4 }}
                                            className="text-sm font-medium uppercase tracking-widest md:tracking-[0.2em]"
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
                                            className="text-3xl font-normal tracking-tight text-foreground lg:text-6xl"
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
                                            className="text-sm font-medium uppercase"
                                        >
                                            {description}
                                        </motion.div>
                                    )}

                                </div>
                            </div>

                        </div>
                    )}
                </motion.div>

                {products.length > 0 && (
                    <Carousel items={cards} />
                )}
            </Container>
        </Section>
    );
}