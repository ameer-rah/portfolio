import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export default function VantaFog({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reducedMotion) return;
    const dark = theme === 'dark';

    const effect = FOG({
      el: ref.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      highlightColor: dark ? 0x304d3b : 0xe5e9d6,
      midtoneColor: dark ? 0x1c3025 : 0xc4cfb4,
      lowlightColor: dark ? 0x102018 : 0x849c7f,
      baseColor: dark ? 0x101b16 : 0xf0f1e7,
      blurFactor: 0.72,
      speed: 0.25,
      zoom: 0.9,
    });

    return () => effect?.destroy();
  }, [theme, reducedMotion]);

  return <div ref={ref} aria-hidden className={`vanta-atmosphere ${className ?? ''}`} />;
}
