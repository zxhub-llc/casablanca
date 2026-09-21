"use client";

import { motion } from "motion/react";

interface CategoryHeaderProps {
    name?: string | null;
    description?: string | null;
}

export function CategoryHeader({ name, description }: CategoryHeaderProps) {
    const lines = description ? description.split("\n").map(line => line.trim()).filter(Boolean) : [];
    const firstLineWithoutDot = lines[0] ? lines[0].replace(/\.$/, "") : "";
    const remainingDescription = lines.slice(1).join("\n\n");

    return (
        <div className="space-y-8 md:space-y-12 text-center">
            {firstLineWithoutDot && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-sm font-medium uppercase tracking-[0.2em] text-foreground"
                >
                    {firstLineWithoutDot}
                </motion.p>
            )}

            {name && (
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="text-4xl font-normal tracking-tight text-foreground lg:text-6xl"
                >
                    {name}
                </motion.h3>
            )}

            {remainingDescription && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-xs font-medium uppercase text-foreground max-w-4xl mx-auto "
                >
                    {remainingDescription}
                </motion.div>
            )}
        </div>
    );
}