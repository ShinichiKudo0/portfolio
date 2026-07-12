import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Mayank Mehra<span className="text-primary">.</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for new projects
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="https://github.com/ShinichiKudo0" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
            <FaGithub size={20} />
          </Link>
          <Link href="https://linkedin.com/in/mayankmeh" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
            <FaLinkedin size={20} />
          </Link>
          <Link href="mailto:mayankmehra0003@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
            <Mail size={20} />
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-border/40 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/70">
        <p>© {new Date().getFullYear()} Mayank Mehra. All rights reserved.</p>
      </div>
    </footer>
  );
}
