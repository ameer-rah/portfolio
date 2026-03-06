export default function RecentActivity() {
  return (
    <section className="space-y-6 mb-12 pb-8 border-b border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
      <div className="flex items-center mb-6">
        <h2 className="text-3xl font-bold flex items-center">
          <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
            <span className="animate-pulse relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          </span>
          Recent Activity
        </h2>
      </div>

      
      <div className="flex flex-col items-center gap-8 mb-12">

        
        <div className="w-full max-w-2xl text-center">
          <h3 className="text-2xl font-bold mb-2">Building RUPlanner</h3>
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            <span className="px-3 py-1 rounded-full text-xs bg-[color-mix(in_oklch,var(--color-primary)_20%,transparent)] animate-pulse">
              In Development
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
              Rutgers University
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
              Next.js / PostgreSQL
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
              Degree Planning
            </span>
          </div>

          <p className="text-lg mb-4">
            I'm building RUPlanner, a full-stack degree planning tool for Rutgers students. It features
            a custom prerequisite validation engine, PostgreSQL-backed course management with Prisma ORM,
            secure Auth0 authentication, and rate-limiting via Upstash Redis. Students can dynamically
            build error-checked semester plans that respect complex prerequisite chains and degree requirements.
          </p>
        </div>
      </div>
    </section>
  );
}