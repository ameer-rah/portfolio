import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import FilterDropdown from "../components/FilterDropdown";
import ProjectCard, { Project } from "../components/ProjectCard";
import GitHubChart from "../components/Git";
import { fetchUserRepos } from "../utils/githubApi";

const GITHUB_USERNAME = "ameer-rah";

const repoVideos: Record<string, string> = {
  "ai_object_detector": "/assets/projects/ai_detector.mp4",
  "gravity": "/assets/projects/gravity.mp4",
  "personal website": "/assets/projects/Personal%20Website.mp4",
  "personal-website": "/assets/projects/Personal%20Website.mp4",
  "ruplanner": "/assets/projects/RUPlanner.mp4",
};

const repoPdfs: Record<string, string> = {
  "vulnerability scanner report": "/assets/projects/Vulnerability%20Scanner%20Report.pdf",
  "vulnerability-scanner-report": "/assets/projects/Vulnerability%20Scanner%20Report.pdf",
};

const featuredProjects: Project[] = [
  {
    id: "ruplanner",
    title: "RUPlanner",
    description:
      "A full-stack degree planning app for Rutgers students with a custom prerequisite validation engine, PostgreSQL + Prisma ORM, Auth0 authentication, and Upstash Redis rate-limiting.",
    tags: ["TypeScript", "Next.js", "React", "PostgreSQL", "Prisma", "Auth0", "Redis"],
    githubLink: "https://github.com/ameer-rah/ruplanner",
    video: "/assets/projects/RUPlanner.mp4",
  },
  {
    id: "vulnerability-scanner",
    title: "Vulnerability Scanner Report",
    description:
      "Simulated penetration tests on a vulnerable network identifying 60+ exploitable CVEs (SQLi, XSS, CSRF, RMI RCE, OpenSSL CCS Injection). Scored 92/100 and used as a teaching aid.",
    tags: ["Nmap", "Metasploitable2", "Cybersecurity", "Penetration Testing"],
    pdf: "/assets/projects/Vulnerability Scanner Report.pdf",
  },
];

function repoToProject(repo: Awaited<ReturnType<typeof fetchUserRepos>>[number]): Project {
  const tags = [
    ...(repo.language ? [repo.language] : []),
    ...repo.topics,
  ];
  return {
    id: repo.name,
    title: repo.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: repo.description ?? "",
    tags,
    githubLink: repo.html_url,
    demoLink: repo.name.toLowerCase() === "portfolio" ? undefined : (repo.homepage || undefined),
    video: repoVideos[repo.name.toLowerCase()],
    pdf: repoPdfs[repo.name.toLowerCase()],
  };
}

export default function Projects() {
  const [repos, setRepos] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    fetchUserRepos(GITHUB_USERNAME)
      .then((data) => { setRepos(data.map(repoToProject)); setLoading(false); })
      .catch((err) => { setError(err instanceof Error ? err.message : "Failed to fetch"); setLoading(false); });
  }, []);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    repos.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [repos]);

  const filteredRepos = useMemo(() => {
    if (!selectedTag) return repos;
    return repos.filter((p) => p.tags.includes(selectedTag));
  }, [repos, selectedTag]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full"
    >
      <section className="py-28 md:py-40 px-8 md:px-16 lg:px-24 border-t border-surface-dark">
        <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-primary font-light mb-10">
          Projects
        </p>
        <h1
          className="font-display font-extralight text-adaptive leading-[0.88] mb-20 tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 8vw, 10rem)" }}
        >
          Current Projects
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              compact
              onClick={() => project.githubLink && window.open(project.githubLink, "_blank", "noopener noreferrer")}
            />
          ))}
        </div>
      </section>

      <section className="py-20 px-8 md:px-16 lg:px-24 border-t border-surface-dark">
        <GitHubChart username={GITHUB_USERNAME} />
      </section>

      <section className="py-28 md:py-40 px-8 md:px-16 lg:px-24 border-t border-surface-dark">
        <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-primary font-light mb-10">
          GitHub
        </p>
        <div className="flex items-end justify-between gap-6 mb-20">
          <h2
            className="font-display font-extralight text-adaptive leading-[0.88] tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 8vw, 10rem)" }}
          >
            All Repos
          </h2>
          {!loading && !error && (
            <div className="mb-2 shrink-0">
              <FilterDropdown
                options={availableTags}
                selectedOption={selectedTag}
                onSelect={setSelectedTag}
                label="Filter by Tag"
              />
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex items-center h-32">
            <div className="w-5 h-5 border border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="font-sans font-light text-red-400 text-[13px]">Error: {error}</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRepos.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => project.githubLink && window.open(project.githubLink, "_blank", "noopener noreferrer")}
              />
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
}
