import { ZXHero } from "@/lib/graphql";

import { HeroSlider } from "./carousel/hero-slider";
import { HeroStatic } from "./static/hero-static";

interface HeroSectionProps {
  id: string;
  hero: ZXHero;
}

export function HeroSection({ hero, id }: HeroSectionProps) {
  if (hero.type === "slider" && hero.slider) {
    return <HeroSlider slider={hero.slider} id={id} />;
  }

  if (hero.type === "static" && hero.static) {
    return (
      <HeroStatic
        hero={hero.static}
        title={hero.title}
        id={id}
      />
    );
  }

  return null;
}