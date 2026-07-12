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
      className="relative min-h-[90vh] flex flex-col justify-end pb-20 md:pb-32 px-6 lg:px-12 max-w-7xl mx-auto"
    >
      <div className="relative z-10 max-w-4xl w-full">
        <div className="overflow-hidden mb-6 pb-2">
          <h1 
            ref={titleRef} 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1]"
          >
            Systems Builder & <br />
            <span className="text-muted-foreground">AI Architect.</span>
          </h1>
        </div>
        
        <p 
          ref={subtitleRef} 
          className="text-lg md:text-2xl text-foreground/90 max-w-3xl mb-10 leading-relaxed font-light"
        >
          A human who solves problems using his brain and AI as a superpower. I design, build, and ship full systems (web platforms, AI agents, automation pipelines) that would normally take a whole team.
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-4">
          <a href="#projects">
            <Button size="lg" className="rounded-full text-base px-8 h-14 group">
              View Systems
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <a href="#contact">
            <Button size="lg" variant="outline" className="rounded-full text-base px-8 h-14">
              Let's Talk
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
