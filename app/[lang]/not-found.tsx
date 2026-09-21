import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { TextGradientEffect } from "@/components/ui/text-gradient-effect";

export default function NotFound() {
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden bg-background">
        <img
          src="/assets/imgs/background/background1.png"
          alt="Hero image"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full max-w-4xl mx-auto text-center px-4">
          <div className="lg:h-60 h-40 w-full flex items-center justify-center">
            <TextGradientEffect text="404" color="#ffffff" fontSize="320" fontWeight="900" yOffset="95%" />
          </div>
          <div className="space-y-4 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
              Página no encontrada
            </h2>
            <p className="text-base sm:text-lg text-white font-normal max-w-xl text-balance leading-tight drop-shadow-xs">
              Es posible que la página que busca haya sido eliminada, que se le haya cambiado el nombre o que no esté disponible temporalmente.
            </p>
          </div>
          <Button
            className="group mt-10 rounded-full bg-white text-black hover:bg-white/90 active:scale-98 shadow-xl hover:shadow-2xl px-8 py-6 text-md font-semibold tracking-wide transition-all duration-300"
            asChild
          >
            <Link href="/" className="flex items-center gap-2">
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                className="h-8 w-8 transform transition-transform duration-300 group-hover:-translate-x-1 font-bold"
              />
              <span>Volver al Inicio</span>
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
