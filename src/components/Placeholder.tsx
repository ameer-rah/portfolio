/** Stand-in artwork until real photography is dropped in. */
export default function Placeholder({
  label,
  tone = 'light',
  className = '',
}: {
  label: string;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const bg = tone === 'dark' ? '#141211' : '#3159f4';
  return (
    <div
      role="img"
      aria-label={`Placeholder image: ${label}`}
      className={`placeholder-art ${className}`}
      style={{ backgroundColor: bg, color: 'rgb(255 255 255 / 0.6)' }}
    >
      {label}
    </div>
  );
}
