'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ZXHeroStatic } from '@/lib/graphql'

interface HeroStaticProps {
  id: string
  hero: ZXHeroStatic
  title?: string
}

export function HeroStatic({
  id,
  hero,
  title,
}: HeroStaticProps) {
  const align =
    hero.textAlign === 'left'
      ? 'items-start text-left'
      : hero.textAlign === 'right'
        ? 'items-end text-right'
        : 'items-center text-center'

  return (
    <section id={id ?? "hero"} className="relative h-screen md:h-[100dvh] w-screen overflow-hidden">
      {hero.imageUrl && (
        <img
          src={hero.imageUrl}
          alt={
            hero.imageAlt ??
            hero.title ??
            'Hero Background'
          }
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-brand-background to-transparent" />

      <div
        className={`
          relative z-10 flex h-full flex-col justify-end pt-20 pb-20 md:pt-30 md:pb-30 px-6 md:px-12
          ${align}
        `}
      >
        <div className="w-full md:max-w-7xl text-white">
          <div
            className="flex w-fit items-center justify-between gap-6 h-10 rounded-full px-4 py-2 backdrop-blur-xl transition-all duration-500 bg-white/10 shadow-sm">
            {title && (
              <h3 className="text-sm leading-tight md:text-lg uppercase text-center md:text-end">
                {title}
              </h3>
            )}
          </div>

          {hero.title && (
            <h1 className="text-[52px] font-black font-jakarta md:font-extrabold leading-tight md:text-[150px] text-center md:text-start">
              {hero.title}
            </h1>
          )}
          <div
            className="flex w-full md:w-2xl items-center justify-between h-20 md:h-10 ">
            {hero.subtitle && (
              <p className="mb-0 md:mb-4 text-sm md:text-md leading-tight md:text-lg font-semibold md:font-medium uppercase text-white/80 text-center md:text-start">
                {hero.subtitle}
              </p>
            )}
          </div>

          {(hero.ctaText ||
            hero.cta2Text) && (
              <div className="mt-0 md:mt-8 flex flex-col md:flex-row gap-2 md:gap-4">
                {hero.ctaText &&
                  hero.ctaUrl && (
                    <Button
                      asChild
                      className="rounded-full h-12 px-4 bg-white text-foreground hover:bg-white hover:text-foreground relative group"
                    >
                      <Link href={hero.ctaUrl}>
                        <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                          {hero.ctaText}
                        </span>
                      </Link>
                    </Button>
                  )}

                {hero.cta2Text &&
                  hero.cta2Url && (
                    <Button
                      asChild
                      className="rounded-full h-12 px-4 hover:bg-primary hover:text-primary-foreground group"
                    >
                      <Link href={hero.cta2Url}>
                        <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                          {hero.cta2Text}
                        </span>
                      </Link>
                    </Button>
                  )}
              </div>
            )}
        </div>
      </div>
    </section>
  )
}