import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PdfScrollPreview({ url }: { url: string }) {
  const [numPages, setNumPages] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(300);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(Math.floor(entry.contentRect.width));
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const duration = Math.max(numPages * 7, 18);

  return (
    <div ref={containerRef} className="overflow-hidden h-full w-full relative">
      <div
        className="pdf-scroll-inner"
        style={numPages > 0 ? { animationDuration: `${duration}s` } : { animation: "none" }}
      >
        <Document
          file={url}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<div className="h-52 bg-surface-raised animate-pulse" />}
          error={null}
        >
          {Array.from({ length: numPages }, (_, i) => (
            <Page
              key={i}
              pageNumber={i + 1}
              width={width || 300}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
          {numPages > 0 &&
            Array.from({ length: numPages }, (_, i) => (
              <Page
                key={`dup-${i}`}
                pageNumber={i + 1}
                width={width || 300}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            ))}
        </Document>
      </div>
    </div>
  );
}
