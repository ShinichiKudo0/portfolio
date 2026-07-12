"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { CheckCircle2 } from "lucide-react";

const EXPERIENCES = [
  {
    title: "Company Website & AI Chatbot",
    description: "The old Rising Tides website was a drag-and-drop Framer site with no real SEO or AEO. I rebuilt it from scratch alone, from the responsive UI down to a custom AI chatbot that answers visitor questions instantly. I also built the backend, the secure API routes, and a CI/CD pipeline so it deploys itself to Vercel's edge network. It now performs significantly better than the old site.",
  },
  {
    title: "Lead Qualification Engine",
    description: "Sales reps were burning hours manually qualifying leads. I built an invisible, webhook-triggered pipeline that pulls signals and scores records automatically, reducing processing time by 98% and reclaiming 40 hours a week.",
  },
  {
    title: "In-House Lead Enrichment Engine",
    description: "We were bleeding $10 a day on basic data credits. I wrote a custom enrichment engine that scrapes HTML and merges LinkedIn payloads using AI, cutting our per-lead cost by over 80%.",
  },
  {
    title: "LinkedIn DM Intelligence Agent",
    description: "Managing LinkedIn DMs was eating up bandwidth. I designed a system that intercepts messages, classifies intent, and drafts replies for one-click approval in Slack. It effectively replaced a full-time SDR.",
  },
  {
    title: "Website Visitor-to-Outreach Pipeline",
    description: "High-intent website visitors were slipping through the cracks. I built a zero-touch pipeline that parses Slack notifications, dedupes against the CRM, scores them against our ICP, and pushes them straight into outreach sequences.",
  },
  {
    title: "Autonomous AI Content Engine",
    description: "Content creation was a messy, manual bottleneck. I shipped a multi-agent system that handles everything from topic research and copywriting to AI image generation and direct publishing, saving $15,000 annually.",
  },
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full perspective-1000"
    >
      <div 
        style={{ transform: "translateZ(30px)" }} 
        className="w-full transition-shadow hover:shadow-[0_0_30px_rgba(215,52,11,0.2)] rounded-xl"
      >
        {children}
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-32 border-t border-border/20">
      <div className="px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* Left Sticky Column */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Experience
            </h2>
            <div className="h-px w-12 bg-primary mb-8" />
            
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              <a href="https://risingtides.io" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                Rising Tides
              </a>
            </h3>
            <h4 className="text-xl md:text-2xl font-medium mb-6 text-primary">AI Automation & Integration Engineer</h4>
            <p className="text-muted-foreground text-lg leading-relaxed">
              February 2025 to Present. Designing, building, and deploying AI agents, automation workflows, and full-stack web platforms that eliminate manual operations across GTM, sales enrichment, content, and outreach.
            </p>
          </div>

          {/* Right Scrolling Column (Cards) */}
          <div className="lg:w-2/3 flex flex-col gap-10">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <TiltCard>
                  <Card className="bg-zinc-950/80 backdrop-blur-md border-zinc-800/80 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardHeader className="relative z-10 pb-2">
                      <CardTitle className="text-2xl flex items-start gap-4 text-foreground">
                        {exp.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10 pt-4">
                      <CardDescription className="text-base text-muted-foreground leading-relaxed pl-0">
                        {exp.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
