"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { NodeNetworkScene, VoyageSphereScene, ShieldCrystalScene } from "./Project3DGraphics";

const PROJECTS = [
  {
    title: "AI Mentorship Network",
    description: "Generic career advice doesn't scale. I built an adaptive mentorship platform that reads user profiles, dynamically routes them through a custom assessment engine, and pipes the signals into Gemini AI to generate hyper-personalized career roadmaps.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini AI"],
    link: "https://ai-mentorship-network.vercel.app",
    Scene: NodeNetworkScene
  },
  {
    title: "Intelligent Voyage Itinerary Builder",
    description: "Planning group travel is usually a nightmare of spreadsheets and tabs. I built an intelligent engine that ingests budget, group dynamics, and dates to instantly generate a personalized, multi-day itinerary. It's wrapped in a fluid, high-performance UI.",
    tags: ["React.js", "Firebase", "Google OAuth"],
    link: "https://bon-voyage-gilt.vercel.app",
    Scene: VoyageSphereScene
  },
  {
    title: "AI Shield (Security & Deepfake Detection)",
    description: "Legacy security filters can't catch AI-generated attacks. I architected a real-time, stateless security agent in FastAPI that intercepts payloads and uses Librosa and Scikit-learn to instantly flag deepfake audio and AI phishing attempts.",
    tags: ["Python", "FastAPI", "Scikit-learn", "REST API"],
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
              Featured Work
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
              <Card className="h-full flex flex-col overflow-hidden bg-zinc-950/50 backdrop-blur-sm border-zinc-800/80 hover:border-primary/50 transition-colors rounded-2xl relative">
                
                {/* 3D Visual Banner */}
                <div className="h-48 md:h-64 w-full relative overflow-hidden bg-zinc-950/80 border-b border-zinc-800/80">
                  <div className="absolute inset-0 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                    <project.Scene />
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2">
                      View System <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>

                <div className="flex-1 flex flex-col p-8">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-1">
                    <CardDescription className="text-base text-muted-foreground leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-0 pt-8 mt-auto flex flex-col items-start gap-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span key={tag} className="px-3 py-1.5 text-xs font-medium bg-secondary/50 text-secondary-foreground rounded-md border border-border/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardFooter>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
