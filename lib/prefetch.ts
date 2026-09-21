"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useMenuPrefetch(items: { url: string }[]) {
    const router = useRouter();

    useEffect(() => {
        items.forEach((item) => {
            if (item.url?.startsWith("/")) {
                router.prefetch(item.url);
            }
        });
    }, [items, router]);
}