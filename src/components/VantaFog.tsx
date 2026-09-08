import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min';

export default function VantaFog({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const effect = FOG({
      el: ref.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      highlightColor: 0xefbd45,
      midtoneColor: 0xd7ee79,
      lowlightColor: 0x174f3a,
      baseColor: 0xf3efe3,
      blurFactor: 0.72,
      speed: 0.65,
      zoom: 0.9,
    });

    return () => effect?.destroy();
  }, []);

  return <div ref={ref} aria-hidden className={className} />;
}
