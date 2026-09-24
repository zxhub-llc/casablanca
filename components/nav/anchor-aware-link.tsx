"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { MouseEvent } from "react";

interface AnchorAwareLinkProps {
    href: string;
    anchorTarget?: string | null;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

export function AnchorAwareLink({
    href,
    anchorTarget,
    className,
    onClick,
    children,
}: AnchorAwareLinkProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!anchorTarget) {
            onClick?.();
            return;
        }

        e.preventDefault();
        onClick?.();

        const scrollToSection = () => {
            document
                .getElementById(anchorTarget)
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
        };
        const isHome = pathname === "/" || /^\/(en|es)\/?(home|inicio)?$/.test(pathname);

        if (isHome) {
            scrollToSection();
        } else {
            router.push("/");
            setTimeout(scrollToSection, 400);
        }
    };

    return (
        <Link href={anchorTarget ? "#" : href} className={className} onClick={handleClick}>
            {children}
        </Link>
    );
}