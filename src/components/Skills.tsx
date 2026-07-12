"use client";

import { motion } from "framer-motion";
import { Terminal, Code2, Database, Layers, BrainCircuit, Globe2 } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    title: "AI & Automation",
    icon: <BrainCircuit className="text-primary mb-4" size={32} />,
    skills: ["Claude", "OpenAI GPT", "Google Gemini", "LLMs", "Prompt Engineering", "RAG", "Multi-Agent Systems"]
  },
  {
    title: "GTM & Outreach Stack",
    icon: <Globe2 className="text-primary mb-4" size={32} />,
    skills: ["Clay", "Lemlist", "Smartlead", "Instantly", "HubSpot CRM", "Unipile API", "Apollo"]
  },
  {
    title: "Languages",
    icon: <Code2 className="text-primary mb-4" size={32} />,
    skills: ["JavaScript", "Python", "Java", "SQL", "HTML", "CSS"]
  },
  {
    title: "Frameworks & Libraries",
    icon: <Layers className="text-primary mb-4" size={32} />,
    skills: ["React.js", "Next.js", "Node.js", "Express.js", "TailwindCSS"]
  },
  {
    title: "Platforms & Tools",
    icon: <Terminal className="text-primary mb-4" size={32} />,
    skills: ["n8n", "Git", "GitHub", "VS Code", "Figma", "Google Cloud", "Antigravity"]
  },
  {
    title: "Core Concepts",
    icon: <Database className="text-primary mb-4" size={32} />,
    skills: ["Data Structures & Algorithms", "OOP", "RESTful APIs", "Webhook Architecture", "Web Scraping"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div className="px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
        <div className="mb-16 md:mb-24">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">
            Technical Arsenal
          </h2>
          <div className="h-px w-12 bg-primary mb-8" />
          <p className="text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl leading-tight">
            The tools I use to turn ideas into production-ready systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-950/50 border border-zinc-800/80 p-8 rounded-2xl hover:border-primary/30 transition-colors group relative overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {category.icon}
                <h3 className="text-xl font-bold text-foreground mb-6">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-medium bg-secondary/40 text-secondary-foreground rounded-md border border-border/30 hover:border-primary/50 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* The Agnosticism Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 p-8 md:p-12 text-center max-w-4xl mx-auto"
        >
          {/* Animated border gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-30" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Tech Agnostic. Paradigm Driven.
            </h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              I don't just memorize syntax - I learn systems. I can pick up any new tech stack, language, or tool in days, not months, and adapt to any domain to ship systems that actually work. <strong className="text-foreground font-semibold">The tool is just a means to an end; the architecture is what matters.</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
