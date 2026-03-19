import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

interface Role {
  id: string;
  company: string;
  title: string;
  period: string;
  location: string;
  tags: string[];
  body: ReactNode;
}

const roles: Role[] = [
  {
    id: "werblin",
    company: "Werblin Recreation Center",
    title: "Supervisor",
    period: "Present",
    location: "Rutgers University",
    tags: [],
    body: (
      <>
        Supervising operations at the{" "}
        <a
          href="https://recreation.rutgers.edu/facilities/werblin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-adaptive hover:text-primary transition-colors underline underline-offset-4 decoration-primary/30"
        >
          Werblin Recreation Center at Rutgers University
        </a>
        , ensuring a safe and welcoming environment for students and staff.
      </>
    ),
  },
  {
    id: "runclub",
    company: "Rutgers Run Club",
    title: "Founder",
    period: "Present",
    location: "Rutgers University",
    tags: [],
    body: "Founded and organized a student-led running community from the ground up, growing active membership to over 40 students within the first semester. Coordinated weekly group runs, health challenges, and social events to promote mental wellness and physical discipline. Designed and implemented a structured leadership pipeline, onboarding 5 club officers.",
  },
  {
    id: "redynox",
    company: "Redynox",
    title: "Cybersecurity Intern",
    period: "June 2025 – August 2025",
    location: "Remote",
    tags: ["Wireshark", "OWASP ZAP", "Burp Suite", "Snort"],
    body: "Created a packet analysis pipeline using Wireshark to identify and catalog over 100 malicious traffic signatures, directly informing network security policy updates. Conducted manual and automated web application penetration tests with OWASP ZAP and Burp Suite, exploiting SQL Injection and XSS vulnerabilities to produce a comprehensive risk report. Designed custom Snort intrusion detection rules, reducing false positives by 15%.",
  },
  {
    id: "jasfel",
    company: "Jasfel Analytics",
    title: "Software Engineering Intern",
    period: "June 2025 – August 2025",
    location: "Newark, NJ",
    tags: ["Python", "Pandas", "Scikit-learn", "SHA-256"],
    body: "Developed a Python-based malware detection project automating SHA-256 hash comparisons against a database of 200+ malware samples, reducing manual triage time by 20%. Optimized data preprocessing pipelines with Pandas and Scikit-learn, cleaning datasets of over 50,000 entries to improve model training accuracy by 12%. Integrated cryptographic utilities into the ML workflow to enforce data integrity during feature extraction.",
  },
  {
    id: "motazedi",
    company: "Michael Motazedi, C.P.A",
    title: "IT Intern",
    period: "February 2024 – August 2024",
    location: "Jamaica, NY",
    tags: ["IT", "Network Security", "Hardware", "VPN"],
    body: "Diagnosed and resolved 50+ hardware and network issues, including reconfiguring routers and switches, improving internal system uptime by 35%. Overhauled firewall rule sets and automated patch management schedules, reducing weekly security alerts by 40%. Restructured the firm's VPN and access control protocols, enhancing remote connectivity stability for over 15 employees.",
  },
];

function RoleEntry({ role, index }: { role: Role; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      id={role.id}
      className="border-t border-primary/8 pt-10 pb-14 md:pt-14 md:pb-20 grid grid-cols-[2.5rem_1fr] sm:grid-cols-[4rem_1fr] md:grid-cols-[5.5rem_1fr] gap-x-6 md:gap-x-10 lg:gap-x-14"
    >
      {/* Left gutter — index number */}
      <div className="pt-1">
        <span className="font-sans text-[10px] tracking-[0.3em] text-primary/35 font-light tabular-nums select-none">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Right — content */}
      <div className="space-y-5">
        {/* Company name */}
        <h3
          className="font-display font-extralight text-adaptive leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(1.9rem, 4.5vw, 5rem)" }}
        >
          {role.company}
        </h3>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-primary font-light">
            {role.title}
          </span>
          <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-muted-adaptive font-light">
            {role.period}
          </span>
          {role.location && (
            <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-muted-adaptive font-light">
              {role.location}
            </span>
          )}
        </div>

        {/* Thin gold rule */}
        <div className="gold-rule opacity-20" />

        {/* Body */}
        <p className="font-sans font-light text-muted-adaptive leading-relaxed text-[14px] max-w-2xl">
          {role.body}
        </p>

        {/* Tags */}
        {role.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {role.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-[10px] tracking-widest px-2.5 py-1 border border-primary/12 text-muted-adaptive"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function WorkExperienceSection() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-10%" });

  return (
    <section className="w-full">
      {/* ── Hero ── */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 32 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="px-8 md:px-16 lg:px-24 pt-28 md:pt-40 pb-16 md:pb-24"
      >
        {/* Eyebrow */}
        <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-primary font-light mb-10">
          Career
        </p>

        {/* Massive headline */}
        <h2
          className="font-display font-extralight text-adaptive leading-[0.88] tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 9vw, 11rem)" }}
        >
          Work
          <br />
          Experience
        </h2>

        {/* Stats row */}
        <div className="mt-14 md:mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t border-primary/8 pt-10">
          {[
            { value: "5", label: "Roles" },
            { value: "3", label: "Industries" },
            { value: "3", label: "Internships" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p
                className="font-display font-extralight text-adaptive leading-none"
                style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
              >
                {value}
              </p>
              <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-muted-adaptive font-light mt-2">
                {label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Roles ── */}
      <div className="px-8 md:px-16 lg:px-24 pb-4">
        {roles.map((role, i) => (
          <RoleEntry key={role.id} role={role} index={i} />
        ))}
      </div>

      {/* ── Terminal CTA ── */}
      <motion.div
        ref={ctaRef}
        initial={{ opacity: 0, y: 28 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="border-t border-primary/8 px-8 md:px-16 lg:px-24 py-20 md:py-32"
      >
        <h3
          className="font-display font-extralight text-adaptive leading-[0.88] tracking-tight mb-10"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 7rem)" }}
        >
          Let's build
          <br />
          something.
        </h3>
        <a
          href="https://github.com/ameer-rah"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.25em] uppercase text-adaptive border border-primary/20 hover:border-primary/60 px-6 py-3 transition-colors duration-500 group"
        >
          View GitHub
          <svg
            className="w-3 h-3 text-primary/40 group-hover:text-primary transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
