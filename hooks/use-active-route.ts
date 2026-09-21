"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

// Agregamos el parámetro 'exact' por defecto en true
export function useActiveRoute(url: string, exact = true) {
    const pathname = usePathname();

    return useMemo(() => {
        if (!url) return false;

        const cleanUrl = url.replace(/\/$/, "") || "/";
        const cleanPath = pathname.replace(/\/$/, "") || "/";

        if (exact) {
            return cleanPath === cleanUrl;
        }

        if (cleanUrl === "/") return cleanPath === "/";
        return cleanPath === cleanUrl || cleanPath.startsWith(cleanUrl + "/");
    }, [pathname, url, exact]);
}