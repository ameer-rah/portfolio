import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Work = lazy(() => import("./pages/Work"));
const Expertise = lazy(() => import("./pages/Expertise"));
const ReadingList = lazy(() => import("./pages/ReadingList"));
const NavigationBar = lazy(() => import("./components/NavigationBar"));

export default function App() {
  useEffect(() => {
    localStorage.removeItem("color-theme");
    document.documentElement.classList.remove("force-light", "color-scheme-adaptive");
    document.documentElement.classList.add("force-dark");
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background font-sans prose-adaptive w-full overflow-x-hidden">
        <NavigationBar />
        <main className="w-full overflow-x-hidden">
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-40">
                <div className="w-6 h-6 border border-primary/40 border-t-primary rounded-full animate-spin" />
              </div>
            }
          >
            <Routes>
              <Route path="*" element={<Navigate to="/about" replace />} />
              <Route path="/" element={<Navigate to="/about" replace />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<Work />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/expertise" element={<Expertise />} />
              <Route path="/reading-list" element={<ReadingList />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}
