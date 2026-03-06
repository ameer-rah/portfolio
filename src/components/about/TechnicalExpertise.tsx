export default function TechnicalExpertiseSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">Technical Expertise</h2>

      <div className="space-y-6">
          
          <div>
            <h4 className="font-medium mb-3">Cybersecurity and Deployment</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Git", "Docker", "CI/CD", "OWASP", "Burp Suite",
                "Metasploit", "Wireshark", "Nmap", "Snort", "AWS", "Linux",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs rounded-md bg-[color-mix(in_oklch,var(--color-primary)_8%,transparent)] border border-[color-mix(in_oklch,var(--color-primary)_12%,transparent)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          
          <div>
            <h4 className="font-medium mb-3">Software Development</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Python", "Java", "JavaScript", "TypeScript", "C/C++", "HTML/CSS",
                "React", "Next.js", "Node.js", "NumPy", "Pandas", "Scikit-learn",
                "PostgreSQL", "Prisma", "Redis", "Auth0",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs rounded-md bg-[color-mix(in_oklch,var(--color-primary)_8%,transparent)] border border-[color-mix(in_oklch,var(--color-primary)_12%,transparent)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          
          <div>
            <h4 className="font-medium mb-3">Certifications</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "CompTIA Security+",
                "Google Cybersecurity",
                "Google Data Analytics",
              ].map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1.5 text-xs rounded-md bg-[color-mix(in_oklch,var(--color-primary)_8%,transparent)] border border-[color-mix(in_oklch,var(--color-primary)_12%,transparent)]"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
      </div>
    </section>
  );
}
