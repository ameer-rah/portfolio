import { useState } from 'react';
import { SiDocker, SiFastapi, SiNextdotjs, SiPostgresql, SiPytorch, SiPython, SiReact, SiTypescript } from 'react-icons/si';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const STACK = [
  { name: 'Python', icon: SiPython, kind: 'Language', detail: 'Data pipelines, prerequisite planning, and machine learning. Python powers the RUPlanner engine and my Census analysis.', project: 'RUPlanner' },
  { name: 'TypeScript', icon: SiTypescript, kind: 'Language', detail: 'Typed interfaces and APIs across Archly, RUPlanner, and this portfolio.', project: 'RUPlanner' },
  { name: 'React', icon: SiReact, kind: 'Interface', detail: 'Interactive interfaces, from clinical monitoring dashboards to the character exploring this page.', project: 'Clinical Lab & Patient Monitoring' },
  { name: 'Next.js', icon: SiNextdotjs, kind: 'Framework', detail: 'The web application behind RUPlanner: course search, saved plans, and progress tracking.', project: 'RUPlanner' },
  { name: 'FastAPI', icon: SiFastapi, kind: 'API', detail: 'Python APIs for degree planning and serving predictions from the chest X-ray classifier.', project: 'Chest X-Ray Classifier' },
  { name: 'PyTorch', icon: SiPytorch, kind: 'Machine learning', detail: 'Fine-tuning a pretrained ResNet18 to classify chest X-rays in an educational machine learning project.', project: 'Chest X-Ray Classifier' },
  { name: 'PostgreSQL', icon: SiPostgresql, kind: 'Database', detail: 'Relational storage for course catalogs and plans in RUPlanner, and marketplace data at Archly.', project: 'RUPlanner' },
  { name: 'Docker', icon: SiDocker, kind: 'Infrastructure', detail: 'Reproducible environments for the planner and classifier, keeping local development and deployment consistent.', project: 'RUPlanner' },
];
export default function StackShowcase() {
  const [selected, setSelected] = useState(0);
  const tool = STACK[selected];
  return <section className="inventory-section"><div className="mx-auto max-w-6xl px-5 py-16 sm:py-20"><Reveal>
    <p className="game-eyebrow">Equipment</p><h2 className="game-section-title">Tools in my inventory.</h2>
    <p className="mt-4 max-w-xl text-stone-600">Select a tool to see where I use it.</p>
    <div className="inventory-layout"><div className="inventory-grid" role="group" aria-label="Select a technology">{STACK.map((item, index) => <button className="inventory-slot" type="button" key={item.name} aria-pressed={selected === index} onClick={() => setSelected(index)}><item.icon size={30} aria-hidden="true" /><span>{item.name}</span></button>)}</div>
    <div className="inventory-detail" aria-live="polite"><div className="flex items-center gap-4"><tool.icon size={34} aria-hidden="true" /><div><p className="game-eyebrow">{tool.kind}</p><h3 className="mt-1 text-2xl font-semibold">{tool.name}</h3></div></div><p className="mt-5 leading-relaxed text-stone-600">{tool.detail}</p><p className="mt-5 text-xs text-stone-500">Used in: {tool.project}</p><Link to="/projects" className="game-text-link">Explore projects →</Link></div></div>
  </Reveal></div></section>;
}
