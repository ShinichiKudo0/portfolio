"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Card } from "./ui/card";

const faqs = [
  {
    question: "What is your core tech stack for full-stack development?",
    answer: "I specialize in the React ecosystem, primarily using Next.js and TypeScript for scalable, server-rendered frontends. On the backend, I build RESTful APIs using Node.js/Express or Python/FastAPI, integrating with databases like Firebase and PostgreSQL."
  },
  {
    question: "How do you architect multi-agent AI systems?",
    answer: "I design stateless, event-driven pipelines (using n8n, OpenAI, and Google Gemini) where autonomous agents handle specific micro-tasks - like topic research, data enrichment, or content generation - passing structured JSON payloads between nodes without human intervention."
  },
  {
    question: "How do you approach building machine learning applications?",
    answer: "I focus on practical deployment and performance. For example, when building an AI deepfake detection platform, I engineered a Python/FastAPI backend using Librosa for audio feature extraction (MFCCs) and Scikit-learn's Isolation Forest for anomaly detection, optimizing the environment for cloud deployment with strict memory management."
  },
  {
    question: "Can you integrate custom software with marketing/GTM operations?",
    answer: "Yes. My background in software engineering allows me to treat GTM operations as data pipelines. I build custom webhooks, scrape data, and use APIs to route enriched payloads directly into CRM and outreach platforms, eliminating the need for basic Zapier integrations."
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
