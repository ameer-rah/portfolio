export default function WorkExperienceSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">Work Experience</h2>

      <div className="grid grid-cols-1 gap-8">
        
        <div
          id="werblin"
          className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg"
        >
          <div className="flex flex-col gap-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
              <h3 className="text-xl font-semibold">Werblin Recreation Center</h3>
              <span className="text-sm opacity-60">Present</span>
            </div>
            <p className="text-base font-medium text-primary/90">
              Supervisor
            </p>
            <p className="mt-2 text-sm/relaxed">
              Supervising operations at the{" "}
              <a
                href="https://recreation.rutgers.edu/facilities/werblin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Werblin Recreation Center at Rutgers University
              </a>
              , ensuring a safe and welcoming environment for students and staff.
            </p>
          </div>
        </div>

        
        <div
          id="runclub"
          className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg"
        >
          <div className="flex flex-col gap-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
              <h3 className="text-xl font-semibold">Rutgers Run Club</h3>
              <span className="text-sm opacity-60">Present</span>
            </div>
            <p className="text-base font-medium text-primary/90">
              Founder
            </p>
            <p className="mt-2 text-sm/relaxed">Founded and organized a student-led running community from the ground up, growing active membership to over 40 students within the first semester. Coordinated weekly group runs, health challenges, and social events to promote mental wellness and physical discipline. Designed and implemented a structured leadership pipeline, onboarding 5 club officers.</p>
          </div>
        </div>

        
        <div className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
              <h3 className="text-xl font-semibold">Redynox</h3>
              <span className="text-sm opacity-60">June 2025 – August 2025 · Remote</span>
            </div>
            <p className="text-base font-medium text-primary/90">
              Cybersecurity Intern
            </p>
            <div className="mt-2 flex flex-wrap gap-2 mb-2">
              <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">Wireshark</span>
              <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">OWASP ZAP</span>
              <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">Burp Suite</span>
              <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">Snort</span>
            </div>
            <p className="mt-1 text-sm/relaxed">Created a packet analysis pipeline using Wireshark to identify and catalog over 100 malicious traffic signatures, directly informing network security policy updates. Conducted manual and automated web application penetration tests with OWASP ZAP and Burp Suite, exploiting SQL Injection and XSS vulnerabilities to produce a comprehensive risk report. Designed custom Snort intrusion detection rules, reducing false positives by 15%.</p>
          </div>
        </div>

        
        <div className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
              <h3 className="text-xl font-semibold">Jasfel Analytics</h3>
              <span className="text-sm opacity-60">June 2025 – August 2025 · Newark, NJ</span>
            </div>
            <p className="text-base font-medium text-primary/90">
              Software Engineering Intern
            </p>
            <div className="mt-2 flex flex-wrap gap-2 mb-2">
              <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">Python</span>
              <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">Pandas</span>
              <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">Scikit-learn</span>
              <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">SHA-256</span>
            </div>
            <p className="mt-1 text-sm/relaxed">Developed a Python-based malware detection project automating SHA-256 hash comparisons against a database of 200+ malware samples, reducing manual triage time by 20%. Optimized data preprocessing pipelines with Pandas and Scikit-learn, cleaning datasets of over 50,000 entries to improve model training accuracy by 12%. Integrated cryptographic utilities into the ML workflow to enforce data integrity during feature extraction.</p>
          </div>
        </div>

        
        <div className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
              <h3 className="text-xl font-semibold">Michael Motazedi, C.P.A, P.C</h3>
              <span className="text-sm opacity-60">February 2024 – August 2024 · Jamaica, NY</span>
            </div>
            <p className="text-base font-medium text-primary/90">
              IT Intern
            </p>
            <div className="mt-2 flex flex-wrap gap-2 mb-2">
              <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">IT</span>
              <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">Network Security</span>
              <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">Hardware</span>
              <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">VPN</span>
            </div>
            <p className="mt-1 text-sm/relaxed">Diagnosed and resolved 50+ hardware and network issues, including reconfiguring routers and switches, improving internal system uptime by 35%. Overhauled firewall rule sets and automated patch management schedules, reducing weekly security alerts by 40%. Restructured the firm's VPN and access control protocols, enhancing remote connectivity stability for over 15 employees.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
