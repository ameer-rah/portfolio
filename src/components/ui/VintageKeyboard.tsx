import { useCallback, useEffect, useMemo, useState } from 'react';

type KeyConfig = {
  code: string;
  label: string;
  width?: number;
};

const ROWS: KeyConfig[][] = [
  [
    { code: 'Digit1', label: '1' }, { code: 'Digit2', label: '2' },
    { code: 'Digit3', label: '3' }, { code: 'Digit4', label: '4' },
    { code: 'Digit5', label: '5' }, { code: 'Digit6', label: '6' },
    { code: 'Digit7', label: '7' }, { code: 'Digit8', label: '8' },
    { code: 'Digit9', label: '9' }, { code: 'Digit0', label: '0' },
  ],
  [
    { code: 'KeyQ', label: 'Q' }, { code: 'KeyW', label: 'W' },
    { code: 'KeyE', label: 'E' }, { code: 'KeyR', label: 'R' },
    { code: 'KeyT', label: 'T' }, { code: 'KeyY', label: 'Y' },
    { code: 'KeyU', label: 'U' }, { code: 'KeyI', label: 'I' },
    { code: 'KeyO', label: 'O' }, { code: 'KeyP', label: 'P' },
  ],
  [
    { code: 'KeyA', label: 'A' }, { code: 'KeyS', label: 'S' },
    { code: 'KeyD', label: 'D' }, { code: 'KeyF', label: 'F' },
    { code: 'KeyG', label: 'G' }, { code: 'KeyH', label: 'H' },
    { code: 'KeyJ', label: 'J' }, { code: 'KeyK', label: 'K' },
    { code: 'KeyL', label: 'L' }, { code: 'Enter', label: 'Enter', width: 1.7 },
  ],
  [
    { code: 'ShiftLeft', label: 'Shift', width: 1.7 },
    { code: 'KeyZ', label: 'Z' }, { code: 'KeyX', label: 'X' },
    { code: 'KeyC', label: 'C' }, { code: 'KeyV', label: 'V' },
    { code: 'KeyB', label: 'B' }, { code: 'KeyN', label: 'N' },
    { code: 'KeyM', label: 'M' },
    { code: 'Backspace', label: '⌫', width: 1.7 },
  ],
  [
    { code: 'ControlLeft', label: 'Ctrl', width: 1.4 },
    { code: 'AltLeft', label: 'Alt', width: 1.4 },
    { code: 'Space', label: '', width: 5.6 },
    { code: 'AltRight', label: 'Alt', width: 1.4 },
    { code: 'ControlRight', label: 'Ctrl', width: 1.4 },
  ],
];

const KEY_LABELS = new Map(ROWS.flat().map((key) => [key.code, key.label || 'Space']));

export default function VintageKeyboard() {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(() => new Set());
  const [lastKey, setLastKey] = useState<string | null>(null);
  const supportedKeys = useMemo(() => new Set(KEY_LABELS.keys()), []);

  const press = useCallback((code: string) => {
    if (!supportedKeys.has(code)) return;
    setActiveKeys((current) => new Set(current).add(code));
    setLastKey(KEY_LABELS.get(code) ?? code);
  }, [supportedKeys]);

  const release = useCallback((code: string) => {
    setActiveKeys((current) => {
      const next = new Set(current);
      next.delete(code);
      return next;
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;
      press(event.code);
    };
    const onKeyUp = (event: KeyboardEvent) => release(event.code);
    const releaseAll = () => setActiveKeys(new Set());

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', releaseAll);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', releaseAll);
    };
  }, [press, release]);

  return (
    <div className="w-full" aria-label="Interactive keyboard">
      <div className="mb-4 flex min-h-7 items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.14em] text-brg">
        <span>Try the keyboard</span>
        <span className="normal-case tracking-normal text-stone-500" aria-live="polite">
          {lastKey ? `You pressed ${lastKey}` : 'Press any key'}
        </span>
      </div>

      <div className="relative rounded-xl bg-[#76502f] p-2.5 shadow-[0_18px_35px_-18px_rgba(16,37,29,0.55),inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-3px_0_rgba(54,31,14,0.35)] sm:p-3">
        <div className="absolute inset-0 rounded-xl opacity-25 [background-image:repeating-linear-gradient(176deg,transparent_0px,transparent_7px,rgba(48,28,13,0.35)_8px,transparent_10px)]" />
        <div className="relative space-y-1.5 rounded-lg bg-[#17130e] p-2 shadow-inner sm:space-y-2 sm:p-2.5">
          {ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1.5 sm:gap-2">
              {row.map((key) => {
                const active = activeKeys.has(key.code);
                return (
                  <button
                    key={key.code}
                    type="button"
                    aria-label={key.label || 'Space'}
                    aria-pressed={active}
                    onPointerDown={() => press(key.code)}
                    onPointerUp={() => release(key.code)}
                    onPointerCancel={() => release(key.code)}
                    onPointerLeave={() => release(key.code)}
                    className="relative h-8 min-w-0 select-none rounded-[4px] border border-[#b9a07d] bg-[#eadbc3] text-[8px] font-bold text-[#463725] shadow-[0_3px_0_#8e7455,0_4px_5px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.7)] transition-[transform,box-shadow,background-color] duration-75 hover:bg-[#f1e5d3] active:translate-y-[3px] active:shadow-[0_0_0_#8e7455,0_1px_2px_rgba(0,0,0,0.35)] aria-pressed:translate-y-[3px] aria-pressed:bg-gold aria-pressed:shadow-[0_0_0_#8e7455,0_1px_2px_rgba(0,0,0,0.35)] sm:h-10 sm:text-[10px]"
                    style={{ flexGrow: key.width ?? 1, flexBasis: 0 }}
                  >
                    {key.label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
