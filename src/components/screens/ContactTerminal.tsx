import { useState, useRef, useEffect, type KeyboardEvent } from 'react';

function TerminalSprite() {
  const T = 'transparent';
  const H = '#3d2b1f'; const S = '#f4c48a'; const G = '#1a6b3a';
  const P = '#1a3a6b'; const W = '#ffffff'; const E = '#2c1810';
  const SH = '#2c1810';
  const grid: string[][] = [
    [H,H,H,H,H,H,H,H],[H,H,H,H,H,H,H,H],
    [H,S,S,S,S,S,S,H],[H,S,W,W,S,W,W,H],
    [H,S,E,E,S,E,E,H],[H,S,S,S,S,S,S,H],
    [T,T,G,G,G,G,T,T],[T,G,G,G,G,G,G,T],
    [T,G,G,G,G,G,G,T],[T,P,P,P,P,P,P,T],
    [T,P,P,T,T,P,P,T],[T,SH,SH,T,T,SH,SH,T],
  ];
  return (
    <svg width="48" height="72" viewBox="0 0 8 12" style={{ imageRendering: 'pixelated' }}>
      {grid.map((row, y) => row.map((fill, x) =>
        fill !== T ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} /> : null
      ))}
    </svg>
  );
}
import type { Screen } from '../../hooks/useKeyboardNav';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'blank' | 'link';
  text?: string;
  label?: string;
  href?: string;
}

const SCREENS: Screen[] = ['home', 'quests', 'inventory', 'dungeons', 'contact', 'library'];

const HELP_LINES: TerminalLine[] = [
  { type: 'output', text: 'Available commands:' },
  { type: 'output', text: '  whoami          — show character info' },
  { type: 'output', text: '  cat contact.txt  — show contact links' },
  { type: 'output', text: '  cat status.txt   — show availability' },
  { type: 'output', text: '  ls               — list all screens' },
  { type: 'output', text: '  goto <screen>    — navigate to a screen' },
  { type: 'output', text: '  clear            — clear terminal' },
  { type: 'output', text: '' },
  { type: 'output', text: '  screens: home · quests · inventory · dungeons · contact · library' },
];

const BOOT_LINES: TerminalLine[] = [
  { type: 'output', text: 'AMEER-RAHMAN.INFO v1.0 — Portfolio Terminal' },
  { type: 'output', text: 'Type "help" for available commands.' },
  { type: 'blank' },
];

function runCommand(cmd: string, navigate: (s: Screen) => void): TerminalLine[] {
  const raw = cmd.trim().toLowerCase();
  const [command, ...args] = raw.split(/\s+/);

  if (!raw) return [];

  if (command === 'clear') return [{ type: 'output', text: '__CLEAR__' }];

  if (command === 'help') return HELP_LINES;

  if (command === 'whoami') {
    return [
      { type: 'output', text: 'Ameer Rahman' },
      { type: 'output', text: 'CS @ Rutgers University — Expected May 2027' },
      { type: 'output', text: 'Full-Stack Engineer · Cybersecurity' },
      { type: 'output', text: 'New Brunswick, NJ' },
    ];
  }

  if (command === 'cat' && args[0] === 'contact.txt') {
    return [
      { type: 'link',   label: 'email    ', text: 'ameerrahman456@gmail.com', href: 'mailto:ameerrahman456@gmail.com' },
      { type: 'link',   label: 'github   ', text: 'github.com/ameer-rah',          href: 'https://github.com/ameer-rah' },
      { type: 'link',   label: 'linkedin ', text: 'linkedin.com/in/ameer-rahman',  href: 'https://linkedin.com/in/ameer-rahman' },
    ];
  }

  if (command === 'cat' && args[0] === 'status.txt') {
    return [
      { type: 'output', text: '⚡ Open to internships & collaborations — Summer 2026' },
    ];
  }

  if (command === 'ls') {
    return [
      { type: 'output', text: SCREENS.join('   ') },
    ];
  }

  if (command === 'goto' || command === 'cd') {
    const target = args[0] as Screen;
    if (!target) {
      return [{ type: 'error', text: `${command}: missing screen name` }];
    }
    if (!SCREENS.includes(target)) {
      return [
        { type: 'error', text: `${command}: '${target}' not found` },
        { type: 'output', text: `available: ${SCREENS.join(', ')}` },
      ];
    }
    navigate(target);
    return [{ type: 'output', text: `navigating to ${target}...` }];
  }

  return [{ type: 'error', text: `command not found: ${command}  (try "help")` }];
}

export default function ContactTerminal({ navigate }: { navigate: (s: Screen) => void }) {
  const [lines, setLines]   = useState<TerminalLine[]>(BOOT_LINES);
  const [input, setInput]   = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  function submit() {
    const cmd = input.trim();
    const result = runCommand(cmd, navigate);

    if (result.length === 1 && result[0].text === '__CLEAR__') {
      setLines(BOOT_LINES);
    } else {
      setLines(prev => [
        ...prev,
        { type: 'input', text: cmd },
        ...result,
        { type: 'blank' },
      ]);
    }

    if (cmd) setHistory(prev => [cmd, ...prev]);
    setInput('');
    setHistIdx(-1);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      submit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : history[next]);
    }
  }

  return (
    <div className="contact">
      <div className="screen-header">
        <span className="screen-title">&gt; TERMINAL</span>
        <span className="screen-subtitle">[ INTERACTIVE — type "help" ]</span>
      </div>

      <div className="terminal-desk">
        <div className="terminal-desk-sprite">
          <TerminalSprite />
          <div className="terminal-desk-sprite-label">TYPING...</div>
        </div>

        <div className="monitor-wrap">
          <div className="monitor-body">
            <div className="monitor-title-bar">
              <div className="monitor-dot" style={{ background: '#ff3333' }} />
              <div className="monitor-dot" style={{ background: '#ffb700' }} />
              <div className="monitor-dot" style={{ background: '#00cc66' }} />
              <span className="monitor-title-text">AMEER-RAHMAN.INFO — TERMINAL v1.0</span>
            </div>
            <div className="monitor-screen">
              <div className="terminal" onClick={() => inputRef.current?.focus()}>
                <div className="terminal-output">
                  {lines.map((line, i) => {
                    if (line.type === 'blank') return <div key={i} className="t-blank" />;
                    if (line.type === 'input') return (
                      <div key={i} className="t-line">
                        <span className="prompt">ameer@portfolio:~$ </span>
                        <span className="t-cmd">{line.text}</span>
                      </div>
                    );
                    if (line.type === 'error') return (
                      <div key={i} className="t-line">
                        <span className="t-error">{line.text}</span>
                      </div>
                    );
                    if (line.type === 'link') return (
                      <div key={i} className="t-line">
                        <span className="t-key">{line.label}</span>
                        <a href={line.href} target="_blank" rel="noopener noreferrer" className="t-link">
                          {line.text}
                        </a>
                      </div>
                    );
                    return (
                      <div key={i} className="t-line">
                        <span className="t-val-inline">{line.text}</span>
                      </div>
                    );
                  })}
                  <div ref={bottomRef} />
                </div>

                <div className="t-input-row">
                  <span className="prompt">ameer@portfolio:~$ </span>
                  <input
                    ref={inputRef}
                    className="t-input"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="off"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="monitor-neck" />
          <div className="monitor-base" />
        </div>
      </div>
    </div>
  );
}
