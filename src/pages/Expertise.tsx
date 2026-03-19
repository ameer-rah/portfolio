import { motion } from "framer-motion";
import TechnicalExpertiseSection from "../components/about/TechnicalExpertise";

export default function Expertise() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full"
    >
      <TechnicalExpertiseSection />
    </motion.div>
  );
}
