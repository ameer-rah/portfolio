import { motion } from "framer-motion";

interface WordFadeProps {
  text: string;
  className?: string;
  /** Extra delay before the first word starts (seconds) */
  delay?: number;
  /** Time between each word appearing (seconds) */
  stagger?: number;
}

/**
 * Replicates the Mercedes-Maybach `.brandhub-word-fade` effect:
 * splits text into individual words and fades each one in sequentially
 * as the element scrolls into view.
 */
export default function WordFade({
  text,
  className = "",
  delay = 0,
  stagger = 0.055,
}: WordFadeProps) {
  const words = text.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const word = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.span
      /* matches .brandhub-word-fade: flex row wrap */
      className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%" }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={word} className="inline-block">
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}
