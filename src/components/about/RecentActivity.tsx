import { useEffect, useRef } from "react";

export default function RecentActivity() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 1.5;
  }, []);

  return (
    <section className="w-full py-28 md:py-40 px-8 md:px-16 lg:px-24 border-t border-[#111111]">
      {/* Live indicator */}
      <div className="flex items-center gap-4 mb-10">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
        </span>
        <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-primary/50 font-light">Live</span>
      </div>

      {/* Massive heading */}
      <h2
        className="font-display font-extralight text-adaptive leading-[0.88] mb-20 tracking-tight"
        style={{ fontSize: "clamp(3.5rem, 8vw, 10rem)" }}
      >
        Currently Building
      </h2>

      {/* Project — editorial card */}
      <div className="border-t border-primary/10 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-20">
          {/* Left — metadata */}
          <div className="space-y-6">
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 border border-primary/20 text-primary inline-block">
              In Development
            </span>
            <div className="space-y-2">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-adaptive font-light">
                Rutgers University
              </p>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-adaptive font-light">
                Next.js · PostgreSQL
              </p>
            </div>
            <video
              ref={videoRef}
              src="/assets/About/RUPlanner.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto opacity-90"
            />
          </div>

          {/* Right — content */}
          <div className="space-y-6">
            <h3
              className="font-display font-extralight text-adaptive leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 4.5rem)" }}
            >
              RUPlanner
            </h3>
            <p className="font-sans font-light text-muted-adaptive leading-relaxed text-[15px] max-w-2xl">
              A full-stack degree planning tool for Rutgers students. Features a custom
              prerequisite validation engine, PostgreSQL-backed course management with
              Prisma ORM, secure Auth0 authentication, and rate-limiting via Upstash Redis.
              Students can dynamically build error-checked semester plans that respect
              complex prerequisite chains and degree requirements.
            </p>
            <a
              href="https://github.com/ameer-rah/ruplanner"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.3em] uppercase text-primary hover:text-primary/70 transition-colors duration-300 pt-2"
            >
              View on GitHub
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
