"use client";

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Particles from "react-tsparticles";
import { loadSnowPreset } from "tsparticles-preset-snow";
import type { Engine } from "tsparticles-engine";
import Link from 'next/link';

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

const SpotifyIcon = (props: IconProps) => (
  <svg viewBox="0 0 168 168" width={props.size || 26} height={props.size || 26} {...props}>
    <circle cx="84" cy="84" r="84" fill="#1ED760"/>
    <path d="M120.1 115.5c-1.6 2.6-5.1 3.4-7.7 1.8-21-12.9-47.5-15.8-78.7-8.6-3 0.7-6-1.2-6.7-4.2-0.7-3 1.2-6 4.2-6.7 33.6-7.7 62.6-4.5 85.2 9.6 2.6 1.6 3.4 5.1 1.8 7.7zm10.9-21.9c-2 3.2-6.2 4.2-9.4 2.2-24-14.7-60.6-19-88.9-10.3-3.5 1-7.2-1-8.2-4.5-1-3.5 1-7.2 4.5-8.2 31.8-9.4 71.1-5.7 98.2 11.2 3.2 2 4.2 6.2 2.2 9.4zm0.9-23.2c-28.2-16.7-74.8-18.2-101.7-9.9-4 1.2-8.2-1-9.4-5-1.2-4 1-8.2 5-9.4 30.2-9.2 81.2-7.5 113.6 11.2 4 2.4 5.3 7.6 2.9 11.6-2.4 4-7.6 5.3-11.6 2.9z" fill="#fff"/>
  </svg>
);

const GitHubIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" width={props.size || 26} height={props.size || 26} {...props}>
    <circle cx="12" cy="12" r="12" fill="#181717"/>
    <path fill="#fff" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0112 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0022 12.26C22 6.58 17.52 2 12 2z"/>
  </svg>
);

const LinkedInIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" width={props.size || 26} height={props.size || 26} {...props}>
    <circle cx="12" cy="12" r="12" fill="#0077B5"/>
    <path fill="#fff" d="M17.1 17.1h-2.2v-3.1c0-.7 0-1.6-1-1.6s-1.1.8-1.1 1.6v3.1h-2.2V10h2.1v1h.1c.3-.6 1-1.2 2-1.2 2.1 0 2.5 1.4 2.5 3.2v4.1zM7.3 9c-.7 0-1.2-.6-1.2-1.2 0-.7.5-1.2 1.2-1.2.7 0 1.2.6 1.2 1.2 0 .7-.5 1.2-1.2 1.2zm1.1 8.1H6.2V10h2.2v7.1z"/>
  </svg>
);

const YouTubeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" width={props.size || 26} height={props.size || 26} {...props}>
    <circle cx="12" cy="12" r="12" fill="#FF0000"/>
    <polygon points="10,8.5 16,12 10,15.5" fill="#fff"/>
  </svg>
);

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/ameer-rah',
    icon: GitHubIcon,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ameer-rahman-a3bb232a0/',
    icon: LinkedInIcon,
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@uhhhmeer',
    icon: YouTubeIcon,
  },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/user/realramannoodles?si=c0b48adfe8fd4389',
    icon: SpotifyIcon,
  },
];

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  language?: string;
}

export default function ProjectsPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSnowPreset(engine);
  }, []);

  useEffect(() => {
    axios.get('https://api.github.com/users/ameer-rah/repos?per_page=100&sort=updated')
      .then(res => setRepos(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Particles
        id="tsparticles"
        className="fixed inset-0 z-0"
        init={particlesInit}
        options={{
          preset: "snow",
          background: { color: "#111111" },
          fullScreen: { enable: false },
          zIndex: 0,
          particles: {
            size: {
              value: 2,
              random: { enable: true, minimumValue: 1 }
            }
          }
        }}
      />
      
      <div className="max-w-4xl mx-auto px-4 mt-12 mb-4 flex flex-col md:flex-row items-center gap-8 group relative transition-all">
        <div className="absolute left-0 right-0 top-0 bottom-0 min-h-[260px] z-0 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:bg-gray-800/70 group-hover:backdrop-blur-lg group-hover:border group-hover:border-gray-700/60 group-hover:shadow-2xl group-hover:shadow-black/20 transition-all duration-300 pointer-events-none"></div>
        <div className="flex-1 flex justify-center items-center min-w-[220px] relative z-10">
          <img
            src="/govt_tracker.png"
            alt="GovStockTracker System Design"
            className="rounded-xl w-full h-auto max-w-[600px] object-contain min-h-[300px]"
          />
        </div>

        <div className="flex-1 w-full relative z-10">
          <h2 className="text-2xl font-extrabold mb-2 text-white flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded-full bg-blue-600 mr-2"></span>
            Recent Activity
          </h2>
          <h3 className="text-1xl font-bold mb-2 text-white">GovStockTracker (coming soon)</h3>
          <div className="flex gap-2 mb-3 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-emerald-900 text-emerald-300 text-xs font-semibold">Finance</span>
            <span className="px-3 py-1 rounded-full bg-blue-900 text-blue-300 text-xs font-semibold">Data Visualization</span>
            <span className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-xs font-semibold">ETL</span>
          </div>
          <p className="text-gray-400 mb-3 text-base leading-relaxed">
            A platform for tracking government stock trades, scraping and visualizing public data, and providing actionable insights. Built with a modular ETL pipeline, dashboard, and alerting system.
          </p>
          <div className="flex gap-4 mt-2">

            <a href="#" className="text-emerald-400 font-semibold flex items-center gap-1 opacity-50 cursor-not-allowed">GitHub</a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-0">
        <h1 className="text-4xl font-extrabold mb-8 text-center">Projects</h1>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-lg text-gray-400">Loading projects...</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {repos.map(repo => {
              
              let liveDemo = repo.homepage;
              if (repo.name === 'personal-website') {
                liveDemo = 'https://youtu.be/vFzVDjp4D7A?si=tkLdZHRcHt1lRbaK';
              } else if (repo.name === 'ai_object_detector') {
                liveDemo = 'https://youtu.be/v4HqIXaMtW8?si=s-WA2aG9VQ-QZXEd';
              }
              return (
                <div key={repo.id} className="group relative transition-all">
                  <div className="absolute inset-0 z-0 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:bg-gray-800/70 group-hover:backdrop-blur-lg group-hover:border group-hover:border-gray-700/60 group-hover:shadow-2xl group-hover:shadow-black/20 transition-all duration-300 pointer-events-none"></div>
                  <div className="relative z-10 p-6">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {repo.topics && repo.topics.slice(0, 4).map(topic => (
                        <span key={topic} className="px-3 py-1 rounded-full bg-gray-900 text-emerald-300 text-xs font-semibold mr-2 mb-1">{topic}</span>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold mb-1 text-white">{repo.name.replace(/[-_]/g, ' ')}</h2>
                    <p className="text-gray-400 mb-3 text-sm min-h-[48px]">{repo.description}</p>
                    <div className="flex items-center gap-4 text-gray-400 text-sm mb-2">
                      {repo.language && <span className="font-semibold text-emerald-400">{repo.language}</span>}
                      <span>★ {repo.stargazers_count}</span>
                      <span>🍴 {repo.forks_count}</span>
                    </div>
                    <div className="flex gap-4 mt-2">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-semibold flex items-center gap-1">GitHub</a>
                      {liveDemo && <a href={liveDemo} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-semibold flex items-center gap-1">Live Demo</a>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
} 