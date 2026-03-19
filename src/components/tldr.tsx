export default function TLDR() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="w-full py-28 md:py-40 px-8 md:px-16 lg:px-24 border-t border-surface-dark">
      <h2
        className="font-display font-extralight text-adaptive leading-[0.88] mb-20 tracking-tight"
        style={{ fontSize: "clamp(3.5rem, 8vw, 10rem)" }}
      >
        At a Glance
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl">
        <div className="space-y-5">
          <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-primary font-light mb-6">
            Currently
          </p>
          <p className="font-sans font-light text-muted-adaptive leading-relaxed text-[15px]">
            Studying{" "}
            <button
              onClick={() => scrollToSection("education")}
              className="text-adaptive hover:text-primary transition-colors underline underline-offset-4 decoration-primary/30 cursor-pointer font-light"
            >
              Computer Science at Rutgers University
            </button>
            , supervising at the{" "}
            <button
              onClick={() => scrollToSection("werblin")}
              className="text-adaptive hover:text-primary transition-colors underline underline-offset-4 decoration-primary/30 cursor-pointer font-light"
            >
              Werblin Recreation Center
            </button>
            , founder of{" "}
            <button
              onClick={() => scrollToSection("runclub")}
              className="text-adaptive hover:text-primary transition-colors underline underline-offset-4 decoration-primary/30 cursor-pointer font-light"
            >
              the Rutgers Run Club
            </button>
            , and{" "}
            <a
              href="/reading-list"
              className="text-adaptive hover:text-primary transition-colors underline underline-offset-4 decoration-primary/30 font-light"
            >
              reading
            </a>
            .
          </p>

          <a
            href="https://github.com/ameer-rah/ruplanner"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 flex items-center gap-4 border border-primary/10 hover:border-primary/30 px-5 py-4 transition-colors duration-500 w-fit"
          >
            <img
              src="/assets/projects/RUPlanner_logo.png"
              alt="RUPlanner logo"
              className="h-7 w-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div>
              <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-primary font-light">
                Building
              </p>
              <p className="font-display font-light text-adaptive text-lg leading-tight">
                RUPlanner
              </p>
            </div>
            <svg className="w-3 h-3 text-primary/40 group-hover:text-primary ml-2 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        <div className="space-y-5">
          <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-primary font-light mb-6">
            Off the Clock
          </p>
          <p className="font-sans font-light text-muted-adaptive leading-relaxed text-[15px]">
            Hosting car shows, going to the gym with friends, and working on side projects.
          </p>
        </div>
      </div>
    </section>
  );
}
