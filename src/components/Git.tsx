import React from 'react';
import WordFade from './WordFade';

interface GitHubChartProps {
  username?: string;
  color?: string;
  className?: string;
  alt?: string;
}

const GitHubChart: React.FC<GitHubChartProps> = ({
  username = "[your-github]",
  color = "1B7340",
  className = "github-chart",
  alt = `${username}'s GitHub contribution chart`
}) => {
  const baseUrl = 'https://ghchart.rshah.org';
  const chartUrl = color ? `${baseUrl}/${color}/${username}` : `${baseUrl}/${username}`;

  return (
    <div className="space-y-10">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-display font-light text-adaptive leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
          <WordFade text="GitHub Activity" />
        </h2>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-adaptive hover:text-primary transition-colors duration-300 inline-flex items-center gap-2 shrink-0 mb-1"
          title="GitHub"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          {username}
        </a>
      </div>

      <div
        className="border border-primary/10 p-6 cursor-pointer hover:border-primary/25 transition-colors duration-500"
        onClick={() => window.open(`https://github.com/${username}`, '_blank')}
      >
        <img
          src={chartUrl}
          alt={alt}
          className={`${className} w-full opacity-80 hover:opacity-100 transition-opacity duration-300`}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-muted-adaptive font-light">Less</span>
        <div className="flex gap-1.5">
          {["opacity-10", "opacity-25", "opacity-45", "opacity-65", "opacity-100"].map((op, i) => (
            <div key={i} className={`w-2.5 h-2.5 bg-primary ${op}`} />
          ))}
        </div>
        <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-muted-adaptive font-light">More</span>
      </div>
    </div>
  );
};

export default GitHubChart;
