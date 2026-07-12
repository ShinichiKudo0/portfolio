"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('p').forEach((el: any) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-32 px-6 lg:px-12 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Terminal Graphic */}
        <div className="relative rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden hidden md:block">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <div className="ml-2 text-xs font-mono text-zinc-500">mehra@builder:~/systems$</div>
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed text-zinc-300 h-[320px] flex flex-col justify-end relative shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent z-10 pointer-events-none"></div>
            <div className="space-y-2 relative z-20">
              <p>{`> [INFO] Initializing autonomy engine...`}</p>
              <p>{`> [WARN] Legacy processes detected. Deprecating...`}</p>
              <p>{`> [OK] Scraping payloads... 1,024 records parsed.`}</p>
              <p>{`> [OK] GTM sequences armed and ready.`}</p>
              <p>{`> [INFO] Connecting to Gemini API...`}</p>
            </div>
            <p className="mt-4 text-green-400 animate-pulse relative z-20 font-bold">{`> System online. Awaiting command_`}</p>
          </div>
        </div>

        {/* Right Side: Copy */}
        <div className="space-y-10">
          <div>
            <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              About Me
            </h2>
            <div className="h-px w-12 bg-primary mb-8" />
          </div>
          
          <div className="text-2xl md:text-3xl leading-snug font-medium space-y-8">
            <p>
              I don't just write code. I treat AI as a direct extension of my own brain to design, build, and ship complete systems that actually work.
            </p>
            <p className="text-muted-foreground">
              Most engineering bottlenecks are self-inflicted. I optimize for speed, extreme leverage, and zero friction. I operate like a full product team disguised as one person. I strip out the latency between having an idea and seeing it run in production.
            </p>
            <p>
              Right now, I'm building autonomous agents, ruthless automation pipelines, and high-performance web apps that fundamentally change how companies operate. If a process requires human repetition, I write the code that kills it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
