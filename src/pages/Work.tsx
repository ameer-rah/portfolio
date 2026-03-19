import { motion } from "framer-motion";
import WorkExperienceSection from "../components/about/WorkExperience";

export default function Work() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full"
    >
      <WorkExperienceSection />
    </motion.div>
  );
}
