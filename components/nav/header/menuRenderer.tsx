"use client";

import { MegaMenu } from "./megaMenu";
import { ZXMenu } from "@/lib/graphql";

interface Props {
    menu?: ZXMenu | null;
}

export function MenuRenderer({ menu }: Props) {
    return <MegaMenu items={menu?.items ?? []} />;
}