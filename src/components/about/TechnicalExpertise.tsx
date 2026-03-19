import {
  SiGit, SiDocker, SiPython, SiJavascript, SiTypescript,
  SiReact, SiNextdotjs, SiNodedotjs, SiPostgresql, SiRedis,
  SiLinux, SiNumpy, SiPandas, SiGoogle, SiAuth0, SiPrisma,
  SiHtml5, SiScikitlearn, SiCplusplus,
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa";
import {
  LuShield, LuTerminal, LuGitBranch, LuActivity, LuScan,
  LuShieldAlert, LuBadgeCheck,
} from "react-icons/lu";
import type { IconType } from "react-icons";

type Skill = { name: string; Icon: IconType; href?: string };
type Category = { label: string; number: string; skills: Skill[] };

const categories: Category[] = [
  {
    label: "Cybersecurity & Deployment",
    number: "01",
    skills: [
      { name: "Git",        Icon: SiGit,         href: "https://git-scm.com" },
      { name: "Docker",     Icon: SiDocker,      href: "https://www.docker.com" },
      { name: "CI/CD",      Icon: LuGitBranch,   href: "https://github.com/features/actions" },
      { name: "OWASP",      Icon: LuShield,      href: "https://owasp.org" },
      { name: "Metasploit", Icon: LuTerminal,    href: "https://www.metasploit.com" },
      { name: "Wireshark",  Icon: LuActivity,    href: "https://www.wireshark.org" },
      { name: "Nmap",       Icon: LuScan,        href: "https://nmap.org" },
      { name: "Snort",      Icon: LuShieldAlert, href: "https://www.snort.org" },
      { name: "AWS",        Icon: FaAws,         href: "https://aws.amazon.com" },
      { name: "Linux",      Icon: SiLinux,       href: "https://www.linux.org" },
    ],
  },
  {
    label: "Software Development",
    number: "02",
    skills: [
      { name: "Python",       Icon: SiPython,      href: "https://www.python.org" },
      { name: "Java",         Icon: FaJava,        href: "https://www.java.com" },
      { name: "JavaScript",   Icon: SiJavascript,  href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "TypeScript",   Icon: SiTypescript,  href: "https://www.typescriptlang.org" },
      { name: "C / C++",      Icon: SiCplusplus,   href: "https://isocpp.org" },
      { name: "HTML / CSS",   Icon: SiHtml5,       href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "React",        Icon: SiReact,       href: "https://react.dev" },
      { name: "Next.js",      Icon: SiNextdotjs,   href: "https://nextjs.org" },
      { name: "Node.js",      Icon: SiNodedotjs,   href: "https://nodejs.org" },
      { name: "NumPy",        Icon: SiNumpy,       href: "https://numpy.org" },
      { name: "Pandas",       Icon: SiPandas,      href: "https://pandas.pydata.org" },
      { name: "Scikit-learn", Icon: SiScikitlearn, href: "https://scikit-learn.org" },
      { name: "PostgreSQL",   Icon: SiPostgresql,  href: "https://www.postgresql.org" },
      { name: "Prisma",       Icon: SiPrisma,      href: "https://www.prisma.io" },
      { name: "Redis",        Icon: SiRedis,       href: "https://redis.io" },
      { name: "Auth0",        Icon: SiAuth0,       href: "https://auth0.com" },
    ],
  },
  {
    label: "Certifications",
    number: "03",
    skills: [
      { name: "CompTIA Security+",     Icon: LuBadgeCheck, href: "https://www.comptia.org/certifications/security" },
      { name: "Google Cybersecurity",  Icon: SiGoogle,     href: "https://grow.google/certificates/cybersecurity" },
      { name: "Google Data Analytics", Icon: SiGoogle,     href: "https://grow.google/certificates/data-analytics" },
    ],
  },
];

function SkillTag({ skill }: { skill: Skill }) {
  const inner = (
    <>
      <skill.Icon
        size={13}
        className="text-primary/40 group-hover:text-primary/75 transition-colors duration-300 shrink-0"
      />
      <span className="font-sans text-[11px] tracking-[0.08em] whitespace-nowrap">
        {skill.name}
      </span>
    </>
  );

  const cls =
    "flex items-center gap-2 px-4 py-2.5 border border-primary/10 text-muted-adaptive hover:border-primary/35 hover:text-adaptive transition-all duration-300 group";

  return skill.href ? (
    <a href={skill.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <div className={`${cls} cursor-default`}>{inner}</div>
  );
}

function MarqueeRow({
  skills,
  direction,
  speed = 28,
}: {
  skills: Skill[];
  direction: "left" | "right";
  speed?: number;
}) {
  const filled = Array.from({ length: 10 }, () => skills).flat();
  return (
    <div className="overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-background-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-background-dark to-transparent z-10 pointer-events-none" />
      <div
        className={direction === "left" ? "marquee-left" : "marquee-right"}
        style={{ animationDuration: `${speed}s` }}
      >
        {filled.map((skill, i) => (
          <SkillTag key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export default function TechnicalExpertiseSection() {
  return (
    <section className="w-full py-20 md:py-36 px-6 sm:px-10 md:px-16 lg:px-24 border-t border-surface-dark">
      <h2
        className="font-display font-extralight text-adaptive leading-[0.88] mb-20 md:mb-32 tracking-tight"
        style={{ fontSize: "clamp(3rem, 8vw, 10rem)" }}
      >
        Technical Expertise
      </h2>

      <div className="space-y-20 md:space-y-28">
        {categories.map((cat) => {
          const mid = Math.ceil(cat.skills.length / 2);
          const row1 = cat.skills.slice(0, mid);
          const row2 = cat.skills.slice(mid).length > 0
            ? cat.skills.slice(mid)
            : cat.skills; // fallback: reuse all for short lists

          return (
            <div key={cat.label} className="flex flex-col md:flex-row md:gap-0">
              <div className="mb-6 md:mb-0 md:w-56 lg:w-64 shrink-0">
                <div className="md:sticky md:top-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-4 h-px bg-primary/40" />
                    <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-primary/50 font-light">
                      {cat.number}
                    </span>
                  </div>
                  <h3 className="font-display font-light text-adaptive text-xl md:text-2xl leading-snug">
                    {cat.label}
                  </h3>
                </div>
              </div>

              <div className="flex-1 border-t border-primary/10 pt-6 md:border-t-0 md:pt-0 md:border-l md:border-primary/10 md:pl-0 overflow-hidden marquee-container">
                <div className="space-y-2">
                  <MarqueeRow skills={row1} direction="left"  speed={30} />
                  <MarqueeRow skills={row2} direction="right" speed={30} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
