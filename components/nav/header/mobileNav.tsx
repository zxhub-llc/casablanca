"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useActiveRoute } from "@/hooks/use-active-route";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ZXMenu, ZXSite } from "@/lib/graphql";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronDown, ChevronRight, Facebook02Icon, InstagramIcon, Menu02Icon, NewTwitterIcon, TiktokIcon, WhatsappBusinessIcon } from "@hugeicons/core-free-icons";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion } from "motion/react";
import { AnchorAwareLink } from "../anchor-aware-link";

interface MobileNavProps {
  menu?: ZXMenu | null;
  site?: ZXSite | null;
}

export function MobileNav({ menu, site }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  const mainItems = menu?.items ?? [];
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="block md:hidden relative hover:bg-transparent border-none shadow-none cursor-pointer text-current hover:text-primary transition-colors duration-300 [&_svg]:size-6"
        >
          <HugeiconsIcon icon={Menu02Icon} className="-scale-x-100" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        showCloseButton={false}
        className="flex h-full flex-col"
      >
        <SheetHeader className="shrink-0">
          <SheetTitle className="text-left">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              <motion.div
                key={logoSrc}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                <Image
                  src={logoSrc || ""}
                  alt={site?.title || "Logo"}
                  width={66}
                  height={39}
                  className="brightness-0 invert"
                />
              </motion.div>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="flex flex-col space-y-4 pb-6">
            {mainItems.map((item) => (
              <MobileNavLink
                key={item.id}
                item={item}
                onClose={() => setOpen(false)}
              />
            ))}
          </div>
        </ScrollArea>
        <Separator />
        <SheetFooter className="shrink-0 pt-3">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex w-full justify-center gap-5 items-center">
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

            <div className="flex flex-col items-center gap-1 text-sm">
              <span>© 2023{currentYear > 2023 ? ` - ${currentYear}` : ""}</span>
              <span>{site?.title} </span>
            </div>

            <div className="text-center text-sm text-neutral-800 dark:text-white">
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
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function Section({ title }: { title: string }) {
  return (
    <>
      <h3 className="text-sm mt-6 text-muted-foreground">{title}</h3>
      <Separator />
    </>
  );
}

function MobileNavLink({
  item,
  onClose,
  level = 0,
}: {
  item: ZXMenu["items"][number];
  onClose: () => void;
  level?: number;
}) {
  const isActive = useActiveRoute(item.url, true);

  const hasChildren = !!item.children?.length;

  const isPlaceholder = !item.anchorTarget && (item.url === "#" || item.url === "/#" || !item.url);

  const [open, setOpen] = React.useState(false);

  const padding = [
    "pl-0",
    "pl-5",
    "pl-10",
    "pl-14",
  ][level] ?? "pl-14";

  if (!hasChildren) {
    if (isPlaceholder) {
      return (
        <div
          className={cn(
            "flex items-center gap-2 py-0 uppercase font-medium",
            padding,
            isActive
              ? "text-primary"
              : "text-foreground"
          )}
        >
          {item.title}

          {item.isOverview && (
            <HugeiconsIcon
              icon={ChevronRight}
              className="h-4 w-4"
            />
          )}
        </div>
      );
    }

    return (
      <AnchorAwareLink
        href={item.url}
        anchorTarget={item.anchorTarget}
        onClick={onClose}
        className={cn(
          "flex items-center gap-2 px-2 justify-between uppercase transition-colors",
          padding,
          isActive
            ? "text-primary font-medium"
            : "text-foreground hover:text-primary font-medium"
        )}
      >
        {item.title}
        {item.isOverview && (
          <HugeiconsIcon icon={ChevronRight} className="h-4 w-4" />
        )}
      </AnchorAwareLink>
    );
  }

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
    >
      <CollapsibleTrigger
        className={cn(
          "flex w-full items-center justify-between py-0 px-2 uppercase font-medium",
          padding
        )}
      >
        <div className="flex items-center">
          {isPlaceholder ? (
            <span>{item.title}</span>
          ) : (
            <AnchorAwareLink href={item.url} anchorTarget={item.anchorTarget} onClick={onClose}>
              {item.title}
            </AnchorAwareLink>
          )}

          {item.isOverview && (
            <HugeiconsIcon
              icon={ChevronRight}
              className="h-4 w-4"
            />
          )}
        </div>

        <HugeiconsIcon
          icon={ChevronDown}
          className={cn(
            "h-4 w-4 transition-transform",
            open && "rotate-180"
          )}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-1 mt-2">
        {item.children!.map((child) => (
          <MobileNavLink
            key={child.id}
            item={child}
            level={level + 1}
            onClose={onClose}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}