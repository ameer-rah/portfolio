import { motion } from "framer-motion";
import { useEffect } from "react";
import "react-medium-image-zoom/dist/styles.css";

import { Project as ProjectType } from "../components/ProjectCard";
import { WhatDrivesMe } from "../components/about/DrivesMe";
import TLDR from "../components/tldr";
import AboutSection from "../components/about/AboutSec";
import ProjectsSection from "../components/about/ProjectSec";
import WorkExperienceSection from "../components/about/WorkExperience";
import EducationSection from "../components/about/Education";
import TechnicalExpertiseSection from "../components/about/TechnicalExpertise";
import RecentActivity from "../components/about/RecentActivity";
import ImportantDocuments from "../components/about/ImportantDocuments";
import GitHubChart from "../components/Git";

const featuredProjects: ProjectType[] = [
  {
    id: "ruplanner",
    title: "RUPlanner",
    description:
      "A full-stack degree planning app for Rutgers students with a custom prerequisite validation engine, PostgreSQL + Prisma ORM, Auth0 authentication, and Upstash Redis rate-limiting.",
    tags: ["TypeScript", "Next.js", "React", "PostgreSQL", "Prisma", "Auth0", "Redis"],
    githubLink: "https://github.com/ameer-rah/ruplanner",
  },
  {
    id: "vulnerability-scanner",
    title: "Vulnerability Scanner Report",
    description:
      "Simulated penetration tests on a vulnerable network identifying 60+ exploitable CVEs (SQLi, XSS, CSRF, RMI RCE, OpenSSL CCS Injection). Scored 92/100 and used as a teaching aid.",
    tags: ["Nmap", "Metasploitable2", "Cybersecurity", "Penetration Testing"],
  },
];

export default function About() {
  useEffect(() => {
    document.documentElement.classList.add("color-scheme-adaptive");
    return () => {
      document.documentElement.classList.remove("color-scheme-adaptive");
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-16 pb-12 w-full"
    >
      <TLDR />
      <ImportantDocuments />
      <RecentActivity />
      <AboutSection />
      <WorkExperienceSection />
      <EducationSection />
      <GitHubChart username="ameer-rah" />
      <ProjectsSection
        projects={featuredProjects}
        loading={false}
        error={null}
      />
      <WhatDrivesMe />
      <TechnicalExpertiseSection />
    </motion.div>
  );
}
