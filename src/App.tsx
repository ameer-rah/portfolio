import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";

const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const ReadingList = lazy(() => import("./pages/ReadingList"));
const Header = lazy(() => import("./components/Header"));
const NavigationBar = lazy(() => import("./components/NavigationBar"));

export default function App() {
  const [, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    
    const storedTheme = localStorage.getItem("color-theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }

    
    applyTheme(storedTheme || "system");
  }, []);

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    if (newTheme === "system") {
      
      document.documentElement.classList.remove("force-light", "force-dark");
      localStorage.removeItem("color-theme");
    } else {
      
      document.documentElement.classList.remove("force-light", "force-dark");
      document.documentElement.classList.add(`force-${newTheme}`);
      localStorage.setItem("color-theme", newTheme);
    }
  };

  
  useEffect(() => {
    
    document.documentElement.classList.add("color-scheme-adaptive");

    
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    
    const handleColorSchemeChange = () => {
      if (darkModeMediaQuery.matches) {
        document.documentElement.setAttribute("data-color-scheme", "dark");
      } else {
        document.documentElement.setAttribute("data-color-scheme", "light");
      }
    };

    
    handleColorSchemeChange();

    
    darkModeMediaQuery.addEventListener("change", handleColorSchemeChange);

    
    return () => {
      darkModeMediaQuery.removeEventListener("change", handleColorSchemeChange);
      document.documentElement.classList.remove("color-scheme-adaptive");
    };
  }, []);

  return (
    <Router>
      
      
      <div className="min-h-screen bg-background text-foreground font-sans prose-adaptive w-full overflow-x-hidden">
        <Header />
        <NavigationBar />

        <main className="container mx-auto px-4 md:px-6 lg:px-10 py-8 max-w-7xl">
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            }
          >
            <Routes>
              <Route path="*" element={<Navigate to="/about" replace />} />
              <Route path="/" element={<Navigate to="/about" replace />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/reading-list" element={<ReadingList />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}
