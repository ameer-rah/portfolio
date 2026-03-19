import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import FilterDropdown from "../components/FilterDropdown";

interface ReadingListItem {
  id: string;
  title: string;
  url: string;
  tags: string[];
  dateAdded: string;
}

export default function ReadingList() {
  const [papers, setPapers] = useState<ReadingListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tagFromUrl = searchParams.get("filter") || "";
    setSelectedTag(tagFromUrl);
  }, [searchParams]);

  useEffect(() => {
    const fetchReadingList = async () => {
      try {
        const res = await fetch("/data/reading_list.json");
        if (!res.ok) throw new Error("Failed to load reading list");
        const data: ReadingListItem[] = await res.json();
        const sortedPapers = data.sort((a, b) => {
          try {
            return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
          } catch {
            return 0;
          }
        });
        setPapers(sortedPapers);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching reading list:", err);
        setError("Failed to load reading list. Please try again later.");
        setLoading(false);
      }
    };
    fetchReadingList();
  }, []);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    papers.forEach((paper) => {
      if (paper.tags && Array.isArray(paper.tags)) {
        paper.tags.forEach((tag) => {
          if (tag && typeof tag === "string") tags.add(tag);
        });
      }
    });
    return Array.from(tags).sort();
  }, [papers]);

  const filteredPapers = useMemo(() => {
    return papers.filter((paper) =>
      !selectedTag || (paper.tags && Array.isArray(paper.tags) && paper.tags.includes(selectedTag))
    );
  }, [papers, selectedTag]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="w-5 h-5 border border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <p className="font-sans font-light text-red-400 text-[13px]">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full py-28 md:py-40 px-8 md:px-16 lg:px-24"
    >
      {/* Section number */}
      <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-primary font-light mb-10">
        Reading
      </p>

      {/* Heading + filter row */}
      <div className="flex items-end justify-between gap-6 mb-20">
        <h1
          className="font-display font-extralight text-adaptive leading-[0.88] tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 8vw, 10rem)" }}
        >
          Reading List
        </h1>
        <div className="mb-2 shrink-0 flex gap-3">
          {availableTags.length > 0 && (
            <FilterDropdown
              options={availableTags}
              selectedOption={selectedTag}
              onSelect={setSelectedTag}
              label="Tag"
              paramName="filter"
            />
          )}
        </div>
      </div>

      {filteredPapers.length === 0 ? (
        <div className="py-16 text-center space-y-4">
          <p className="font-sans font-light text-muted-adaptive text-[14px]">
            No entries found{selectedTag ? ` tagged "${selectedTag}"` : ""}.
          </p>
          {selectedTag && (
            <button
              onClick={() => setSelectedTag("")}
              className="font-sans text-[11px] tracking-[0.2em] uppercase text-primary border border-primary/30 px-4 py-2 hover:border-primary/60 transition-colors duration-300 cursor-pointer"
            >
              Clear filter
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-0">
          {filteredPapers.map((paper, index) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.04, duration: 0.5 }}
              className="group border-b border-primary/8 py-6 first:border-t first:border-t-primary/8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Date */}
                <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-muted-adaptive font-light shrink-0 sm:w-32 sm:pt-1">
                  {new Date(paper.dateAdded).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </span>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display font-light text-adaptive text-xl leading-tight hover:text-primary transition-colors duration-300 group/link inline-flex items-start gap-2"
                  >
                    {paper.title}
                    <svg className="w-3 h-3 mt-1.5 shrink-0 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>

                  {paper.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {paper.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-sans text-[10px] tracking-[0.1em] px-2 py-1 border border-primary/12 text-muted-adaptive"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
