"use client"

import { motion } from "motion/react";
import { ContactForm } from "./contact-form";
import { ContactLinksSection } from "./contact-links-section";
import { HugeiconsIcon } from "@hugeicons/react";
import { Facebook02Icon, InstagramIcon, Linkedin01Icon, NewTwitterIcon, ThreadsIcon, TiktokIcon, WhatsappBusinessIcon, YoutubeIcon } from "@hugeicons/core-free-icons";
import { ZXContactForm, ZXSocial } from "@/lib/graphql";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ContactWithoutBannerProps {
    contact?: ZXContactForm | null;
    title?: string;
    highlight?: string;
    description?: string;
    social?: ZXSocial | null;
    email?: string;
    phone?: string;
    address?: string;
    buttonText?: string;
    buttonUrl?: string;
    secondaryButtonText?: string;
    secondaryButtonUrl?: string;
}

export default function ContactWithoutBanner({
    contact,
    title,
    highlight,
    description,
    social,
    email,
    phone,
    address,
    buttonText,
    buttonUrl,
    secondaryButtonText,
    secondaryButtonUrl,
}: ContactWithoutBannerProps) {
    const cleanPhone = social?.whatsapp ? social.whatsapp.replace(/[^0-9]/g, "") : "";
    const splitTitleBalanced = (text: string) => {
        const words = text
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        if (words.length <= 2) {
            return [text, ""];
        }

        const breakIndex = Math.floor(words.length / 2);

        return [
            words.slice(0, breakIndex).join(" "),
            words.slice(breakIndex).join(" "),
        ];
    };

    const [firstLine, secondLine] = title
        ? splitTitleBalanced(title)
        : ["", ""];

    return (
        <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-12 h-full min-h-screen items-start">
            <div className="flex flex-col justify-center items-center md:items-start gap-4 w-full max-w-5xl px-2 py-2 md:py-24">
                {highlight && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex w-fit items-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md px-4 py-2">
                        <span
                            className="text-xs font-medium uppercase text-white/80">
                            {highlight}
                        </span>
                    </motion.div>
                )}

                {title && (
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.1,
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="text-white text-2xl font-semibold md:font-medium md:text-7xl font-jakarta"
                    >
                        <>
                            <div className="hidden md:block">
                                <span className="block">{firstLine}</span>

                                {secondLine && (
                                    <span className="block">
                                        {secondLine}
                                    </span>
                                )}
                            </div>
                            <span className="block md:hidden text-center">{title}</span>
                        </>
                    </motion.h1>
                )}

                {description && (
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.2,
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="w-full max-w-4xl px-2 py-2">
                        <p className="text-sm md:text-lg leading-relaxed text-white text-center sm:text-start">
                            {description}
                        </p>
                    </motion.div>
                )}
                {(buttonText || secondaryButtonText) && (
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-4xl pt-2">
                        {buttonText && buttonUrl && (
                            <Button
                                asChild
                                className="rounded-full w-full md:w-auto h-12 px-4 bg-white text-foreground hover:bg-white hover:text-foreground relative group"
                            >
                                <Link href={buttonUrl}>
                                    <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                                        {buttonText}
                                    </span>
                                </Link>
                            </Button>
                        )}
                        {secondaryButtonText && secondaryButtonUrl && (
                            <Button
                                asChild
                                className="rounded-full w-full md:w-auto h-12 px-4 hover:bg-primary hover:text-primary-foreground group"
                            >
                                <Link href={secondaryButtonUrl}>
                                    <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                                        {secondaryButtonText}
                                    </span>
                                </Link>
                            </Button>

                        )}
                    </div>
                )}

                <div className="flex flex-wrap items-center sm:items-start gap-4 text-sm text-white flex-col w-full max-w-4xl">
                    {(email || phone || address) && (
                        <ContactLinksSection
                            email={email}
                            phone={phone}
                            address={address}
                        />
                    )}
                    {social && (
                        <div className="flex flex-wrap items-center gap-2">
                            {social.whatsapp && (
                                <a
                                    href={`https://wa.me/${cleanPhone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md transition-all duration-300 hover:bg-black/20 hover:text-white hover:-translate-y-1">
                                    <HugeiconsIcon icon={WhatsappBusinessIcon} />
                                </a>
                            )}

                            {social.facebook && (
                                <a
                                    href={social.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md transition-all duration-300 hover:bg-black/20 hover:text-white hover:-translate-y-1">
                                    <HugeiconsIcon icon={Facebook02Icon} />
                                </a>
                            )}

                            {social.instagram && (
                                <a
                                    href={social.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md transition-all duration-300 hover:bg-black/20 hover:text-white hover:-translate-y-1">
                                    <HugeiconsIcon icon={InstagramIcon} />
                                </a>
                            )}

                            {social.linkedin && (
                                <a
                                    href={social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md transition-all duration-300 hover:bg-black/20 hover:text-white hover:-translate-y-1">
                                    <HugeiconsIcon icon={Linkedin01Icon} />
                                </a>
                            )}

                            {social.twitter && (
                                <a
                                    href={social.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md transition-all duration-300 hover:bg-black/20 hover:text-white hover:-translate-y-1">
                                    <HugeiconsIcon icon={NewTwitterIcon} />
                                </a>
                            )}

                            {social.youtube && (
                                <a
                                    href={social.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md transition-all duration-300 hover:bg-black/20 hover:text-white hover:-translate-y-1">
                                    <HugeiconsIcon icon={YoutubeIcon} />
                                </a>
                            )}

                            {social.tiktok && (
                                <a
                                    href={social.tiktok}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md transition-all duration-300 hover:bg-black/20 hover:text-white hover:-translate-y-1">
                                    <HugeiconsIcon icon={TiktokIcon} />
                                </a>
                            )}

                            {social.threads && (
                                <a
                                    href={social.threads}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md transition-all duration-300 hover:bg-black/20 hover:text-white hover:-translate-y-1">
                                    <HugeiconsIcon icon={ThreadsIcon} />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full lg:w-1/3 lg:flex lg:items-start lg:self-stretch mt-2 md:mt-20 mb-12 md:mb-0 sm:py-0">
                <div className="relative shadow-input w-full rounded-2xl bg-white/10 backdrop-blur-2xl p-4 md:p-8 items-center">
                    <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    "linear-gradient(to right, rgba(120,120,120,.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,120,120,.15) 1px, transparent 1px)",
                                backgroundSize: "24px 24px",
                            }}
                        />
                    </div>

                    <div className="relative z-10">
                        <ContactForm form={contact} />
                    </div>
                </div>
            </div>
        </div>
    );
}