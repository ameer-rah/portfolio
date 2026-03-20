import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
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
  { type: 'output', text: 'AMEER.DEV v1.0 — Portfolio Terminal' },
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
      { type: 'link',   label: 'email    ', text: 'ar1735@scarletmail.rutgers.edu', href: 'mailto:ar1735@scarletmail.rutgers.edu' },
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

  // Focus input when screen mounts
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

      <div className="terminal pixel-box" onClick={() => inputRef.current?.focus()}>
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

        {/* Input row */}
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
  );
}
