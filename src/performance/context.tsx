'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { PerformanceMode, PerformancePresets, PerformanceTier } from './types';
import { PERFORMANCE_PRESETS } from './presets';
import { inferInitialTier, PerformanceMonitor } from './monitor';

interface PerformanceContextType {
  tier: PerformanceTier;
  mode: PerformanceMode;
  presets: PerformancePresets;
  setMode: (mode: PerformanceMode) => void;
  stats: { avgFps: number; avgFrameTime: number };
  recordFrame: () => void;
}

const PerformanceContext = createContext<PerformanceContextType | null>(null);

const TIER_ORDER: PerformanceTier[] = ['performance', 'balanced', 'quality', 'ultra'];

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<PerformanceMode>('auto');
  const [autoTier, setAutoTier] = useState<PerformanceTier>('balanced');
  const [stats, setStats] = useState({ avgFps: 0, avgFrameTime: 0 });
  const monitorRef = useRef<PerformanceMonitor | null>(null);

  useEffect(() => {
    // 1. Initial Load & Hydration
    const savedMode = localStorage.getItem('performanceMode') as PerformanceMode | null;
    const savedTier = localStorage.getItem('performanceTier') as PerformanceTier | null;

    if (savedMode) setModeState(savedMode);
    
    if (savedTier) {
       setAutoTier(savedTier);
    } else {
       const inferred = inferInitialTier();
       setAutoTier(inferred);
       localStorage.setItem('performanceTier', inferred);
    }

    // 2. Initialize Monitor
    monitorRef.current = new PerformanceMonitor(
      // Downgrade
      () => {
        setAutoTier((current) => {
          const idx = TIER_ORDER.indexOf(current);
          if (idx > 0) {
            const newTier = TIER_ORDER[idx - 1];
            localStorage.setItem('performanceTier', newTier);
            return newTier;
          }
          return current;
        });
      },
      // Upgrade
      () => {
        setAutoTier((current) => {
          const idx = TIER_ORDER.indexOf(current);
          if (idx < TIER_ORDER.length - 1) {
            const newTier = TIER_ORDER[idx + 1];
            localStorage.setItem('performanceTier', newTier);
            return newTier;
          }
          return current;
        });
      }
    );

    monitorRef.current.start();

    // 3. Telemetry / Stats polling for HUD
    const interval = setInterval(() => {
       if (monitorRef.current) {
          setStats(monitorRef.current.getStats());
       }
    }, 1000);

    return () => {
      monitorRef.current?.stop();
      clearInterval(interval);
    };
  }, []);

  const setMode = (newMode: PerformanceMode) => {
    setModeState(newMode);
    localStorage.setItem('performanceMode', newMode);
    if (newMode !== 'auto') {
      monitorRef.current?.stop();
    } else {
      monitorRef.current?.start();
    }
  };

  const recordFrame = useCallback(() => {
    monitorRef.current?.recordFrame();
  }, []);

  const activeTier = mode === 'auto' ? autoTier : mode;
  const presets = PERFORMANCE_PRESETS[activeTier];

  const value = useMemo(() => ({
    tier: activeTier,
    mode,
    presets,
    setMode,
    stats,
    recordFrame
  }), [activeTier, mode, presets, stats, recordFrame]);

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
}

import { useFrame } from '@react-three/fiber';

export function usePerformance() {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
}

export function CanvasPerformanceMonitor() {
  const { mode, recordFrame } = usePerformance();

  useFrame(() => {
    if (mode === 'auto') {
       recordFrame();
    }
  });

  return null;
}
