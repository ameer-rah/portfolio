export default function EducationSection() {
  const schools = [
    {
      id: "education",
      photo: "/assets/About/rutgers.jpg",
      logo: "/assets/About/rutgers-logo.svg",
      logoAlt: "Rutgers Logo",
      logoFallback: "RU",
      name: "Rutgers University – New Brunswick",
      degree: "Bachelor of Science, Computer Science",
      subDegree: "Minor in Critical Intelligence Studies",
      period: "Expected May 2027",
      gpa: "3.4 GPA",
      details: [
        {
          label: "Relevant Coursework",
          value: "Computer Architecture, Data Structures, Software Methodology, Systems Programming, Principles of Programming Languages",
        },
      ],
    },
    {
      id: "cuny",
      photo: "/assets/About/ccny.jpg",
      logo: "/assets/About/ccny logo.png",
      logoAlt: "CUNY City College Logo",
      logoFallback: "CC",
      name: "CUNY City College of New York",
      degree: null,
      subDegree: null,
      period: "Fall 2023 – Transferred May 2024",
      gpa: "4.0 GPA",
      details: [
        {
          label: "Academic Honors",
          value: "Dean's List — Fall 2023 & Spring 2024",
        },
      ],
    },
  ];

  return (
    <section className="w-full py-28 md:py-40 px-8 md:px-16 lg:px-24 border-t border-[#111111]">
      {/* Massive heading */}
      <h2
        className="font-display font-extralight text-adaptive leading-[0.88] mb-20 tracking-tight"
        style={{ fontSize: "clamp(3.5rem, 8vw, 10rem)" }}
      >
        Education
      </h2>

      <div className="space-y-0">
        {schools.map((school, i) => (
          <div
            key={school.id}
            id={school.id}
            className={`py-12 md:py-14 ${i > 0 ? "border-t border-primary/8" : ""}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-20">
              {/* Left — campus photo + GPA */}
              <div className="flex flex-col gap-4">
                <div className="relative w-full aspect-4/3 overflow-hidden">
                  <img
                    src={school.photo}
                    alt={school.logoAlt}
                    className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity duration-500"
                  />
                  {/* Subtle dark vignette */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                </div>
                <span className="font-sans text-[10px] tracking-[0.2em] text-primary border border-primary/20 px-2.5 py-1 w-fit">
                  {school.gpa}
                </span>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-primary/60 font-light">
                  {school.period}
                </p>
              </div>

              {/* Right — content */}
              <div className="space-y-4">
                <h3
                  className="font-display font-extralight text-adaptive leading-tight"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)" }}
                >
                  {school.name}
                </h3>

                {school.degree && (
                  <p className="font-sans text-[12px] tracking-[0.1em] text-adaptive font-light">
                    {school.degree}
                  </p>
                )}
                {school.subDegree && (
                  <p className="font-sans text-[12px] text-muted-adaptive font-light">
                    {school.subDegree}
                  </p>
                )}

                <div className="pt-3 space-y-3">
                  {school.details.map((d) => (
                    <div key={d.label} className="flex items-start gap-3">
                      <div className="w-3 h-px bg-primary/40 mt-2 shrink-0" />
                      <div>
                        <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-muted-adaptive font-light block mb-1">
                          {d.label}
                        </span>
                        <p className="font-sans font-light text-muted-adaptive text-[13px] leading-relaxed">
                          {d.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
