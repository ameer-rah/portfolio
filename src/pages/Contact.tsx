import { Github, Linkedin, Mail } from 'lucide-react';
import Reveal from '../components/Reveal';

const CHANNELS = [
  {
    num: '001',
    label: 'Email',
    value: 'ameerrahman456@gmail.com',
    href: 'mailto:ameerrahman456@gmail.com',
    icon: Mail,
    external: false,
    note: 'Fastest way to reach me.',
  },
  {
    num: '002',
    label: 'GitHub',
    value: 'github.com/ameer-rah',
    href: 'https://github.com/ameer-rah',
    icon: Github,
    external: true,
    note: 'Current code and activity.',
  },
  {
    num: '003',
    label: 'LinkedIn',
    value: 'linkedin.com/in/ameer-rahman',
    href: 'https://linkedin.com/in/ameer-rahman',
    icon: Linkedin,
    external: true,
    note: 'Background and roles.',
  },
];

export default function Contact() {
  return (
    <>
      {/* Page header, blue */}
      <section className="panel flex min-h-[70svh] items-end bg-blue text-white">
        <div className="panel-inner">
          <Reveal>
            <p className="section-eyebrow text-white/75">004 — Contact</p>
            <h1 className="hero-title mt-6 max-w-4xl">
              Let's talk about
              <br />
              the hard half.
            </h1>
            <p className="section-subtext mt-6 max-w-xl text-white/85">
              The fastest way to reach me about engineering work or collaboration is
              email. You can also find my current code and activity on GitHub.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Channels, cream */}
      <section className="panel bg-cream text-ink">
        <div className="panel-inner">
          <div className="grid gap-px overflow-hidden rounded-xl bg-ink/15 sm:grid-cols-3">
            {CHANNELS.map((channel, i) => (
              <Reveal key={channel.label} delay={i * 0.08}>
                <a
                  href={channel.href}
                  {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex h-full flex-col bg-cream p-8 transition-colors duration-300 hover:bg-yellow sm:p-10"
                >
                  <span className="display-num text-4xl text-ink/25">{channel.num}</span>
                  <channel.icon size={22} strokeWidth={1.75} className="mt-8 text-orange" />
                  <h2 className="font-display mt-5 text-2xl tracking-tight">{channel.label}</h2>
                  <p className="mt-2 break-all text-sm text-ink/60">{channel.value}</p>
                  <p className="mt-auto pt-6 text-xs uppercase tracking-[0.08em] text-ink/50">
                    {channel.note}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="section-subtext mt-12 max-w-2xl text-ink/75">
              Based in New York City. Comfortable working remote or on site across the
              NY/NJ area. Seeking Spring 2027 internships and co-ops, and New Grad
              2027 roles.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
