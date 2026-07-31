"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Card } from "./ui/card";

const faqs = [
  {
    question: "What does a B2B Marketing Automation Architect do?",
    answer: "A B2B Marketing Automation Architect designs and implements cloud-hosted systems to scale revenue operations. Instead of manual lead routing, I build custom n8n workflows, data enrichment pipelines, and automated multi-channel campaigns that process prospects seamlessly from discovery to outreach."
  },
  {
    question: "Why use custom n8n workflows instead of standard Zapier integrations?",
    answer: "Cloud-hosted n8n environments allow for complex, multi-step data routing and custom API integrations without the strict rate limits and high costs of standard Zapier setups. It provides a true systems-level architecture for deep data enrichment and conditional logic necessary for B2B growth."
  },
  {
    question: "How do you automate cold outreach campaigns at scale?",
    answer: "Scaling cold outreach requires structured data. I build automated pipelines that enrich prospect data, segment audiences, and trigger multi-channel sequences. This ensures campaigns execute with high deliverability and accurate audience engagement tracking."
  },
  {
    question: "How does a Next.js frontend integrate with backend automation?",
    answer: "Next.js provides a lightning-fast, server-rendered frontend that can connect directly to automated backend workflows via API routes. This allows modern web experiences to act as dynamic endpoints, triggering automations or displaying live enriched data instantly."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400 mb-6">
          System Architecture FAQ
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Answers to common questions about B2B growth systems and modern tech stacks.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = index === openIndex;
          
          return (
            <Card 
              key={index} 
              className="bg-zinc-900/50 border-zinc-800/50 overflow-hidden cursor-pointer backdrop-blur-sm transition-colors hover:bg-zinc-900/80"
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <div className="px-6 py-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground pr-8">
                  {faq.question}
                </h3>
                <motion.div
                  initial={false}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-primary flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </div>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
