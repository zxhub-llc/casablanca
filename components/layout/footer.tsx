"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import { ZXMenu, ZXSite } from "@/lib/graphql";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Facebook02Icon,
  InstagramIcon,
  NewTwitterIcon,
  TiktokIcon,
  WhatsappBusinessIcon,
} from "@hugeicons/core-free-icons";

import { FooterMenu } from "../nav/footer/footerMenu";
import { TextGradientEffect } from "../ui/text-gradient-effect";
import { motion } from "motion/react";

interface FooterProps {
  footerMenu?: ZXMenu | null;
  site?: ZXSite | null;
}


export function Footer({
  footerMenu,
  site
}: FooterProps) {
  const items = footerMenu?.items ?? [];
  const logoSrc = site?.logo?.dark ?? site?.logo?.light;

  const socialLinks = [
    {
      href: site?.social?.twitter,
      icon: NewTwitterIcon,
      label: "Twitter",
    },
    {
      href: site?.social?.whatsapp
        ? `https://wa.me/${site.social.whatsapp.replace(/\D/g, "")}`
        : undefined,
      icon: WhatsappBusinessIcon,
      label: "WhatsApp",
    },
    {
      href: site?.social?.facebook,
      icon: Facebook02Icon,
      label: "Facebook",
    },
    {
      href: site?.social?.tiktok,
      icon: TiktokIcon,
      label: "TikTok",
    },
    {
      href: site?.social?.instagram,
      icon: InstagramIcon,
      label: "Instagram",
    },
  ].filter((item) => item.href);

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-background px-4 pb-4 md:px-6 md:py-6">
      <footer
        className="bg-brand-soft w-full max-w-screen mx-auto text-black pt-8 lg:pt-12 px-4 sm:px-4 md:px-4 lg:px-8 rounded-3xl overflow-hidden">
        <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-12 lg:gap-16">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6 flex flex-col items-center justify-center lg:items-start lg:justify-start">
            <Link href="/" className="flex items-center justify-center">
              <motion.div
                key={logoSrc}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                <Image
                  src={logoSrc || ""}
                  alt={site?.title || "Logo"}
                  width={190}
                  height={40}
                  className="brightness-0 invert"
                />
              </motion.div>
            </Link>

            <p className="text-sm/6 text-neutral-800 dark:text-white w-full text-center lg:text-left lg:max-w-sm">
              {site?.description}
            </p>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-4 flex items-center justify-center lg:justify-end w-full">
            <FooterMenu items={items} />
          </div>
        </div>

        {/* BIG TEXT */}
        <div className="lg:h-100 h-40 flex items-center justify-center">
          <TextGradientEffect text="CASA BLANCA" />
        </div>

        {/* BOTTOM */}
        <div>
          <div className="max-w-screen mx-auto mb-4 flex flex-col gap-4 md:flex-row justify-between items-center text-neutral-800 dark:text-white">
            <div className="flex flex-col md:flex-row items-center gap-1 text-sm">
              <span>© 2023{currentYear > 2023 ? ` - ${currentYear}` : ""}</span>
              <span>{site?.title}</span>
            </div>

            <p className="text-sm">All rights reserved.</p>

            <div className="flex gap-5 md:gap-6">
              {socialLinks.map(({ href, icon, label }) => (
                <Link
                  key={label}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-colors hover:text-primary"
                >
                  <HugeiconsIcon icon={icon} />
                </Link>
              ))}
            </div>
          </div>

          <div className="pb-4 text-center text-sm text-neutral-800 dark:text-white">
            Desarrollado por{" "}
            <Link
              href="https://stuvvion.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-primary"
            >
              Stuvvion
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}