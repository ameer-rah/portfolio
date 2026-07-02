import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import Reveal from '../components/Reveal';

const CHANNELS = [
  {
    label: 'Email',
    value: 'ameerrahman456@gmail.com',
    href: 'mailto:ameerrahman456@gmail.com',
    icon: Mail,
    external: false,
  },
  {
    label: 'GitHub',
    value: 'github.com/ameer-rah',
    href: 'https://github.com/ameer-rah',
    icon: Github,
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/ameer-rahman',
    href: 'https://linkedin.com/in/ameer-rahman',
    icon: Linkedin,
    external: true,
  },
];

export default function Contact() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
      <Reveal>
        <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          Have a project, internship, or idea in mind?
        </h1>
        <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-stone-600">
          I'm open to internships and collaborations for Summer 2026. The fastest
          way to reach me is email; I usually reply within a day.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {CHANNELS.map((channel, i) => (
          <Reveal key={channel.label} delay={i * 0.08}>
            <motion.a
              href={channel.href}
              {...(channel.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="group block rounded-xl border border-stone-200 bg-white p-6 transition-colors hover:border-brg"
            >
              <channel.icon
                size={20}
                strokeWidth={1.75}
                className="text-brg"
              />
              <h2 className="mt-4 text-base font-semibold text-ink group-hover:text-brg">
                {channel.label}
              </h2>
              <p className="mt-1 break-all text-sm text-stone-500">{channel.value}</p>
            </motion.a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-12 rounded-xl bg-brg-soft p-6">
        <p className="text-sm leading-relaxed text-brg">
          Based in NYC, NY. Comfortable working remote or on site
          across the NY/NJ area.
        </p>
      </Reveal>
    </section>
  );
}
