import { useState, type CSSProperties } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Copy, Check } from 'lucide-react';
import PixelCompanion from './PixelCompanion';

export interface SceneStop {
  id: string;
  label: string;
  title: string;
  detail: string;
  meta: string;
  target?: string;
  href?: string;
  action: string;
}

export default function CompanionScene({ title, intro, stops, contact = false }: {
  title: string;
  intro: string;
  stops: SceneStop[];
  contact?: boolean;
}) {
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const reducedMotion = useReducedMotion();
  const stop = stops[selected];

  function choose(index: number) {
    setSelected(index);
    setCopied(false);
    setCopyFailed(false);
  }

  function visit() {
    const target = document.getElementById(stop.target!);
    target?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
    target?.focus({ preventScroll: true });
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('ameerrahman456@gmail.com');
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopyFailed(true);
    }
  }

  return (
    <section className={`companion-scene${contact ? ' companion-scene--contact' : ''}`} aria-label={title}>
      <div className="scene-heading">
        <div><p className="scene-eyebrow">{title}</p><p className="scene-intro">{intro}</p></div>
        <span className="scene-counter">{String(selected + 1).padStart(2, '0')} / {String(stops.length).padStart(2, '0')}</span>
      </div>
      <div className="scene-world" style={{ '--stops': stops.length, '--selected': selected } as CSSProperties}>
        <div className="scene-traveler"><PixelCompanion key={stop.id} embedded /></div>
        <div className="scene-path" aria-hidden="true" />
        <div className="scene-stations" role="group" aria-label="Choose a stop">
          {stops.map((item, index) => <button key={item.id} type="button" aria-pressed={selected === index} onClick={() => choose(index)}>
            <span className="scene-marker" aria-hidden="true">{selected === index ? '◆' : '◇'}</span>
            <span>{item.label}</span>
          </button>)}
        </div>
      </div>
      <div className="scene-dialogue">
        <div className="scene-response" aria-live="polite" aria-atomic="true">
          <span className="scene-speaker">AMEER <span aria-hidden="true">/</span> {stop.meta}</span>
          <h2>{stop.title}</h2>
          <p>{stop.detail}</p>
        </div>
        <div className="scene-actions">
          {stop.target ? <button className="scene-action" type="button" onClick={visit}>{stop.action}<ArrowRight size={16} /></button>
            : <a className="scene-action" href={stop.href} {...(stop.href?.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{stop.action}<ArrowRight size={16} /></a>}
          {contact && <button className="scene-copy" type="button" onClick={copyEmail}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? 'Email copied' : 'Copy email'}</button>}
          <div className="scene-step-controls">
            <button type="button" aria-label="Previous stop" disabled={selected === 0} onClick={() => choose(selected - 1)}><ArrowLeft size={16} /></button>
            <button type="button" aria-label="Next stop" disabled={selected === stops.length - 1} onClick={() => choose(selected + 1)}><ArrowRight size={16} /></button>
          </div>
        </div>
      </div>
      {contact && <p className="scene-copy-status" role="status">{copyFailed ? 'Copy unavailable. Email: ameerrahman456@gmail.com' : copied ? 'Copied ameerrahman456@gmail.com to your clipboard.' : ''}</p>}
    </section>
  );
}
