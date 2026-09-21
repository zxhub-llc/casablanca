"use client";

import React from "react";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronRight } from "@hugeicons/core-free-icons";

interface ContactItemProps {
    href?: string;
    icon: any;
    label: string;
    value: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function ContactItem({
    href,
    icon,
    label,
    value,
    onClick,
}: ContactItemProps) {

    const normalizeAddress = (text: string): string => {
        return text
            .split(" ")
            .map((word) => {
                const clean = word.replace(/[.,]/g, "");

                // números
                if (/^\d+$/.test(clean)) {
                    return word;
                }

                // abreviaciones cortas
                if (clean.length <= 2) {
                    return word.toUpperCase();
                }

                // palabras normales
                return (
                    clean.charAt(0).toUpperCase() +
                    clean.slice(1).toLowerCase()
                ).replace(clean, (match) => match);
            })
            .join(" ");
    }
    return (
        <motion.a
            href={href}
            onClick={onClick}
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="group w-full relative flex items-center gap-5 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xs px-4 py-3 transition-all duration-500 hover:bg-black/20 hover:border-white/20">
            {/* Icon */}
            <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#dad9d7] transition-all duration-500 group-hover:border-white/20">
                <HugeiconsIcon
                    icon={icon}
                    className="h-5 w-5 text-[#312807]/80"
                />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium capitalize text-white">
                    {label}
                </p>

                <p className="text-md font-normal tracking-tight text-white wrap-break-word">
                    {normalizeAddress(value)}
                </p>
            </div>

            {/* Chevron */}
            <div
                className="
                    opacity-0
                    translate-x-2
                    transition-all
                    duration-300
                    group-hover:opacity-100
                    group-hover:translate-x-0
                "
            >
                <HugeiconsIcon icon={ChevronRight} className="h-5 w-5 text-white" />
            </div>
        </motion.a>
    );
}