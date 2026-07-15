export type PerformanceTier = 'ultra' | 'quality' | 'balanced' | 'performance';

export type PerformanceMode = 'auto' | PerformanceTier;

export interface PerformancePresets {
  dpr: number;
  particles: number;
  shadows: boolean;
  bloom: boolean;
  glassmorphism: boolean;
  motion: 'full' | 'medium' | 'minimal';
  imageQuality: 'high' | 'medium' | 'low';
  textureResolution: '4K' | '2K' | '1K' | '512px';
  postProcessing: 'all' | 'limited' | 'none';
  shaderComplexity: 'full' | 'reduced' | 'basic';
}
