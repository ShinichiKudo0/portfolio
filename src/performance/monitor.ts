import { PerformanceTier } from './types';

export class PerformanceMonitor {
  private fpsHistory: number[] = [];
  private frameTimes: number[] = [];
  private lastTime: number = performance.now();
  private historySize = 60; // Keep track of last ~60 frames
  private isMonitoring = false;
  private onDowngrade: () => void;
  private onUpgrade: () => void;
  private framesBelowThreshold = 0;
  private framesAboveThreshold = 0;

  // Hysteresis config
  private DOWNGRADE_THRESHOLD = 45;
  private UPGRADE_THRESHOLD = 58;
  private DOWNGRADE_FRAMES = 5 * 60; // 5 seconds at 60fps
  private UPGRADE_FRAMES = 15 * 60; // 15 seconds at 60fps
  private STARTUP_DELAY = 10000; // 10 seconds

  constructor(onDowngrade: () => void, onUpgrade: () => void) {
    this.onDowngrade = onDowngrade;
    this.onUpgrade = onUpgrade;
  }

  start() {
    setTimeout(() => {
      this.isMonitoring = true;
      this.lastTime = performance.now();
    }, this.STARTUP_DELAY);
  }

  stop() {
    this.isMonitoring = false;
  }

  recordFrame() {
    if (!this.isMonitoring) return;

    const now = performance.now();
    const frameTime = now - this.lastTime;
    this.lastTime = now;

    const currentFps = 1000 / frameTime;

    this.frameTimes.push(frameTime);
    this.fpsHistory.push(currentFps);

    if (this.frameTimes.length > this.historySize) {
      this.frameTimes.shift();
      this.fpsHistory.shift();
    }

    this.analyzePerformance(currentFps, frameTime);
  }

  private analyzePerformance(currentFps: number, currentFrameTime: number) {
    // 1. Check for thermal throttling or sustained low FPS
    if (currentFps < this.DOWNGRADE_THRESHOLD) {
      this.framesBelowThreshold++;
      this.framesAboveThreshold = 0;
    } else if (currentFps > this.UPGRADE_THRESHOLD) {
      this.framesAboveThreshold++;
      this.framesBelowThreshold = 0;
    } else {
      // Reset if in the "safe zone"
      this.framesBelowThreshold = 0;
      this.framesAboveThreshold = 0;
    }

    if (this.framesBelowThreshold >= this.DOWNGRADE_FRAMES) {
      this.onDowngrade();
      this.resetCounters();
    } else if (this.framesAboveThreshold >= this.UPGRADE_FRAMES) {
      this.onUpgrade();
      this.resetCounters();
    }
    
    // 2. Check for severe micro-stutters
    if (currentFrameTime > 100) {
       // A single frame took more than 100ms. If this happens often, 
       // we might want to track it for downgrades too.
       // For now, it's just recorded in history.
    }
  }

  private resetCounters() {
    this.framesBelowThreshold = 0;
    this.framesAboveThreshold = 0;
    // Add a cooldown after a change?
    this.isMonitoring = false;
    setTimeout(() => {
      this.isMonitoring = true;
      this.lastTime = performance.now();
    }, 5000); // 5 second cooldown before next decision
  }

  getStats() {
    const avgFps = this.fpsHistory.length 
      ? this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length 
      : 0;
    const avgFrameTime = this.frameTimes.length
      ? this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length
      : 0;
    
    return {
      avgFps: Math.round(avgFps),
      avgFrameTime: Math.round(avgFrameTime * 10) / 10,
    };
  }
}

export function inferInitialTier(): PerformanceTier {
  if (typeof window === 'undefined') return 'balanced'; // SSR fallback

  let score = 0;

  // Hardware Concurrency
  const cores = navigator.hardwareConcurrency || 4;
  if (cores >= 8) score += 3;
  else if (cores >= 4) score += 1;
  else score -= 2;

  // Device Memory
  // @ts-ignore
  const memory = navigator.deviceMemory || 4;
  if (memory >= 8) score += 3;
  else if (memory >= 4) score += 1;
  else score -= 2;

  // Network Connection
  // @ts-ignore
  const connection = navigator.connection;
  if (connection) {
    if (connection.saveData) score -= 5;
    if (connection.effectiveType === '4g') score += 1;
    if (connection.effectiveType === '3g') score -= 2;
    if (connection.effectiveType === '2g') score -= 4;
  }

  // Reduced Motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    score -= 2;
  }

  if (score >= 6) return 'ultra';
  if (score >= 4) return 'quality';
  if (score >= 0) return 'balanced';
  return 'performance';
}
