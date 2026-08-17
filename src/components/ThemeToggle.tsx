import { Moon, Sun } from 'lucide-react';
import { setTheme, useTheme } from '../utils/theme';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className={`flex items-center justify-center text-stone-500 transition-colors hover:text-ink ${className}`}
    >
      {theme === 'dark' ? (
        <Sun size={16} strokeWidth={1.75} />
      ) : (
        <Moon size={16} strokeWidth={1.75} />
      )}
    </button>
  );
}
