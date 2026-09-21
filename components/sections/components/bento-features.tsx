"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface BentoFeaturesProps<T> {
    items: T[];
    className?: string;
    itemClassName?: string;
    titleKey?: keyof T;
    descriptionKey?: keyof T;
    iconKey?: keyof T;
}

function chunkItems<T>(items: T[]) {
    const groups: T[][] = [];

    let index = 0;

    while (index < items.length) {
        const remaining = items.length - index;

        if (remaining > 6) {
            groups.push(items.slice(index, index + 6));
            index += 6;
        } else {
            groups.push(items.slice(index));
            break;
        }
    }

    return groups;
}

function getLayout(total: number, index: number) {
    const layouts: Record<number, string[]> = {
        1: [
            "md:col-span-6",
        ],

        2: [
            "md:col-span-3",
            "md:col-span-3",
        ],

        3: [
            "md:col-span-2",
            "md:col-span-2",
            "md:col-span-2",
        ],

        4: [
            "md:col-span-4 md:row-span-1",
            "md:col-span-2 md:row-span-1",
            "md:col-span-2 md:row-span-1",
            "md:col-span-4 md:row-span-1",
        ],

        5: [
            "md:col-span-2 md:row-span-1",
            "md:col-span-2 md:row-span-1",
            "md:col-span-2 md:row-span-1",
            "md:col-span-3",
            "md:col-span-3",
        ],

        6: [
            "md:col-span-2 md:row-span-1",
            "md:col-span-2 md:row-span-1",
            "md:col-span-2 md:row-span-1",
            "md:col-span-2 md:row-span-1",
            "md:col-span-2 md:row-span-1",
            "md:col-span-2 md:row-span-1",
        ],
    };

    return layouts[total]?.[index] ?? "";
}

function BentoGroup<T>({
    items,
    titleKey,
    descriptionKey,
    iconKey,
    itemClassName,
}: {
    items: T[];
    itemClassName?: string;
    titleKey?: keyof T;
    descriptionKey?: keyof T;
    iconKey?: keyof T;
}) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 gap-6 md:grid-cols-6",
                items.length >= 4 && "md:auto-rows-[18rem]"
            )}
        >
            {items.map((item, index) => {
                const titleValue = titleKey
                    ? item[titleKey]
                    : null;

                const descriptionValue = descriptionKey
                    ? item[descriptionKey]
                    : null;

                const iconValue = iconKey
                    ? item[iconKey]
                    : null;

                const title =
                    typeof titleValue === "string"
                        ? titleValue
                        : "";

                const description =
                    typeof descriptionValue === "string"
                        ? descriptionValue
                        : "";

                const icon =
                    typeof iconValue === "string"
                        ? iconValue
                        : "";

                return (
                    <motion.div
                        key={`${title}-${index}`}
                        initial={{
                            opacity: 0,
                            y: 20,
                            scale: 0.96,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        viewport={{
                            once: true,
                            amount: 0.15,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        whileHover={{
                            y: -6,
                            scale: 1.015,
                            transition: {
                                duration: 0.2,
                            },
                        }}
                        className={cn(
                            "group rounded-3xl p-8",
                            itemClassName,
                            getLayout(items.length, index)
                        )}
                    >
                        <div className="space-y-6">
                            {icon && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 10,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.1 + 0.15,
                                    }}
                                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-foreground"
                                >
                                    <img
                                        src={icon}
                                        alt={title}
                                        className="h-10 w-10 object-contain invert"
                                    />
                                </motion.div>
                            )}

                            <div className="space-y-3">
                                {title && (
                                    <motion.h3
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            delay: index * 0.1 + 0.25,
                                        }}
                                        className="text-xl font-semibold text-foreground"
                                    >
                                        {title}
                                    </motion.h3>
                                )}

                                {description && (
                                    <motion.p
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            delay: index * 0.1 + 0.35,
                                        }}
                                        className="leading-7 text-foreground/70 text-justify"
                                    >
                                        {description}
                                    </motion.p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}

export function BentoFeatures<T>({
    items,
    className,
    itemClassName,
    titleKey,
    descriptionKey,
    iconKey,
}: BentoFeaturesProps<T>) {
    const groups = chunkItems(items);

    return (
        <div className={cn("space-y-6", className)}>
            {groups.map((group, index) => (
                <BentoGroup
                    key={index}
                    items={group}
                    itemClassName={itemClassName}
                    titleKey={titleKey}
                    descriptionKey={descriptionKey}
                    iconKey={iconKey}
                />
            ))}
        </div>
    );
}