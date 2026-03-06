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
            label: "Resume",
            lastUpdated: "2025-10",
            group: "other",
        },
    ];
  return (
    <div className="mt-8 mb-8 pb-6 border-b border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
        <h3 className="text-lg font-semibold mb-4">Important Documents</h3>
        <div className="flex flex-wrap gap-3">
        {pdfFiles.map((pdf) => (
            <a
            key={pdf.name}
            href={`/assets/PDF/${pdf.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)] transition-colors"
            >
            {pdf.label}
            </a>
        ))}
        </div>
    </div>
  );
}