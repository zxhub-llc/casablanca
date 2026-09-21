"use client";

import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image, { ImageProps } from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    ArrowLeft01Icon,
    ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

import Link from "next/link";
import { ZXProduct } from "@/components/shop/product-card";

interface CarouselProps {
    items: JSX.Element[];
    initialScroll?: number;
}

export const Carousel = ({
    items,
    initialScroll = 0,
}: CarouselProps) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const [canScrollLeft, setCanScrollLeft] = useState(false);

    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => {
        if (!carouselRef.current) return;

        carouselRef.current.scrollLeft =
            initialScroll;

        checkScrollability();
    }, [initialScroll]);

    const checkScrollability = () => {
        if (!carouselRef.current) return;

        const {
            scrollLeft,
            scrollWidth,
            clientWidth,
        } = carouselRef.current;

        setCanScrollLeft(scrollLeft > 0);

        setCanScrollRight(
            scrollLeft < scrollWidth - clientWidth
        );
    };

    const scrollLeft = () => {
        carouselRef.current?.scrollBy({
            left: -300,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        carouselRef.current?.scrollBy({
            left: 300,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        checkScrollability();

        const observer = new ResizeObserver(() => {
            checkScrollability();
        });

        if (carouselRef.current) {
            observer.observe(carouselRef.current);
        }

        return () => observer.disconnect();
    }, [items.length]);

    return (
        <div className="relative max-w-screen">
            <div
                ref={carouselRef}
                onScroll={checkScrollability}
                className="flex w-full overflow-x-auto overscroll-x-auto scroll-smooth scrollbar-none"
            >
                <div className={cn("absolute right-0 z-10 h-full w-[5%] bg-linear-to-l")} />

                <div className={cn("mx-auto flex flex-row justify-start gap-4 pl-4 max-w-8xl")} >
                    {items.map((item, index) => (
                        <motion.div
                            key={`card-${index}`}
                            initial={{ opacity: 0, y: 20, }}
                            animate={{ opacity: 1, y: 0, }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut", }}
                            className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
                        >
                            {item}
                        </motion.div>
                    ))}
                </div>
            </div>

            {canScrollLeft && (
                <button
                    type="button"
                    onClick={scrollLeft}
                    className="absolute left-4 top-1/2 z-50 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-brand-foreground/60 text-white shadow-lg backdrop-blur"
                >
                    <HugeiconsIcon
                        icon={ArrowLeft01Icon}
                        className="h-8 w-8"
                    />
                </button>
            )}

            {canScrollRight && (
                <button
                    type="button"
                    onClick={scrollRight}
                    className="absolute right-4 top-1/2 z-50 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-brand-foreground/60 text-white shadow-lg backdrop-blur"
                >
                    <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        className="h-8 w-8"
                    />
                </button>
            )}
        </div>
    );
};

export const Card = ({
    product,
    index,
    layout = false,
}: {
    product: ZXProduct;
    index: number;
    layout?: boolean;
}) => {

    const titleCase = (text?: string) =>
        text?.replace(/\S+/g, (word) => {
            if (word.length <= 2) {
                return word.toUpperCase();
            }

            return (
                word.charAt(0).toUpperCase() +
                word.slice(1).toLowerCase()
            );
        }) ?? "";

    const hasImage = !!product.image?.url;

    return (
        <Link href={`/shop/${product.slug}`} className="block" >
            <motion.div
                layoutId={layout ? `card-${product.id}` : undefined}
                className="relative z-10 flex h-96 w-72 cursor-pointer flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[31rem] md:w-[24rem] dark:bg-neutral-900"
            >
                <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-linear-to-b from-black/50 via-transparent to-transparent" />

                <div className="relative z-40 p-8">
                    <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-2">
                        <motion.p
                            layoutId={layout ? `category-${product.id}` : undefined}
                            className="inline-flex py-1 text-xs font-medium text-white"
                        >
                            {product.categories?.map((c) => c.name).join(", ")}
                        </motion.p>

                        {product.badge && (
                            <span
                                className="inline-flex rounded-full px-3 py-1 text-xs font-medium text-white"
                                style={{ backgroundColor: product.badgeColor || "#000000", }}
                            >
                                {product.badge}
                            </span>
                        )}
                    </div>

                    <motion.p
                        layoutId={layout ? `title-${product.id}` : undefined}
                        className="mt-1 md:mt-2 max-w-md text-left font-sans text-xl font-semibold leading-tight text-balance text-white md:text-3xl"
                    >
                        {titleCase(product.name)}
                    </motion.p>
                </div>

                {hasImage ? (
                    <>
                        <div className="absolute inset-0 bg-brand-soft" />

                        <BlurImage
                            src={product.image.url}
                            alt={
                                product.image.alt ||
                                product.name
                            }
                            preload={index < 4}
                            fill
                            className="absolute inset-0 z-10 object-cover"
                        />
                    </>
                ) : (
                    <div className="absolute inset-0 z-10 bg-brand-soft" />
                )}
            </motion.div>
        </Link>
    );
};

export const BlurImage = ({
    src,
    className,
    alt,
    ...rest
}: ImageProps & {
    preload?: boolean;
}) => {
    const [isLoading, setLoading] =
        useState(true);

    if (
        !src ||
        (typeof src === "string" &&
            src.trim() === "")
    ) {
        return (
            <div
                className={cn(
                    "h-full w-full bg-brand-soft",
                    className
                )}
            />
        );
    }

    return (
        <Image
            {...rest}
            src={src}
            alt={alt}
            sizes="(max-width: 768px) 224px, 384px"
            onLoad={() => setLoading(false)}
            className={cn(
                "transition duration-300",
                isLoading
                    ? "scale-105 opacity-0"
                    : "scale-100 opacity-100",
                className
            )}
        />
    );
};