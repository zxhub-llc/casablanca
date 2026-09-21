"use client";

import { FooterMenuColumn } from "./footerMenuColumn";
import { ZXMenuItem } from "@/lib/graphql";

interface FooterMenuProps {
    items: ZXMenuItem[];
}

export function FooterMenu({ items }: FooterMenuProps) {
    if (!items.length) return null;

    return (
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-10 items-start">
            {items.map((item) => (
                <FooterMenuColumn
                    key={item.id}
                    item={item}
                />
            ))}
        </div>
    );
}