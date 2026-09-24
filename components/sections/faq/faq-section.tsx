"use client";

import { useState } from "react";
import Image from "next/image";
import { Container, Section } from "@/components/craft";
import { ZXFaq } from "@/lib/graphql";
import { cn } from "@/lib/utils";
import { Banner } from "../components/banner";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

interface FaqSectionProps {
    id: string;
    faqs: ZXFaq[];
    title?: string;
    description?: string;
    heroImage?: string;
    heroMobile?: string;
    highlight?: string;
    showBanner?: boolean;
}

export default function FaqSection({
    id,
    faqs,
    title,
    description,
    heroImage,
    heroMobile,
    highlight,
    showBanner,
}: FaqSectionProps) {
    const faq = faqs?.[0];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const [openKey, setOpenKey] = useState<string | null>("0-0");

    if (!faqs || faqs.length === 0) {
        return null;
    }

    return (
        <>
            {showBanner ? (
                <>
                    <Banner
                        image={heroImage}
                        mobile={heroMobile}
                        title={highlight}
                    />
                    <Section className="w-full max-w-screen overflow-hidden px-4 sm:px-4 md:px-4 lg:px-8 bg-background">
                        <Container className="w-full max-w-screen mx-auto pt-8 lg:pt-14 px-4 sm:px-4 md:px-4 lg:px-8 rounded-3xl overflow-hidden">

                            {/* Encabezado General de la Sección */}
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
                                                        className="text-sm font-medium uppercase tracking-[0.2em]"
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

                            {/* Mapeo de cada bloque/categoría de FAQ */}
                            <div className="space-y-24">
                                {faqs.map((faq, faqIndex) => (
                                    <div key={faq.id || faqIndex} className="space-y-8">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.3 }}
                                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], }}
                                        >
                                            <h2 className="text-4xl font-medium tracking-tight lg:text-5xl">
                                                {faq.title}
                                            </h2>
                                        </motion.div>

                                        <div className="mx-auto grid max-w-screen gap-12 lg:grid-cols-2 lg:gap-20 items-start">
                                            {/* IMAGEN DE LA CATEGORÍA */}
                                            {faq.image && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                                    viewport={{ once: true, amount: 0.2 }}
                                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                                    className="relative hidden h-130 overflow-hidden rounded-3xl md:block lg:sticky lg:top-8"
                                                >
                                                    <Image
                                                        src={faq.image}
                                                        alt={faq.title}
                                                        width={800}
                                                        height={900}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </motion.div>
                                            )}

                                            {/* LISTADO DE PREGUNTAS (ACORDEÓN) */}
                                            <motion.div
                                                className="flex flex-col"
                                                initial={{ opacity: 0, x: 30 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, amount: 0.2 }}
                                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], }}
                                            >
                                                <div className="divide-y divide-border">
                                                    {faq.items?.map((item, itemIndex) => {
                                                        const currentKey = `${faqIndex}-${itemIndex}`;
                                                        const isOpen = openKey === currentKey;

                                                        return (
                                                            <motion.div
                                                                key={item.id || itemIndex}
                                                                initial={{ opacity: 0, y: 20 }}
                                                                whileInView={{ opacity: 1, y: 0 }}
                                                                viewport={{ once: true }}
                                                                transition={{ duration: 0.45, delay: itemIndex * 0.08 }}
                                                                className="py-4"
                                                            >
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setOpenKey(isOpen ? null : currentKey)}
                                                                    className="flex w-full items-center justify-between gap-6 text-left"
                                                                >
                                                                    <h3 className="text-sm md:text-lg font-medium text-foreground">
                                                                        {item.question}
                                                                    </h3>
                                                                    <HugeiconsIcon
                                                                        icon={ArrowDown01Icon}
                                                                        className={cn(
                                                                            "h-5 w-5 shrink-0 transition-transform duration-300",
                                                                            isOpen && "rotate-180"
                                                                        )}
                                                                    />
                                                                </button>

                                                                <div
                                                                    className={cn(
                                                                        "grid transition-all duration-300",
                                                                        isOpen ? "grid-rows-[1fr] pt-4" : "grid-rows-[0fr]"
                                                                    )}
                                                                >
                                                                    <AnimatePresence initial={false}>
                                                                        {isOpen && (
                                                                            <motion.div
                                                                                initial={{ height: 0, opacity: 0 }}
                                                                                animate={{ height: "auto", opacity: 1 }}
                                                                                exit={{ height: 0, opacity: 0 }}
                                                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                                                className="overflow-hidden"
                                                                            >
                                                                                <div
                                                                                    className="prose prose-sm pt-4 max-w-none text-muted-foreground"
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: item.answer,
                                                                                    }}
                                                                                />
                                                                            </motion.div>
                                                                        )}
                                                                    </AnimatePresence>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Container>
                    </Section>
                </>
            ) : (
                <Section
                    className="w-full max-w-screen overflow-hidden px-4 sm:px-4 md:px-4 lg:px-8">
                    <Container className=" w-full max-w-screen mx-auto pt-8 lg:pt-14 px-4 sm:px-4 md:px-4 lg:px-8 rounded-3xl overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6 }}>
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
                                                    className="text-sm font-medium uppercase tracking-[0.2em]"
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

                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], }}
                        >
                            <h2 className="text-4xl font-medium tracking-tight lg:text-5xl">
                                {faq.title}
                            </h2>
                        </motion.div>
                        <div className="mx-auto grid max-w-screen gap-12 lg:grid-cols-2 lg:gap-20 items-center">

                            {/* IMAGE */}

                            {faq.image && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 40, }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0, }}
                                    viewport={{ once: true, amount: 0.2, }}
                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], }}
                                    className="relative hidden h-130 overflow-hidden rounded-3xl md:block"
                                >
                                    <Image
                                        src={faq.image}
                                        alt={faq.title}
                                        width={800}
                                        height={900}
                                        className="h-full w-full object-cover"
                                    />
                                </motion.div>
                            )}

                            {/* FAQS */}

                            <motion.div
                                className="flex flex-col"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], }}
                            >

                                <div className="divide-y divide-border">

                                    {faq.items.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20, }}
                                            whileInView={{ opacity: 1, y: 0, }}
                                            viewport={{ once: true, }}
                                            transition={{ duration: 0.45, delay: index * 0.08, }}
                                            className="py-4"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                                className="flex w-full items-center justify-between gap-6 text-left"
                                            >
                                                <h3 className="text-sm md:text-lg font-medium text-foreground">
                                                    {item.question}
                                                </h3>
                                                <HugeiconsIcon icon={ArrowDown01Icon} className={cn(
                                                    "h-5 w-5 shrink-0 transition-transform duration-300",
                                                    openIndex === index &&
                                                    "rotate-180"
                                                )} />
                                            </button>

                                            <div
                                                className={cn(
                                                    "grid transition-all duration-300",
                                                    openIndex === index ? "grid-rows-[1fr] pt-4" : "grid-rows-[0fr]"
                                                )}
                                            >
                                                <AnimatePresence initial={false}>
                                                    {openIndex === index && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0, }}
                                                            animate={{ height: "auto", opacity: 1, }}
                                                            exit={{ height: 0, opacity: 0, }}
                                                            transition={{ duration: 0.3, ease: "easeInOut", }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div
                                                                className="prose prose-sm pt-4 max-w-none text-muted-foreground"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: item.answer,
                                                                }}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    ))}

                                </div>
                            </motion.div>
                        </div>
                    </Container>
                </Section >
            )
            }
        </>
    );
}