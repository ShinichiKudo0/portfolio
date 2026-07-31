"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView } from "framer-motion";

const SceneLoader = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const NodeNetworkSceneComponent = dynamic(() => import("./Project3DGraphics").then(mod => mod.NodeNetworkScene), { ssr: false, loading: SceneLoader });
const VoyageSphereSceneComponent = dynamic(() => import("./Project3DGraphics").then(mod => mod.VoyageSphereScene), { ssr: false, loading: SceneLoader });
const ShieldCrystalSceneComponent = dynamic(() => import("./Project3DGraphics").then(mod => mod.ShieldCrystalScene), { ssr: false, loading: SceneLoader });

function LazyScene({ Scene }: { Scene: React.ComponentType<any> }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });
  return (
    <div ref={ref} className="w-full h-full">
      {isInView ? <Scene /> : null}
    </div>
  );
}

const NodeNetworkScene = () => <LazyScene Scene={NodeNetworkSceneComponent} />;
const VoyageSphereScene = () => <LazyScene Scene={VoyageSphereSceneComponent} />;
const ShieldCrystalScene = () => <LazyScene Scene={ShieldCrystalSceneComponent} />;

const PROJECTS = [
  {
    title: "AI Mentorship Network",
    bottleneck: "Generic career advice does not scale and fails to provide actionable, user-specific guidance.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini AI"],
    system: [
      "Engineered an adaptive platform that dynamically routes user profiles through a custom assessment engine.",
      "Piped assessment signals directly into Gemini AI to generate hyper-personalized career roadmaps in real-time."
    ],
    output: "Eliminated generic advice generation, delivering a 100% personalized roadmap for every unique user profile.",
    link: "https://ai-mentorship-network.vercel.app",
    Scene: NodeNetworkScene
  },
  {
    title: "Intelligent Voyage Itinerary Builder",
    bottleneck: "Planning group travel is a fragmented, manual process involving disparate spreadsheets and browser tabs.",
    stack: ["React.js", "Firebase", "Google OAuth"],
    system: [
      "Built an intelligent engine that ingests critical constraints like budget, group dynamics, and preferred dates.",
      "Developed a fluid, high-performance UI to instantly synthesize and render a personalized, multi-day itinerary."
    ],
    output: "Reduced group trip planning time from hours to seconds by automating data synthesis and itinerary generation.",
    link: "https://bon-voyage-gilt.vercel.app",
    Scene: VoyageSphereScene
  },
  {
    title: "AI Shield (Security & Deepfake Detection)",
    bottleneck: "Legacy security filters rely on static signatures and cannot catch sophisticated AI-generated attacks or deepfakes.",
    stack: ["Python", "FastAPI", "Scikit-learn", "Librosa"],
    system: [
      "Architected a real-time, stateless security agent built on FastAPI to intercept incoming payloads.",
      "Integrated Librosa and Scikit-learn to run instant analytical models flagging deepfake audio and AI phishing attempts."
    ],
    output: "Created a robust, real-time detection pipeline capable of identifying AI anomalies that bypass legacy systems.",
    link: "https://ai-shield-pi.vercel.app",
    Scene: ShieldCrystalScene
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-32 border-t border-border/20">
      <div className="px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              System Implementation Case Studies
            </h2>
            <div className="h-px w-12 bg-primary mb-8" />
            <p className="text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-xl leading-tight">
              A selection of systems I've architected and shipped.
            </p>
          </div>
          <a href="https://github.com/ShinichiKudo0" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="rounded-full h-12 px-6">
              View All Projects
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full flex flex-col overflow-hidden bg-zinc-950/95 border-zinc-800/80 hover:border-primary/50 transition-colors rounded-2xl relative">
                
                {/* 3D Visual Banner */}
                <div className="h-48 md:h-64 w-full relative overflow-hidden bg-zinc-950/80 border-b border-zinc-800/80">
                  <div className="absolute inset-0 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                    <project.Scene />
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2">
                      View System <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>

                <div className="flex-1 flex flex-col p-8">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-1">
                    <div className="space-y-5 text-[15px] text-muted-foreground leading-relaxed">
                      <div>
                        <span className="font-bold text-foreground block mb-1">The Bottleneck:</span>
                        {project.bottleneck}
                      </div>
                      <div>
                        <span className="font-bold text-foreground block mb-1">The Stack:</span>
                        {project.stack.join(", ")}
                      </div>
                      <div>
                        <span className="font-bold text-foreground block mb-1">The System:</span>
                        <ul className="list-disc pl-5 space-y-1.5 marker:text-primary">
                          {project.system.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-bold text-foreground block mb-1">The Output:</span>
                        <span className="text-primary font-medium">{project.output}</span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
