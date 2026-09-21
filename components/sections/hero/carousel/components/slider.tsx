'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ZXSlide } from '@/lib/graphql'

interface SliderComponentProps {
  slide: ZXSlide
}

export function Slider({
  slide,
}: SliderComponentProps) {

  return (
    <div className="relative h-full w-full bg-brand-foreground">
      {slide.videoUrl ? (
        <video
          src={slide.videoUrl}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        /* 2. FALLBACK: Si no hay video, muestra la imagen */
        (slide.imageUrl || slide.mobileImageUrl) && (
          <>
            <picture>
              {slide.mobileImageUrl && (
                <source media="(max-width: 768px)" srcSet={slide.mobileImageUrl} />
              )}
              <img
                src={slide.imageUrl}
                alt={slide.imageAlt ?? slide.title ?? 'Slide'}
                className="h-full w-full object-cover"
              />
            </picture>

            <div className="absolute inset-0 z-1 bg-linear-to-r from-black via-black/70 to-transparent" />
          </>
        )
      )}
      <div
        className={`
          absolute inset-0 z-10 flex px-6 md:px-28 mb-20
          ${slide.alignment === 'left'
            ? 'items-end justify-start text-left'
            : slide.alignment ===
              'right'
              ? 'items-center justify-end text-right'
              : 'items-center justify-center text-center'
          }
        `}
      >
        <div className="max-w-6xl text-white">
          {slide.subtitle && (
            <p className="text-sm font-semibold font-jakarta uppercase tracking-tighter md:tracking-[0.25em] text-white/80 md:text-base">
              {slide.subtitle}
            </p>
          )}

          {slide.title && (
            <h1 className="mt-1 md:mt-6 text-3xl font-extrabold uppercase md:text-8xl">
              {slide.title}
            </h1>
          )}

          {slide.description && (
            <p className="mt-3 md:mt-6 max-w-4xl font-jakarta text-sm uppercase text-white/90 md:text-lg">
              {slide.description}
            </p>
          )}

          {(slide.ctaText ||
            slide.cta2Text) && (
              <div className="mt-4 md:mt-8 flex flex-wrap gap-4 uppercase">
                {slide.ctaText &&
                  slide.ctaUrl && (
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full text-white hover:bg-white hover:text-brand-foreground"
                    >
                      <Link
                        href={
                          slide.ctaUrl
                        }
                      >
                        {
                          slide.ctaText
                        }
                      </Link>
                    </Button>
                  )}

                {slide.cta2Text &&
                  slide.cta2Url && (
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-full border-white bg-transparent text-white hover:bg-white hover:text-black"
                    >
                      <Link
                        href={
                          slide.cta2Url
                        }
                      >
                        {
                          slide.cta2Text
                        }
                      </Link>
                    </Button>
                  )}
              </div>
            )}
        </div>
      </div>
    </div>
  )
}