"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12 backdrop-blur-md bg-transparent border-b border-border/50"
    >
      <Link href="/" className="text-xl font-bold tracking-tight">
        Mayank Mehra<span className="text-primary">.</span>
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <button
        className="md:hidden p-2 -mr-2 text-foreground"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-transparent backdrop-blur-xl border-b border-border/50 overflow-hidden md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
