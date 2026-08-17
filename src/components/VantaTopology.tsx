import { useEffect, useRef } from 'react';
import p5 from 'p5';
import TOPOLOGY from 'vanta/dist/vanta.topology.min';

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

  useEffect(() => {
    if (!ref.current) return;
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
        color: 0x0b6e3f,
        backgroundColor: 0xe7e2d8,
      });
    });

    return () => {
      cancelIdle(idleHandle as number);
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, []);

  return <div ref={ref} aria-hidden className={className} />;
}
