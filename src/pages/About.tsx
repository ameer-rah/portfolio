import { motion } from "framer-motion";
import "react-medium-image-zoom/dist/styles.css";

import Header from "../components/Header";
import { WhatDrivesMe } from "../components/about/DrivesMe";
import TLDR from "../components/tldr";
import AboutSection from "../components/about/AboutSec";
import EducationSection from "../components/about/Education";
import RecentActivity from "../components/about/RecentActivity";
import ImportantDocuments from "../components/about/ImportantDocuments";

function ScrollReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="w-full">
      <Header />
      <ScrollReveal><TLDR /></ScrollReveal>
      <ScrollReveal><ImportantDocuments /></ScrollReveal>
      <ScrollReveal><RecentActivity /></ScrollReveal>
      <ScrollReveal><AboutSection /></ScrollReveal>
      <ScrollReveal><EducationSection /></ScrollReveal>
      <ScrollReveal><WhatDrivesMe /></ScrollReveal>
    </div>
  );
}
