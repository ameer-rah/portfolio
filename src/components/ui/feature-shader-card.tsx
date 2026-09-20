export function FeatureShaderBackdrop({ variant = 0 }: { variant?: number }) {
  return <div className={`game-panel-texture game-panel-texture--${variant % 2}`} aria-hidden="true" />;
}
