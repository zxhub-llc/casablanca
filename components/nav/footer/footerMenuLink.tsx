"use client";

import Link from "next/link";
import { ZXMenuItem } from "@/lib/graphql";
import { cn } from "@/lib/utils";

interface FooterMenuLinkProps {
    item: ZXMenuItem;
}

export function FooterMenuLink({ item }: FooterMenuLinkProps) {
    const hasChildren = !!item.children?.length;

    const isPlaceholder = !item.anchorTarget && (item.url === "#" || item.url === "/#" || !item.url);

    return (
        <div className="flex flex-col gap-2">
            {/* CHILD */}
            {isPlaceholder ? (
                <div
                    className={cn(
                        "text-[15px] leading-relaxed",
                        "text-neutral-700 dark:text-white"
                    )}
                >
                    {item.title}
                </div>
            ) : (
                <Link
                    href={item.url}
                    className={cn(
                        "text-[15px] leading-relaxed",
                        "text-neutral-800 dark:text-white transition-colors font-light"
                    )}
                >
                    {item.title}
                </Link>
            )}

            {/* SUBCHILDREN */}
            {hasChildren && (
                <div
                    className="
                        flex
                        flex-col
                        gap-2
                        pl-4
                        border-l
                        border-neutral-200
                    "
                >
                    {item.children!.map((sub) => (
                        <Link
                            key={sub.id}
                            href={sub.url}
                            className="
                                text-sm
                                text-neutral-500 dark:text-white
                                transition-colors
                            "
                        >
                            {sub.title}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}