"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useActiveRoute } from "@/hooks/use-active-route";
import { ZXMenuItem } from "@/lib/graphql";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronDown, ChevronRight } from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";

interface MegaMenuProps {
    items: ZXMenuItem[];
}

export function MegaMenu({ items }: MegaMenuProps) {
    return (
        <nav className="flex items-center gap-8">
            {items.map((item) => (
                <MegaMenuItem
                    key={item.id}
                    item={item}
                />
            ))}
        </nav>
    );
}

function MegaMenuItem({ item }: { item: ZXMenuItem }) {
    const hasChildren = !!item.children?.length;
    const isExactActive = useActiveRoute(item.url, true);
    const isPlaceholder = item.url === "#" || item.url === "/#" || !item.url;

    // ESTADO: Guarda cuál hijo está activo para pintar su imagen y textos
    const [activeChild, setActiveChild] = useState<ZXMenuItem | null>(null);

    // Efecto para que, cada vez que el menú se monte o cambie, 
    // por defecto se pre-seleccione el primer hijo disponible
    useEffect(() => {
        if (hasChildren && item.children) {
            setActiveChild(item.children[0]);
        }
    }, [item.children, hasChildren]);

    const triggerClasses = cn(
        "flex items-center gap-1.5 py-5 text-sm font-medium transition-colors relative text-foreground uppercase",
        isExactActive ? "text-primary" : "text-current hover:text-primary group-hover:text-primary"
    );

    const renderTriggerContent = () => (
        <>
            {item.title}
            {item.isOverview && (
                <HugeiconsIcon icon={ChevronRight} strokeWidth={2} className="h-5 w-5 text-current" />
            )}
            {(item.url === "/shop" || item.url === "shop") && (
                <HugeiconsIcon icon={ChevronRight} strokeWidth={2} className="h-5 w-5 text-current" />
            )}
            {hasChildren && (
                <HugeiconsIcon
                    icon={ChevronDown}
                    strokeWidth={2}
                    className="h-5 w-5 transition-transform duration-200 group-hover:rotate-180 text-current"
                />
            )}
        </>
    );

    return (
        <div className="relative group">
            <div className="flex items-center">
                {isPlaceholder ? (
                    <button type="button" className={triggerClasses}>
                        {renderTriggerContent()}
                    </button>
                ) : (
                    <Link href={item.url} className={triggerClasses}>
                        {renderTriggerContent()}
                    </Link>
                )}
            </div>

            {/* DROPDOWN */}
            {hasChildren && (
                <div
                    className={cn(
                        "absolute left-1/2 top-[calc(100%+1px)] mt-px z-50",
                        "-translate-x-1/2",
                        "invisible opacity-0",
                        "group-hover:visible group-hover:opacity-100",
                        "transition-opacity duration-200"
                    )}
                >
                    <div className="w-96 rounded-b-2xl bg-[#b7aea5] shadow-2xl overflow-hidden">
                        <div className="p-8">
                            <div className="flex flex-col gap-6">
                                {item.children!.map((child) => (
                                    <MegaMenuChild
                                        key={child.id}
                                        item={child}
                                        onHover={() => setActiveChild(child)}
                                        isSelected={activeChild?.id === child.id}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Interfaz extendida para que el hijo sepa comunicarse con el padre
interface MegaMenuChildProps {
    item: ZXMenuItem;
    onHover: () => void;
    isSelected: boolean;
}

function MegaMenuChild({ item, onHover, isSelected }: MegaMenuChildProps) {
    const isActive = useActiveRoute(item.url, true);
    const hasChildren = !!item.children?.length;
    const isPlaceholder = item.url === "#" || item.url === "/#" || !item.url;

    const childClasses = cn(
        "flex items-center gap-1 text-lg uppercase font-bold mb-2 transition-colors cursor-pointer",
        // Si la ruta es la actual, o si tenemos el mouse encima (isSelected), se ilumina en blanco
        isActive || isSelected ? "text-white" : "text-black/40 hover:text-white"
    );

    return (
        <div className="w-full" onMouseEnter={onHover}> {/* ◄ Captura el movimiento del mouse */}
            {isPlaceholder ? (
                <div className={childClasses}>
                    {item.title}
                    {item.isOverview && (
                        <HugeiconsIcon icon={ChevronRight} className="h-3.5 w-3.5" />
                    )}
                </div>
            ) : (
                <Link href={item.url} className={childClasses}>
                    {item.title}
                    {item.isOverview && (
                        <HugeiconsIcon icon={ChevronRight} className="h-3.5 w-3.5" />
                    )}
                </Link>
            )}

            {hasChildren && (
                <div className="flex flex-col gap-2 border-l border-[#8a795c] pl-4">
                    {item.children!.map((sub) => {
                        const isSubActive = useActiveRoute(sub.url, true);
                        return (
                            <Link
                                key={sub.id}
                                href={sub.url}
                                className={cn(
                                    "text-sm transition-colors uppercase font-medium",
                                    isSubActive ? "text-white" : "text-black/60 hover:text-white"
                                )}
                            >
                                {sub.title}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}