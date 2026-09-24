'use client'

import * as React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import {
  Autoplay,
  Pagination,
  EffectFade,
  Navigation,
} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'

import { cn } from '@/lib/utils'

import { Slider } from './components/slider'
import { ZXSlide, ZXSlider } from '@/lib/graphql'

interface HeroSliderProps {
  id: string;
  slider: ZXSlider
  className?: string
}

export function HeroSlider({
  id,
  slider,
  className,
}: HeroSliderProps) {
  const defaultDelay = Number(slider.delay ?? 5000)
  const swiperRef = React.useRef<SwiperType | null>(null)

  const handleSlideChange = (swiper: SwiperType) => {
    const activeSlideElement = swiper.slides[swiper.activeIndex]
    const video = activeSlideElement?.querySelector('video')

    if (video) {
      swiper.autoplay.stop()
      video.currentTime = 0
      video.play().catch(() => { })
      video.onended = () => {
        swiper.slideNext()
        swiper.autoplay.start()
      }
    } else {
      if (slider.autoplay) {
        swiper.params.autoplay = {
          delay: defaultDelay,
          disableOnInteraction: false,
        }
        swiper.autoplay.start()
      }
    }
  }

  return (
    <section
      id={id ?? "hero"}
      className={cn(
        'hero-slider relative h-screen w-full overflow-hidden bg-brand-foreground',
        className
      )}
      style={
        {
          '--hero-slider-delay': `${defaultDelay}ms`,
        } as React.CSSProperties
      }
    >
      <Swiper
        modules={[
          Autoplay,
          Pagination,
          EffectFade,
          Navigation,
        ]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
          setTimeout(() => handleSlideChange(swiper), 100)
        }}
        onSlideChange={handleSlideChange}
        effect={slider.effect === 'fade' ? 'fade' : 'slide'}
        fadeEffect={{
          crossFade: true,
        }}
        speed={1200}
        loop={slider.loop ?? true}
        autoplay={
          slider.autoplay
            ? {
              delay: defaultDelay,
              disableOnInteraction: false,
            }
            : false
        }
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="h-full w-full"
      >
        {slider.slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="!h-screen"
          >
            <Slider slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}