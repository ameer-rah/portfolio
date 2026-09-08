import { Warp } from '@paper-design/shaders-react';

const PALETTES = [
  ['#10251d', '#174f3a', '#d7ee79', '#efbd45'],
  ['#174f3a', '#267052', '#8db66b', '#f3efe3'],
  ['#0b1f18', '#174f3a', '#efbd45', '#d7ee79'],
] as const;

export function FeatureShaderBackdrop({ variant = 0 }: { variant?: number }) {
  const colors = PALETTES[variant % PALETTES.length];

  return (
    <>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Warp
          style={{ width: '100%', height: '100%' }}
          proportion={0.3 + (variant % 3) * 0.04}
          softness={1.05}
          distortion={0.14}
          swirl={0.58 + (variant % 3) * 0.06}
          swirlIterations={8 + (variant % 3)}
          shape={variant % 2 === 0 ? 'checks' : 'stripes'}
          shapeScale={0.09}
          scale={1}
          rotation={0}
          speed={0.28}
          colors={[...colors]}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/94 via-white/88 to-[#f3efe3]/82 transition-opacity duration-300 group-hover:opacity-90"
        aria-hidden
      />
    </>
  );
}
