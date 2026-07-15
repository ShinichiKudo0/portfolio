import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import dynamic from 'next/dynamic';

const Experience = dynamic(() => import("@/components/Experience").then(mod => mod.Experience));
const Projects = dynamic(() => import("@/components/Projects").then(mod => mod.Projects));
const Skills = dynamic(() => import("@/components/Skills").then(mod => mod.Skills));
const Contact = dynamic(() => import("@/components/Contact").then(mod => mod.Contact));

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}
