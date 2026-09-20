import { useEffect, useRef } from 'react';
import p5 from 'p5';
import TOPOLOGY from 'vanta/dist/vanta.topology.min';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const requestIdle =
  typeof window.requestIdleCallback === 'function'
    ? window.requestIdleCallback
    : (cb: () => void) => window.setTimeout(cb, 1);
const cancelIdle =
  typeof window.cancelIdleCallback === 'function'
    ? window.cancelIdleCallback
    : window.clearTimeout;

export default function VantaTopology({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const effectRef = useRef<ReturnType<typeof TOPOLOGY> | null>(null);
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reducedMotion) return;
    const el = ref.current;

    const idleHandle = requestIdle(() => {
      effectRef.current = TOPOLOGY({
        el,
        p5,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.6,
        scaleMobile: 2.2,
        color: theme === 'dark' ? 0x647e56 : 0x849c7f,
        backgroundColor: theme === 'dark' ? 0x101b16 : 0xf0f1e7,
      });
    });

    return () => {
      cancelIdle(idleHandle as number);
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, [theme, reducedMotion]);

  return <div ref={ref} aria-hidden className={`vanta-atmosphere ${className ?? ''}`} />;
}
