export default function AboutSection() {
  return (
    <section className="relative">
      
      <div className="space-y-6">
        <div className="prose prose-adaptive prose-lg max-w-none">
          <p className="text-xl leading-relaxed">
            I'm passionate about solving difficult, thought-provoking problems
            at the intersection of software development and security engineering.
            Whether I'm building platforms to help students or mitigating risks
            in systems, I focus on creating solutions that make a real impact.
          </p>

          <p className="text-lg leading-relaxed">
            At my core, I believe in trying my absolute hardest in every facet
            of life. This philosophy extends to my academic pursuits as a first-generation
            student, my work supervising at the Werblin Recreation Center, leading as
            founder of the Rutgers Run Club, and building RUPlanner to help Rutgers students
            plan their academic journey. I'm constantly seeking to learn and grow —
            not for personal accolades, but because I genuinely believe that becoming the
            best version of myself allows me to better serve those around me.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 rounded-xl border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]">
            <h3 className="text-xl font-semibold mb-3">Tech Focus</h3>
            <p className="text-sm/relaxed">
              Software development and security engineering. Building AI-powered
              solutions and platforms that help students navigate their academic journey.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]">
            <h3 className="text-xl font-semibold mb-3">Leadership</h3>
            <p className="text-sm/relaxed">
              Co-president of the Rutgers Run Club, building community and organizing
              events for runners across campus. Supervising at the Werblin Recreation Center.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]">
            <h3 className="text-xl font-semibold mb-3">Building</h3>
            <p className="text-sm/relaxed">
              Currently building RUPlanner, a full-stack degree planning app for Rutgers students with
              prerequisite validation, Auth0 authentication, and PostgreSQL-backed course planning.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
