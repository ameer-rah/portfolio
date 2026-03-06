export default function EducationSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">Education</h2>

      <div
        id="education"
        className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-all hover:shadow-lg"
      >
        <div className="flex flex-col md:flex-row gap-6">
          
          <div className="md:w-1/4 flex flex-col items-center">
            <div className="w-32 h-32 rounded-lg overflow-hidden relative">
              <img
                src="/assets/About/rutgers-logo.svg"
                alt="Rutgers Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    const text = document.createElement("div");
                    text.className =
                      "absolute inset-0 flex items-center justify-center text-2xl font-bold text-primary";
                    text.textContent = "Rutgers";
                    parent.appendChild(text);
                  }
                }}
              />
            </div>
            <div className="mt-4">
              <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
                3.4 GPA
              </span>
            </div>
          </div>

          
          <div className="md:w-3/4">
            <h3 className="text-2xl font-bold text-primary/90">
              Rutgers University - New Brunswick
            </h3>
            <p className="text-lg font-semibold mt-1">
              Bachelor of Science, Computer Science
            </p>
            <p className="text-base mt-1 opacity-80">
              Minor in Critical Intelligence Studies
            </p>
            <p className="text-sm mt-2 opacity-75">
              Expected Graduation: May 2027
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14v9M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
                <div>
                  <p className="font-medium">Relevant Coursework</p>
                  <p className="text-sm opacity-75">
                    Computer Architecture, Data Structures, Software Methodology, Systems Programming
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div
        id="cuny"
        className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-all hover:shadow-lg"
      >
        <div className="flex flex-col md:flex-row gap-6">
          
          <div className="md:w-1/4 flex flex-col items-center">
            <div className="w-32 h-32 rounded-lg overflow-hidden relative">
              <img
                src="/assets/About/ccny logo.png"
                alt="CUNY City College Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="mt-4">
              <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
                4.0 GPA
              </span>
            </div>
          </div>

          
          <div className="md:w-3/4">
            <h3 className="text-2xl font-bold text-primary/90">
              CUNY City College of New York
            </h3>
            <p className="text-base mt-2 opacity-75">
              Fall 2023 - Transferred May 2024
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                <div>
                  <p className="font-medium">Academic Honors</p>
                  <p className="text-sm opacity-75">
                    Dean's List - Fall 2023 & Spring 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
