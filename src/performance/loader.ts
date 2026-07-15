export function requestIdle(cb: () => void, timeout?: number) {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    // @ts-ignore
    window.requestIdleCallback(cb, { timeout: timeout || 2000 });
  } else {
    setTimeout(cb, 1);
  }
}

// A simple utility to lazy load heavy scripts/assets during idle time
export function loadScriptIdle(src: string) {
  requestIdle(() => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  });
}
