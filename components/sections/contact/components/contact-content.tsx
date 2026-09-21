"use client"

import { motion } from "motion/react";
import { ContactForm } from "./contact-form";
import { ContactLinks } from "./contact-links";
import { HugeiconsIcon } from "@hugeicons/react";
import { Facebook02Icon, InstagramIcon, Linkedin01Icon, NewTwitterIcon, ThreadsIcon, TiktokIcon, WhatsappBusinessIcon, YoutubeIcon } from "@hugeicons/core-free-icons";
import { ZXContactForm, ZXSocial } from "@/lib/graphql";

interface ContactContentProps {
    contact?: ZXContactForm | null;
    social?: ZXSocial | null;
    title?: string;
    description?: string;
    highlight?: string;
    email?: string;
    phone?: string;
    address?: string;
    map?: string;
}

export default function ContactContent({
    contact,
    social,
    title,
    description,
    highlight,
    email,
    phone,
    address,
    map,
}: ContactContentProps) {
    const cleanPhone = social?.whatsapp ? social.whatsapp.replace(/[^0-9]/g, "") : "";

    return (
        <div className="flex flex-col gap-12 h-full min-h-screen w-full mt-12 pb-12">
            <div className="space-y-12 text-center">
                {highlight && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="text-sm font-medium uppercase text-foreground tracking-[0.2em]"
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
                        className="text-4xl font-normal tracking-tight text-foreground lg:text-6xl"
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
                        className="text-sm font-medium uppercase text-foreground"
                    >
                        {description}
                    </motion.div>
                )}
            </div>
            <div className="w-full mx-auto flex flex-col-reverse md:grid gap-6 lg:gap18 md:grid-cols-12 items-center justify-center">
                {/* LEFT */}
                <div className=" relative flex flex-col overflow-hidden md:col-span-6 lg:col-span-8">
                    {map && (
                        <div className="w-full overflow-hidden rounded-2xl">
                            <div
                                className="w-full [&>iframe]:h-[450px] dm:[&>iframe]:h-[520px] [&>iframe]:w-full"
                                dangerouslySetInnerHTML={{ __html: map }}
                            />
                        </div>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2 justify-center  md:justify-between">
                        {social && (
                            <div className="mt-2 md:mt-0 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                {social.whatsapp && (
                                    <a
                                        href={`https://wa.me/${cleanPhone}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-foreground transition-colors text-sm"
                                    >
                                        <HugeiconsIcon icon={WhatsappBusinessIcon} />
                                    </a>
                                )}

                                {social.facebook && (
                                    <a
                                        href={social.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-foreground transition-colors text-sm"
                                    >
                                        <HugeiconsIcon icon={Facebook02Icon} />
                                    </a>
                                )}

                                {social.instagram && (
                                    <a
                                        href={social.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-foreground transition-colors text-sm"
                                    >
                                        <HugeiconsIcon icon={InstagramIcon} />
                                    </a>
                                )}

                                {social.linkedin && (
                                    <a
                                        href={social.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-foreground transition-colors text-sm"
                                    >
                                        <HugeiconsIcon icon={Linkedin01Icon} />
                                    </a>
                                )}

                                {social.twitter && (
                                    <a
                                        href={social.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-foreground transition-colors text-sm"
                                    >
                                        <HugeiconsIcon icon={NewTwitterIcon} />
                                    </a>
                                )}

                                {social.youtube && (
                                    <a
                                        href={social.youtube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-foreground transition-colors text-sm"
                                    >
                                        <HugeiconsIcon icon={YoutubeIcon} />
                                    </a>
                                )}

                                {social.tiktok && (
                                    <a
                                        href={social.tiktok}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-foreground transition-colors text-sm"
                                    >
                                        <HugeiconsIcon icon={TiktokIcon} />
                                    </a>
                                )}

                                {social.threads && (
                                    <a
                                        href={social.threads}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-foreground transition-colors text-sm"
                                    >
                                        <HugeiconsIcon icon={ThreadsIcon} />
                                    </a>
                                )}
                            </div>
                        )}

                        {(email || phone || address) && (
                            <ContactLinks
                                email={email}
                                phone={phone}
                                address={address}
                            />
                        )}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="relative shadow-input mx-auto w-full rounded-2xl bg-white dark:bg-[#1d1d1f] border border-[#dad9d7]/40 p-8 md:col-span-6 lg:col-span-4">
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