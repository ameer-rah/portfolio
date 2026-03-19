interface PdfFile {
  name: string;
  label: string;
  lastUpdated: string;
  group: "transcript" | "other";
}

export default function ImportantDocuments() {
  const pdfFiles: PdfFile[] = [
    {
      name: "CUNY_transcript.pdf",
      label: "CUNY Transcript",
      lastUpdated: "2025-10",
      group: "transcript",
    },
    {
      name: "Ameer Rahman Resume.pdf",
      label: "Résumé",
      lastUpdated: "2025-10",
      group: "other",
    },
  ];

  return (
    <section className="w-full py-20 md:py-28 px-8 md:px-16 lg:px-24 border-t border-[#111111]">
      <div className="flex flex-wrap gap-5">
        {pdfFiles.map((pdf) => (
          <a
            key={pdf.name}
            href={`/assets/PDF/${pdf.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 px-8 py-4 border border-primary/15 hover:border-primary/50 transition-colors duration-500"
          >
            {/* Download icon */}
            <svg
              className="w-3 h-3 text-primary/30 group-hover:text-primary transition-colors duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-muted-adaptive group-hover:text-adaptive transition-colors duration-300">
              {pdf.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
