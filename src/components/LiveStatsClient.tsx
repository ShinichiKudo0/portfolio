"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "./ui/card";
import { Activity, Zap, Server } from "lucide-react";

interface Stats {
  systemUptime: number; // percentage
  aiAgentsDeployed: number;
  apiEndpointsBuilt: number;
}

interface LiveStatsClientProps {
  initialStats: Stats;
}

// Helper to format large numbers
const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M+";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K+";
  return num.toString();
};

function AnimatedCounter({ value, isPercentage = false, format = false }: { value: number, isPercentage?: boolean, format?: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      // For very large numbers, we might just animate a smaller subset, but let's animate 0 to value simply
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepTime = Math.abs(Math.floor(duration / steps));
      
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        // Ease out quad
        const easeOut = progress * (2 - progress);
        
        setDisplayValue(value * easeOut);
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setDisplayValue(value);
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [value, isInView]);

  return (
    <span ref={ref} className="tabular-nums">
      {format 
        ? formatNumber(Math.round(displayValue))
        : isPercentage 
          ? displayValue.toFixed(2) 
          : Math.round(displayValue)}
      {isPercentage && "%"}
    </span>
  );
}

export function LiveStatsClient({ initialStats }: LiveStatsClientProps) {
  // We use the initial server-rendered stats directly.
  // We could add polling logic here if there was a real endpoint,
  // but for now, we ensure the initial HTML has these values.

  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        {/* Header removed as per user request */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-transparent border-zinc-800/50 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50" />
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
            <Server className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-4xl font-bold text-foreground mb-2">
            <AnimatedCounter value={initialStats.systemUptime} isPercentage />
          </div>
          <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
            System Uptime
          </div>
        </Card>

        <Card className="bg-transparent border-zinc-800/50 p-6 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div className="text-4xl font-bold text-foreground mb-2">
            <AnimatedCounter value={initialStats.aiAgentsDeployed} />+
          </div>
          <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
            AI Agents Deployed
          </div>
        </Card>

        <Card className="bg-transparent border-zinc-800/50 p-6 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
            <Activity className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-4xl font-bold text-foreground mb-2">
            <AnimatedCounter value={initialStats.apiEndpointsBuilt} />+
          </div>
          <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
            API Endpoints Built
          </div>
        </Card>
      </div>
    </section>
  );
}
