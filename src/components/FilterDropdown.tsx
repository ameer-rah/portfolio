import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";

interface FilterDropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  label: string;
  paramName?: string;
}

export default function FilterDropdown({
  options,
  selectedOption,
  onSelect,
  label,
  paramName,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelect = (option: string) => {
    onSelect(option);
    if (paramName) {
      const newSearchParams = new URLSearchParams(searchParams);
      if (option) {
        newSearchParams.set(paramName, option);
      } else {
        newSearchParams.delete(paramName);
      }
      setSearchParams(newSearchParams);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-3 px-4 py-2 border border-primary/20 hover:border-primary/50 transition-colors duration-300 bg-surface cursor-pointer"
      >
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-adaptive font-light">
          {label}
        </span>
        <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-primary font-light">
          {selectedOption || "All"}
        </span>
        <svg
          className={`w-3 h-3 text-muted-adaptive transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 z-50 w-48 mt-1 bg-surface border border-primary/15 shadow-2xl"
          >
            <ul className="py-1 max-h-[60vh] overflow-y-auto">
              <li>
                <button
                  onClick={() => handleSelect("")}
                  className={`w-full px-4 py-2.5 text-left font-sans text-[11px] tracking-[0.15em] uppercase transition-colors duration-200 cursor-pointer
                    ${!selectedOption
                      ? "text-primary bg-primary/5"
                      : "text-muted-adaptive hover:text-adaptive hover:bg-primary/5"
                    }`}
                >
                  All
                </button>
              </li>
              {options.map((option) => (
                <li key={option}>
                  <button
                    onClick={() => handleSelect(option)}
                    className={`cursor-pointer w-full px-4 py-2.5 text-left font-sans text-[11px] tracking-[0.15em] uppercase transition-colors duration-200
                      ${selectedOption === option
                        ? "text-primary bg-primary/5"
                        : "text-muted-adaptive hover:text-adaptive hover:bg-primary/5"
                      }`}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
