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

declare module 'vanta/dist/vanta.clouds.min' {
  import type * as THREE from 'three';

  interface VantaEffect {
    destroy(): void;
  }

  interface VantaCloudsOptions {
    el: HTMLElement;
    THREE?: typeof THREE;
    backgroundColor?: number;
    skyColor?: number;
    cloudColor?: number;
    cloudShadowColor?: number;
    sunColor?: number;
    sunGlareColor?: number;
    sunlightColor?: number;
    scale?: number;
    scaleMobile?: number;
    speed?: number;
    mouseEase?: boolean;
  }

  export default function CLOUDS(options: VantaCloudsOptions): VantaEffect;
}
