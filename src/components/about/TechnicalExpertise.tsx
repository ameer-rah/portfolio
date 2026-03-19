export default function TechnicalExpertiseSection() {
  const categories = [
    {
      label: "Cybersecurity & Deployment",
      skills: ["Git", "Docker", "CI/CD", "OWASP", "Metasploit", "Wireshark", "Nmap", "Snort", "AWS", "Linux"],
    },
    {
      label: "Software Development",
      skills: ["Python", "Java", "JavaScript", "TypeScript", "C/C++", "HTML/CSS", "React", "Next.js", "Node.js", "NumPy", "Pandas", "Scikit-learn", "PostgreSQL", "Prisma", "Redis", "Auth0"],
    },
    {
      label: "Certifications",
      skills: ["CompTIA Security+", "Google Cybersecurity", "Google Data Analytics"],
    },
  ];

  return (
    <section className="w-full py-28 md:py-40 px-8 md:px-16 lg:px-24 border-t border-[#111111]">
      {/* Massive heading */}
      <h2
        className="font-display font-extralight text-adaptive leading-[0.88] mb-24 tracking-tight"
        style={{ fontSize: "clamp(3.5rem, 8vw, 10rem)" }}
      >
        Technical Expertise
      </h2>

      <div className="space-y-16">
        {categories.map((cat) => (
          <div key={cat.label}>
            {/* Category label */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-5 h-px bg-primary/40" />
              <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-primary/60 font-light">
                {cat.label}
              </span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-3">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-sans text-[11px] tracking-[0.08em] px-4 py-2 border border-primary/10 text-muted-adaptive hover:border-primary/35 hover:text-adaptive transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
