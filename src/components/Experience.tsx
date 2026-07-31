"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle2, ChevronRight } from "lucide-react";

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
              How I Architect B2B Growth & Automation Workflows
            </h2>
            <div className="h-px w-12 bg-primary mb-8" />
            
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              <a href="https://risingtides.io" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                Rising Tides
              </a>
            </h3>
            <h4 className="text-xl md:text-2xl font-medium mb-6 text-primary">AI Automation & Integration Engineer</h4>
            <p className="text-muted-foreground text-lg leading-relaxed">
              As an AI Automation & Integration Engineer, I architect and deploy zero-touch B2B growth pipelines, eliminating manual operations across GTM strategies, sales enrichment, and outreach. I specialize in building multi-agent systems and custom data endpoints to scale high-intent lead generation and client acquisition.
            </p>
          </div>

          {/* Right Scrolling Column (Cards) */}
          <div className="lg:w-2/3 flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <TiltCard>
                <Card className="bg-zinc-950/80 backdrop-blur-md border-zinc-800/80 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader className="relative z-10 pb-4 border-b border-zinc-800/50">
                    <CardTitle className="text-2xl flex items-center gap-2 text-foreground">
                      Core Architecture
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10 pt-6">
                    <ul className="space-y-4">
                      {[
                        "Architected and deployed full-stack web platforms using Next.js, TypeScript, and Tailwind CSS, secured by serverless APIs and deployed via Vercel CI/CD pipelines.",
                        "Engineered robust webhook-triggered automation pipelines integrating n8n, HubSpot API, and Clay for real-time lead routing and data enrichment.",
                        "Designed multi-agent systems leveraging OpenAI GPT and Unipile API for autonomous messaging, sentiment analysis, and intelligent content generation."
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TiltCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="w-full"
            >
              <TiltCard>
                <Card className="bg-zinc-950/80 backdrop-blur-md border-zinc-800/80 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader className="relative z-10 pb-4 border-b border-zinc-800/50">
                    <CardTitle className="text-2xl flex items-center gap-2 text-foreground">
                      Key Deployments
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10 pt-6">
                    <ul className="space-y-4">
                      {[
                        "Company Website & Chatbot: Independently architected and deployed the Rising Tides production website end-to-end, integrating a custom AI chatbot and secure serverless workflows.",
                        "Lead Qualification & Enrichment Engines: Deployed a zero-touch pipeline that scores records against ICP criteria and enriches data via AI, reducing manual processing time by 98% and cutting per-lead costs by 80%.",
                        "LinkedIn DM Intelligence Agent: Designed a system that captures incoming DMs, classifies intent, and drafts automated Slack-approved replies, effectively replacing full-time SDR bandwidth.",
                        "Autonomous AI Content Engine: Shipped a multi-agent pipeline that handles topic research, AI image generation, and direct publishing, saving $15,000 annually in production costs."
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-muted-foreground">
                          <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TiltCard>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
