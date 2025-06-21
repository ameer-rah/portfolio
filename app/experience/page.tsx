"use client";

import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSnowPreset } from "tsparticles-preset-snow";
import type { Engine } from "tsparticles-engine";
import Link from 'next/link';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/ameer-rah' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/ameer-rahman-a3bb232a0/' },
  { name: 'YouTube', href: 'https://www.youtube.com/@uhhhmeer' },
  { name: 'Spotify', href: 'https://open.spotify.com/user/realramannoodles?si=c0b48adfe8fd4389' },
];

const experiences = [
  {
    title: 'AI and Augmented Reality Intern',
    company: 'Jasfel Analytics',
    location: 'Newark, NJ',
    date: 'June 2025 - August 2025',
    image: '/jasfel-analytics.png',
    bullets: [
      'Developed and refined Python scripts to automate AI model training processes, resulting in a 30 percent reduction in model deployment time',
      'Use tools like NumPy, Pandas, and Scikit-learn to improve data processing workflows for AI model validation'
    ],
    tags: ['Python', 'AI', 'Pandas', 'YOLOv8'],
  },
  {
    title: 'Beats by Dre - Qualitative & Quantitative Insights Externship',
    company: 'Extern',
    location: 'Remote',
    date: 'June 2025 - August 2025',
    image: '/extern2.png',
    bullets: [
      'Performed sentiment analysis using Python and AI-driven tools to interpret authentic customer feedback and extract actionable insights',
      'Conducted qualitative and quantitative analysis of consumer conversations to uncover market trends and inform product development strategies'
    ],
    tags: ['Python', 'AI', 'Automation'],
  },
  {
    title: 'IT Help Desk Intern',
    company: 'Michael Motazedi C.P.A.',
    location: 'Jamaica, NY',
    date: 'February 2024 - Aug 2024',
    image: '/motazedi-cpa.png',
    bullets: [
      'Improved operation systems by 35 percent, minimized network issues, and provided technical and hardware assistance',
      'Protected sensitive client data by implementing backup systems, routine maintenance and troubleshooting, creating a smooth digital infrastructure and utilized Active Directory'
    ],
    tags: ['IT', 'Active Directory', 'Hardware'],
  },
  {
    title: 'Store Associate',
    company: 'TJ Maxx',
    location: 'Queens, NY',
    date: 'February 2024 – August 2024',
    image: '/TJ_Maxx_Logo.png',
    bullets: [
      'Provided excellent customer service as a front-end cashier, efficiently handling transactions and resolving guest inquiries',
      'Assisted in backroom operations, including inventory organization, stock replenishment, and ensuring merchandise was properly tagged and shelved'
    ],
    tags: ['Public Speaking', 'Time Management', 'Overseeing Employees'],
  },
  {
    title: 'IT Intern',
    company: 'CommonPoint Queens',
    location: 'Forest Hills, NY',
    date: 'July 2023 – December 2023',
    image: '/commonpoint.webp',
    bullets: [
      'Designed age-appropriate activities and interactive lessons to teach cybersecurity fundamentals in an engaging and accessible way',
      'Taught 30 students core digital safety topics, including recognizing phishing scams, avoiding unsafe websites, and protecting personal information online'
    ],
    tags: ['Cybersecurity', 'Education', 'Networking'],
  },
];

export default function ExperiencePage() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSnowPreset(engine);
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
          particles: { size: { value: 2, random: { enable: true, minimumValue: 1 } } }
        }}
      />
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-extrabold mb-6 text-center">Work Experience</h1>
        <div className="flex flex-col gap-10">
          {experiences.map((exp, idx) => (
            <div key={idx} className="group relative transition-all">
              <div className="absolute inset-0 z-[-1] rounded-2xl opacity-0 group-hover:opacity-100 group-hover:bg-gray-800/70 group-hover:backdrop-blur-lg group-hover:border group-hover:border-gray-700/60 group-hover:shadow-2xl group-hover:shadow-black/20 transition-all duration-300"></div>
              <div className="relative z-10 p-6 flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0 flex flex-col items-center md:items-start w-40 md:w-48">
                  <img
                    src={exp.image}
                    alt={exp.company}
                    className={`mb-2 shadow-md ${['TJ Maxx', 'CommonPoint Queens', 'Michael Motazedi C.P.A.', 'Extern'].includes(exp.company) ? 'h-12 max-w-[120px] object-contain' : 'w-16 h-16 rounded-full object-cover'}`}
                  />
                  <span className="text-xs text-gray-400 font-semibold mt-1">{exp.date}</span>
                  <span className="text-xs text-gray-400 font-medium mt-1">{exp.location}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white mb-1">{exp.title}</h2>
                  <div className="text-gray-300 font-semibold mb-1">{exp.company}</div>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {exp.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-gray-900 text-emerald-300 text-xs font-semibold">{tag}</span>
                    ))}
                  </div>
                  <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-2">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
