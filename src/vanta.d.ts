declare module 'vanta/dist/vanta.topology.min' {
  import type p5 from 'p5';

  interface VantaEffect {
    destroy(): void;
  }

  interface VantaTopologyOptions {
    el: HTMLElement;
    p5?: typeof p5;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    backgroundColor?: number;
  }

  export default function TOPOLOGY(options: VantaTopologyOptions): VantaEffect;
}

declare module 'vanta/dist/vanta.fog.min' {
  import type * as THREE from 'three';

  interface VantaEffect {
    destroy(): void;
  }

  interface VantaFogOptions {
    el: HTMLElement;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    highlightColor?: number;
    midtoneColor?: number;
    lowlightColor?: number;
    baseColor?: number;
    blurFactor?: number;
    speed?: number;
    zoom?: number;
  }

  export default function FOG(options: VantaFogOptions): VantaEffect;
}
