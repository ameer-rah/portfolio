import { useState } from 'react';
import { SiDocker, SiFastapi, SiNextdotjs, SiPostgresql, SiPytorch, SiPython, SiReact, SiTypescript } from 'react-icons/si';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const STACK = [
  { name: 'Python', icon: SiPython, kind: 'Language', detail: 'Data pipelines, prerequisite planning, and machine learning. Python powers the RUPlanner engine and my Census analysis.', project: 'RUPlanner' },
  { name: 'TypeScript', icon: SiTypescript, kind: 'Language', detail: 'Typed interfaces and APIs across Archly, RUPlanner, and this portfolio.', project: 'RUPlanner' },
  { name: 'React', icon: SiReact, kind: 'Interface', detail: 'Interactive interfaces, from clinical monitoring dashboards to the pages you are reading now.', project: 'Clinical Lab & Patient Monitoring' },
  { name: 'Next.js', icon: SiNextdotjs, kind: 'Framework', detail: 'The web application behind RUPlanner: course search, saved plans, and progress tracking.', project: 'RUPlanner' },
  { name: 'FastAPI', icon: SiFastapi, kind: 'API', detail: 'Python APIs for degree planning and serving predictions from the chest X-ray classifier.', project: 'Chest X-Ray Classifier' },
  { name: 'PyTorch', icon: SiPytorch, kind: 'Machine learning', detail: 'Fine-tuning a pretrained ResNet18 to classify chest X-rays in an educational machine learning project.', project: 'Chest X-Ray Classifier' },
  { name: 'PostgreSQL', icon: SiPostgresql, kind: 'Database', detail: 'Relational storage for course catalogs and plans in RUPlanner, and marketplace data at Archly.', project: 'RUPlanner' },
  { name: 'Docker', icon: SiDocker, kind: 'Infrastructure', detail: 'Reproducible environments for the planner and classifier, keeping local development and deployment consistent.', project: 'RUPlanner' },
];

export default function StackShowcase() {
  const [selected, setSelected] = useState(0);
  const tool = STACK[selected];

  return (
    <section className="panel panel-tall bg-warmblack text-cream">
      <div className="panel-inner">
        <Reveal>
          <p className="section-eyebrow text-cream/50">The toolkit</p>
          <h2 className="section-title mt-4 max-w-2xl">
            What I reach for,
            <br />
            and where it shows up.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_22rem]">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-cream/15 sm:grid-cols-4" role="group" aria-label="Select a technology">
              {STACK.map((item, index) => (
                <button
                  type="button"
                  key={item.name}
                  aria-pressed={selected === index}
                  onClick={() => setSelected(index)}
                  className={`flex aspect-square flex-col items-center justify-center gap-3 p-4 text-xs transition-colors duration-300 ${
                    selected === index ? 'bg-orange text-white' : 'bg-warmblack text-cream/70 hover:bg-cream/10 hover:text-white'
                  }`}
                >
                  <item.icon size={26} aria-hidden="true" />
                  <span className="text-center leading-tight">{item.name}</span>
                </button>
              ))}
            </div>

            <div className="flex h-full flex-col rounded-xl border border-cream/15 p-7" aria-live="polite">
              <p className="section-eyebrow text-orange">{tool.kind}</p>
              <h3 className="font-display mt-2 text-3xl tracking-tight text-white">{tool.name}</h3>
              <p className="mt-5 text-sm leading-relaxed text-cream/75">{tool.detail}</p>
              <p className="mt-auto pt-6 text-xs uppercase tracking-[0.08em] text-cream/50">
                Used in: {tool.project}
              </p>
              <Link to="/projects" className="btn btn-light mt-5 self-start">
                Explore projects
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
