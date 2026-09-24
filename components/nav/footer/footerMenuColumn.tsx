"use client";

import Link from "next/link";
import { ZXMenuItem } from "@/lib/graphql";
import { cn } from "@/lib/utils";
import { FooterMenuLink } from "./footerMenuLink";
import { AnchorAwareLink } from "../anchor-aware-link";

interface FooterMenuColumnProps {
    item: ZXMenuItem;
}

export function FooterMenuColumn({ item }: FooterMenuColumnProps) {
    const hasChildren = !!item.children?.length;

    const isPlaceholder = !item.anchorTarget && (item.url === "#" || item.url === "/#" || !item.url);

    return (
        <div className="flex flex-col gap-6">
            {/* COLUMN TITLE */}
            {isPlaceholder ? (
                <div
                    className={cn(
                        "text-sm font-semibold uppercase tracking-wide text-nowrap text-center md:text-start",
                        "text-foreground"
                    )}
                >
                    {item.title}
                </div>
            ) : (
                <AnchorAwareLink
                    href={item.url}
                    anchorTarget={item.anchorTarget}
                    className={cn(
                        "text-sm font-semibold uppercase tracking-wide text-nowrap text-center md:text-start",
                        "text-foreground transition-colors hover:text-primary"
                    )}
                >
                    {item.title}
                </AnchorAwareLink>
            )}

            {/* CHILDREN */}
            {hasChildren && (
                <div className="flex flex-col gap-1 md:gap-2">
                    {item.children!.map((child) => (
                        <FooterMenuLink
                            key={child.id}
                            item={child}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}