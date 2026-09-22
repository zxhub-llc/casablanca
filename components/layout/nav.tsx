"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { MobileNav } from "@/components/nav/header/mobileNav";
import { cn } from "@/lib/utils";
import { MenuRenderer } from "../nav/header/menuRenderer";
import { ZXCTA, ZXMenu, ZXSite } from "@/lib/graphql";

interface NavProps {
  menu?: ZXMenu | null;
  site?: ZXSite | null;
  footerMenu?: ZXMenu | null;
  cta?: ZXCTA | null;
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export function Nav({ menu, site, cta, className, children, id }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // En el diseño el fondo siempre es claro, así que usamos el logo oscuro
  const logoSrc = site?.logo?.dark ?? site?.logo?.default;

  return (
    <motion.nav
      id={id}
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 md:pt-6 lg:px-8",
        className
      )}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1500px] items-center justify-between gap-6 h-12 md:h-16",
          "rounded-full px-4 py-0 md:px-6 lg:px-8",
          "text-[#001B3D] backdrop-blur-xl transition-all duration-500",
          isScrolled
            ? "bg-[#EFEAE8]/20 shadow-lg"
            : "bg-white/10 shadow-sm"
        )}
      >
        {/* LOGO */}
        <Link href="/" className="flex shrink-0 items-center">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={site?.title ?? "Logo"}
              width={160}
              height={40}
              className="h-8 w-auto object-contain"
              priority
            />
          ) : (
            <span className="font-serif text-lg tracking-[0.35em] uppercase">
              {site?.title ?? "Casa Blanca"}
            </span>
          )}
        </Link>

        {children}

        {/* MENÚ DESKTOP */}
        <div className="hidden flex-1 items-center justify-center md:flex">
          <MenuRenderer menu={menu} />
        </div>

        {/* CTA + MÓVIL */}
        <div className="flex items-center gap-3">
          {cta?.enabled && cta.title && cta.url && (
            <Link
              href={cta.url}
              target={cta.newTab ? "_blank" : undefined}
              rel={cta.newTab ? "noopener noreferrer" : undefined}
              className="hidden rounded-full bg-[#FF385C] px-7 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#e0294b] md:inline-flex"
            >
              {cta.title}
            </Link>
          )}

          <div className="md:hidden">
            <MobileNav menu={menu} site={site} />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}