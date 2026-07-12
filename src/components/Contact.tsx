"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    const subject = encodeURIComponent(`New Contact Form Submission from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    
    window.location.href = `mailto:mayankmehra0003@gmail.com?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      form.reset();
    }, 500);
  };

  return (
    <section id="contact" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Let's talk.</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-md">
            Got a complex problem to solve or an automation idea? I am always open to discussing new opportunities and building scalable systems.
          </p>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">Email</p>
              <a href="mailto:mayankmehra0003@gmail.com" className="text-xl font-medium hover:text-primary transition-colors">
                mayankmehra0003@gmail.com
              </a>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">Location</p>
              <p className="text-xl font-medium">New Delhi, India</p>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 p-8 rounded-3xl border border-border/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your name" required className="bg-background/50 h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="your@email.com" required className="bg-background/50 h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                name="message"
                placeholder="Tell me about your project..." 
                required 
                className="bg-background/50 min-h-[150px] resize-none" 
              />
            </div>
            <Button type="submit" className="w-full h-12 text-base" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
