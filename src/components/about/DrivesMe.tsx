export function WhatDrivesMe() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">What Drives Me</h2>

      <div className="relative">
        
        <div className="pl-6 border-l-4 border-primary py-1">
          <p className="text-xl italic font-light">
            "I had a purpose before everyone had an opinion" - Jalen Hurts
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-4">
            <p className="leading-relaxed">
              I'm a first-generation college student studying Computer Science at Rutgers University
              with a minor in Critical Intelligence Studies. My work lives at the intersection of
              software engineering and security — building things that matter while making sure they're
              built right.
            </p>

            <p className="leading-relaxed">
              That drive took me through two internships in the same summer: developing a Python-based
              malware detection pipeline at Jasfel Analytics, and running penetration tests with Burp
              Suite and OWASP ZAP at Redynox. I don't just want to write code — I want to understand
              how it can break and how to make it stronger.
            </p>

            <p className="leading-relaxed">
              Whether I'm architecting RUPlanner's prerequisite validation engine, cataloging CVEs
              in a pen test report, or founding the Rutgers Run Club, I bring the same energy:
              try hard, build something real, and make it count.
            </p>
          </div>

          
          <div className="relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-tr from-[color-mix(in_oklch,var(--color-primary)_20%,transparent)] to-transparent z-10"></div>
            <img
              src="/assets/About/pos.jpg"
              alt="Ameer Rahman"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).parentElement!.classList.add(
                  "bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]",
                );
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhoDrivesMe() {
  return null;
}
