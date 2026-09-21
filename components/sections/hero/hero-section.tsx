import { ZXHero } from "@/lib/graphql";

import { HeroSlider } from "./carousel/hero-slider";
import { HeroStatic } from "./static/hero-static";

interface HeroSectionProps {
  hero: ZXHero;
}

export function HeroSection({ hero }: HeroSectionProps) {
  if (hero.type === "slider" && hero.slider) {
    return <HeroSlider slider={hero.slider} />;
  }

  if (hero.type === "static" && hero.static) {
    return (
      <HeroStatic
        hero={hero.static}
        title={hero.title}
      />
    );
  }

  return null;
}