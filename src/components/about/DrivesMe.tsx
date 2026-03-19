import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function WhatDrivesMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-end overflow-hidden"
    >
      {/* Full-bleed background image with parallax */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y: imgY }}>
        <img
          src="/assets/About/whatDrivesMe.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover scale-[1.15]"
          onError={(e) => {
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent) parent.style.backgroundColor = "#080808";
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </motion.div>

      {/* Dark gradient — heavier at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/97 via-[#000000]/60 to-[#000000]/20 pointer-events-none" />

      {/* Content — pinned to bottom-left */}
      <div className="relative z-10 px-8 md:px-16 lg:px-24 pb-24 md:pb-36 pt-48">
        {/* Pull quote — cinematic large */}
        <blockquote
          className="font-display font-extralight text-white leading-[1.05] italic mb-6 max-w-5xl"
          style={{ fontSize: "clamp(2.2rem, 5vw, 6rem)" }}
        >
          "I had a purpose before everyone had an opinion"
        </blockquote>

        <cite className="font-sans text-[10px] tracking-[0.35em] uppercase text-primary/60 font-light not-italic mb-16 block">
          — Jalen Hurts
        </cite>

        {/* Three paragraphs in a grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mt-12">
          <p className="font-sans font-light text-[#888888] leading-relaxed text-[14px]">
            I'm a first-generation college student studying Computer Science at Rutgers
            University with a minor in Critical Intelligence Studies. My work lives at the
            intersection of software engineering and security — building things that matter
            while making sure they're built right.
          </p>
          <p className="font-sans font-light text-[#888888] leading-relaxed text-[14px]">
            That drive took me through two internships in the same summer: developing a
            Python-based malware detection pipeline at Jasfel Analytics, and running
            penetration tests with Burp Suite and OWASP ZAP at Redynox. I don't just want
            to write code — I want to understand how it can break and how to make it stronger.
          </p>
          <p className="font-sans font-light text-[#888888] leading-relaxed text-[14px]">
            Whether I'm architecting RUPlanner's prerequisite validation engine, cataloging
            CVEs in a pen test report, or founding the Rutgers Run Club, I bring the same
            energy: try hard, build something real, and make it count.
          </p>
        </div>
      </div>
    </section>
  );
}

export function WhoDrivesMe() {
  return null;
}
