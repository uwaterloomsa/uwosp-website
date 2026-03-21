import { useEffect, useRef } from "react";

interface ParallaxHeroProps {
  imgSrc: string;
  children: React.ReactNode;
  className?: string;
}

export default function ParallaxHero({
  imgSrc,
  children,
  className = "",
}: ParallaxHeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const layers = hero.querySelectorAll<HTMLElement>("[data-parallax]");
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        layers.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || "0");
          el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
        });
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className={`hero hero--image parallax-hero ${className}`.trim()}
      ref={heroRef}
    >
      <img
        className="hero-bg-img parallax-layer"
        data-parallax="0.35"
        src={imgSrc}
        alt=""
        loading="eager"
      />
      <div className="parallax-mid parallax-layer" data-parallax="0.2" />
      <div className="parallax-particles parallax-layer" data-parallax="0.12">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
        <div className="particle particle-4" />
        <div className="particle particle-5" />
      </div>
      <div className="hero-content parallax-layer" data-parallax="-0.08">
        {children}
      </div>
    </section>
  );
}
