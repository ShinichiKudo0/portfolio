"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.5, delay: 0.2 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          "-=1"
        )
        .fromTo(
          ctaRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.8"
        );
    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP on unmount
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[90vh] flex flex-col justify-center pt-24 md:pt-32 pb-20 md:pb-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto"
    >
      <div className="relative z-10 w-full overflow-hidden">
        <div ref={titleRef} className="mb-12 w-full flex flex-col font-black uppercase leading-[0.85] text-[6vw] sm:text-[6vw] md:text-[5vw] lg:text-[4.5vw] xl:text-[4vw] drop-shadow-[0_0_15px_rgba(0,0,0,0.3)]">
          <div className="flex justify-between w-full text-foreground">
            {'ENGINEERING'.split('').map((char, i) => <span key={i}>{char}</span>)}
          </div>
          <div className="flex justify-between w-full text-zinc-200">
            {'SOFTWARE'.split('').map((char, i) => <span key={i}>{char}</span>)}
            <span className="text-primary px-2">&</span>
            {'AI'.split('').map((char, i) => <span key={i}>{char}</span>)}
          </div>
          <div className="flex justify-between w-full text-zinc-400">
            {'SYSTEMS'.split('').map((char, i) => <span key={i}>{char}</span>)}
            <span className="text-transparent">.</span>
            {'SCALABLE'.split('').map((char, i) => <span key={i}>{char}</span>)}
          </div>
          <div className="flex justify-between w-full text-zinc-600">
            {'INFRASTRUCTURE'.split('').map((char, i) => <span key={i}>{char}</span>)}
          </div>
        </div>
        
        <p 
          ref={subtitleRef} 
          className="text-base sm:text-lg md:text-2xl text-foreground/90 max-w-5xl mb-12 leading-relaxed font-light drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]"
        >
          A human who engineers solutions using his brain and AI as a force multiplier. I design, architect, and ship complete systems - from high-performance web platforms to autonomous AI pipelines - that would typically require an entire product team.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row flex-wrap gap-4">
          <a href="#projects" className="w-full sm:w-auto">
            <Button size="lg" className="rounded-full text-base px-8 h-14 group w-full sm:w-auto">
              View Systems
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <a href="#contact" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="rounded-full text-base px-8 h-14 w-full sm:w-auto">
              Let's Talk
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
