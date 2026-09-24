"use client";

import { FooterMenuColumn } from "./footerMenuColumn";
import { ZXMenuItem } from "@/lib/graphql";

interface FooterMenuProps {
    items: ZXMenuItem[];
}

export function FooterMenu({ items }: FooterMenuProps) {
    if (!items.length) return null;

    return (
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-0 md:gap-6 lg:gap-6 items-center md:items-end lg:items-end">
            {items.map((item) => (
                <FooterMenuColumn
                    key={item.id}
                    item={item}
                />
            ))}
        </div>
    );
}