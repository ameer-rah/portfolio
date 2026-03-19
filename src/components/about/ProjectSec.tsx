import { Link } from "react-router-dom";
import ProjectCard, { Project as ProjectType } from "../ProjectCard";

export default function ProjectsSection({
  projects,
  loading,
  error,
}: {
  projects: ProjectType[];
  loading: boolean;
  error: string | null;
}) {
  return (
    <section className="w-full py-28 md:py-40 px-8 md:px-16 lg:px-24 border-t border-[#111111]">
      <div className="flex items-center justify-end mb-10">
        <Link
          to="/projects"
          className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-adaptive hover:text-primary transition-colors duration-300 inline-flex items-center gap-2"
        >
          All projects
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* Massive heading */}
      <h2
        className="font-display font-extralight text-adaptive leading-[0.88] mb-8 tracking-tight"
        style={{ fontSize: "clamp(3.5rem, 8vw, 10rem)" }}
      >
        Current Projects
      </h2>

      <p className="font-sans font-light text-muted-adaptive leading-relaxed text-[15px] mb-20 max-w-2xl">
        Building meaningful projects is how I translate ideas into reality. Each project
        represents a problem worth solving or a question worth exploring.
      </p>

      {loading ? (
        <div className="flex items-center h-32">
          <div className="w-5 h-5 border border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="border border-red-900/30 p-6 text-red-400 font-sans font-light text-[13px]">
          <p>Error: {error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              compact={true}
            />
          ))}
        </div>
      )}
    </section>
  );
}
