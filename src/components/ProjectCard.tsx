import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
  video?: string;
  pdf?: string;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
  compact?: boolean;
  onClick?: (id: string) => void;
}

const ProjectCard = ({
  project,
  index = 0,
  compact = false,
  onClick,
}: ProjectCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 1.5;
  }, []);

  const handleCardClick = () => {
    if (onClick) {
      onClick(project.id);
    } else {
      window.location.href = `/projects/${project.id}`;
    }
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    url: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, "_blank", "noopener noreferrer");
  };

  const xOffset = index % 2 === 0 ? -60 : 60;

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.7, delay: (index % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer h-full"
      onClick={handleCardClick}
    >
      <div className="h-full border border-primary/10 hover:border-primary/35 transition-colors duration-500 flex flex-col">

        {/* Video banner */}
        {project.video && (
          <div className="w-full aspect-video overflow-hidden border-b border-primary/10">
            <video
              ref={videoRef}
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* PDF auto-scroll banner */}
        {project.pdf && !project.video && (
          <div className="w-full overflow-hidden border-b border-primary/10" style={{ height: "260px" }}>
            <div style={{ height: "2000px", animation: "pdfScroll 22s linear infinite" }}>
              <iframe
                src={`${project.pdf}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full border-0 pointer-events-none"
                title="PDF Preview"
              />
            </div>
          </div>
        )}

        <div className="p-8 flex flex-col gap-6 flex-1">

        {/* Title */}
        <h3 className="font-display font-light text-adaptive text-2xl leading-tight group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className={`font-sans font-light text-muted-adaptive text-[13px] leading-relaxed flex-1 ${compact ? "line-clamp-3" : "line-clamp-2"}`}>
          {project.description}
        </p>

        {/* Tags */}
        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-[10px] tracking-[0.15em] px-2.5 py-1 border border-primary/12 text-muted-adaptive"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer links */}
        <div className="flex items-center gap-5 pt-2 border-t border-primary/8">
          {project.githubLink && (
            <button
              onClick={(e) => handleLinkClick(e, project.githubLink!)}
              className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-adaptive hover:text-primary transition-colors duration-300 inline-flex items-center gap-2 cursor-pointer"
              aria-label={`View ${project.title} on GitHub`}
            >
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </button>
          )}

          {project.demoLink && (
            <button
              onClick={(e) => handleLinkClick(e, project.demoLink!)}
              className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-adaptive hover:text-primary transition-colors duration-300 inline-flex items-center gap-2 cursor-pointer"
              aria-label={`View ${project.title} live demo`}
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </button>
          )}

          <span className="ml-auto font-sans text-[10px] tracking-[0.2em] uppercase text-primary/0 group-hover:text-primary/60 transition-colors duration-300 inline-flex items-center gap-2">
            View
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
