"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun03Icon, Moon02Icon } from "@hugeicons/core-free-icons";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      aria-label="Toggle theme"
      className="bg-transparent hover:bg-transparent border-none shadow-none cursor-pointer text-current hover:text-primary flex items-center justify-center relative [&_svg]:size-6"
    >
      <HugeiconsIcon
        icon={Sun03Icon}
        size={48}
        strokeWidth={1.5}
        className="rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0"
      />
      <HugeiconsIcon
        icon={Moon02Icon}
        size={48}
        strokeWidth={1.5}
        className="absolute rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100"
      />
    </Button>
  );
}