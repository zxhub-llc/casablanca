'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Check, ChevronDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Language = {
  code: string
  name: string
  flag?: string
}

const FLAG_FALLBACKS: Record<string, string> = {
  en: '/assets/flags/en.png',
  es: '/assets/flags/es.png',
}

const DEFAULT_FLAG = '/assets/flags/en.png'

export function LanguageSelector({
  languages,
}: {
  languages: Language[]
}) {

  const pathname = usePathname()

  const segments = pathname.split('/')

  const currentLang =
    ['en', 'es'].includes(segments[1])
      ? segments[1]
      : 'en'

  const currentLanguage =
    languages.find((l) => l.code === currentLang) ??
    languages[0]

  const handleSelect = (langCode: string) => {

    const segments = pathname.split('/')

    if (['en', 'es'].includes(segments[1])) {
      segments[1] = langCode
    } else {
      segments.splice(1, 0, langCode)
    }

    window.location.href = segments.join('/')
  }

  const getFlag = (
    flag?: string,
    langCode?: string
  ) => {

    if (flag && flag.trim() !== '') {
      return flag
    }

    return (
      FLAG_FALLBACKS[langCode || 'en'] ||
      DEFAULT_FLAG
    )
  }

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>

        <Button
          variant="unstyled"
          className={cn(
            `
      flex items-center gap-1
      px-0
      w-16
      rounded-full
      bg-transparent hover:bg-transparent
      md:bg-white/60
      backdrop-blur-xl
      hover:backdrop-blur-xl
      md:hover:bg-white/60
      md:text-campana-primary
      md:hover:text-campana-primary
      `
          )}
        >

          {/* SOLO CÓDIGO DE IDIOMA */}
          <span className="text-sm font-medium uppercase">
            {currentLanguage?.code}
          </span>

          <ChevronDown className="h-5 w-5 text-campana-primary" />

        </Button>

      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
          min-w-12
          bg-white/60
          backdrop-blur-xl
          hover:bg-white/60
          hover:backdrop-blur-xl
          text-campana-primary
          hover:text-campana-primary
          border-none
        "
      >

        {languages.map((lang) => {

          const isActive = lang.code === currentLang

          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={cn(
                'flex items-center gap-3 cursor-pointer',
                isActive && 'font-medium'
              )}
            >

              <span className="text-sm">
                {lang.code}
              </span>

              {isActive && (
                <Check className="ml-auto h-4 w-4" />
              )}

            </DropdownMenuItem>
          )
        })}

      </DropdownMenuContent>

    </DropdownMenu>
  )
}