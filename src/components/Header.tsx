import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import WordFade from "./WordFade";

export default function Header() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], ["0px", "-80px"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#000000] overflow-hidden"
    >
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y: imgY }}>
        <img
          src="/assets/about/pos.jpg"
          alt=""
          aria-hidden="true"
          style={{ opacity: 0.65 }}
          className="w-full h-full object-cover object-top scale-[1.08]"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-transparent to-[#000000]/85 pointer-events-none" />

      <motion.div
        className="absolute px-8 md:px-16 lg:px-24 w-full"
        style={{ bottom: "10%", y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="space-y-6"
        >
          <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-primary font-light">
            Portfolio · 2026
          </p>

          <h1
            className="font-display font-extralight text-[#F0EDE8] leading-[0.88]"
            style={{ fontSize: "clamp(4rem, 9vw, 11rem)" }}
          >
            <WordFade text="Ameer Rahman" delay={0.15} stagger={0.12} />
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#666666] font-light">
              Student&nbsp;·&nbsp;Cybersecurity&nbsp;·&nbsp;Software Developer
            </p>

            <div className="flex items-center gap-6">
              <a href="https://x.com/uhhhhmeer" target="_blank" rel="noopener noreferrer"
                className="text-[#444444] hover:text-primary transition-colors duration-300" title="X">
                <span className="sr-only">X</span>
                <svg className="w-3.5 h-3.5" role="img" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
              <a href="https://github.com/ameer-rah" target="_blank" rel="noopener noreferrer"
                className="text-[#444444] hover:text-primary transition-colors duration-300" title="GitHub">
                <span className="sr-only">GitHub</span>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="https://linkedin.com/in/ameer-rahman" target="_blank" rel="noopener noreferrer"
                className="text-[#444444] hover:text-primary transition-colors duration-300" title="LinkedIn">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute right-8 md:right-16 bottom-10 flex flex-col items-center gap-2"
        style={{ opacity: contentOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#444444] font-light [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="w-px h-12 bg-primary/20" />
      </motion.div>
    </section>
  );
}
