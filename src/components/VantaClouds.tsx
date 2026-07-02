import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';

const requestIdle =
  typeof window.requestIdleCallback === 'function'
    ? window.requestIdleCallback
    : (cb: () => void) => window.setTimeout(cb, 1);
const cancelIdle =
  typeof window.cancelIdleCallback === 'function'
    ? window.cancelIdleCallback
    : window.clearTimeout;

export default function VantaClouds({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const effectRef = useRef<ReturnType<typeof CLOUDS> | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const idleHandle = requestIdle(() => {
      effectRef.current = CLOUDS({
        el,
        THREE,
        backgroundColor: 0x2b332d,
        skyColor: 0x3f4c40,
        cloudColor: 0x8a938a,
        cloudShadowColor: 0x14201a,
        sunColor: 0x50604f,
        sunGlareColor: 0x475647,
        sunlightColor: 0x7f9482,
        speed: 0.7,
        scale: 4,
        scaleMobile: 16,
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
