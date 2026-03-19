export default function AboutSection() {
  return (
    <section className="w-full py-28 md:py-40 px-8 md:px-16 lg:px-24 border-t border-[#111111]">
      {/* Massive heading */}
      <h2
        className="font-display font-extralight text-adaptive leading-[0.88] mb-20 tracking-tight"
        style={{ fontSize: "clamp(3.5rem, 8vw, 10rem)" }}
      >
        About
      </h2>

      {/* Editorial two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mb-24">
        <p className="font-sans font-light text-muted-adaptive leading-relaxed text-[15px]">
          I'm passionate about solving difficult, thought-provoking problems
          at the intersection of software development and security engineering.
          Whether I'm building platforms to help students or mitigating risks
          in systems, I focus on creating solutions that make a real impact.
        </p>
        <p className="font-sans font-light text-muted-adaptive leading-relaxed text-[15px]">
          At my core, I believe in trying my absolute hardest in every facet
          of life. This philosophy extends to my academic pursuits as a first-generation
          student, my work supervising at the Werblin Recreation Center, leading as
          founder of the Rutgers Run Club, and building RUPlanner to help Rutgers
          students plan their academic journey.
        </p>
      </div>

      {/* Three focus areas — full-width editorial grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-primary/8">
        {[
          {
            title: "Tech Focus",
            body: "Software development and security engineering. Building AI-powered solutions and platforms that help students navigate their academic journey.",
          },
          {
            title: "Leadership",
            body: "Founder of the Rutgers Run Club, building community and organizing events for runners across campus. Supervising at the Werblin Recreation Center.",
          },
          {
            title: "Building",
            body: "Currently building RUPlanner — a full-stack degree planning app with prerequisite validation, Auth0 authentication, and PostgreSQL-backed course planning.",
          },
        ].map((item, i) => (
          <div
            key={item.title}
            className={`py-12 pr-12 space-y-5 ${i < 2 ? "md:border-r border-primary/8" : ""} ${i > 0 ? "md:pl-12" : ""}`}
          >
            <div className="w-6 h-px bg-primary" />
            <h3
              className="font-display font-extralight text-adaptive"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
            >
              {item.title}
            </h3>
            <p className="font-sans font-light text-muted-adaptive text-[13px] leading-relaxed">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
