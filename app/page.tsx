"use client";

import React, { useCallback } from 'react';
import { Github, Linkedin, Youtube, Music, Target, Terminal } from 'lucide-react'
import GitHubCalendar from 'react-github-calendar'
import Particles from "react-tsparticles";
import { loadSnowPreset } from "tsparticles-preset-snow";
import type { Engine } from "tsparticles-engine";
import Link from "next/link";

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
]

export default function Page() {
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
          particles: {
            size: {
              value: 2,
              random: { enable: true, minimumValue: 1 }
            }
          }
        }}
      />
      <div className="max-w-4xl mx-auto">
        <section className="mt-12 bg-gradient-to-br from-gray-800/80 via-gray-900/50 to-gray-800/80 
          backdrop-blur-lg rounded-3xl p-8 border border-gray-700/60 shadow-2xl shadow-black/20">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-teal-400/80 to-emerald-600/80 
                flex items-center justify-center animate-[float_3s_ease-in-out_infinite]">
                <span className="text-4xl font-bold text-white">AR</span>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 
                blur-xl opacity-50"></div>
            </div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight">Ameer Rahman</h1>
            <h2 className="mt-2 text-xl text-gray-400">Queens, NYC</h2>
            <p className="mt-6 max-w-2xl text-lg text-gray-300">
              Whether I'm working on cybersecurity projects, studying data structures, or building tools to
              simplify daily tasks, I bring curiosity, discipline, and purpose to everything I do. I believe in
              learning by doing, and in using what I learn to uplift others, improve systems, and create
              technology that makes a difference
            </p>
          </div>
        </section>

        <div className="my-12">
          <hr className="h-1 w-full border-0 bg-emerald-700 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="group relative transition-all">
            <div className="absolute inset-0 z-0 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:bg-gray-800/70 
              group-hover:backdrop-blur-lg group-hover:border group-hover:border-gray-700/60 group-hover:shadow-2xl 
              group-hover:shadow-black/20 transition-all duration-300 pointer-events-none"></div>
            <div className="relative z-10 p-6">
              <div className="flex items-center space-x-4 mb-4">
                
                <h3 className="text-2xl font-bold">About Me</h3>
              </div>
              <p className="text-gray-400">
                I am a Computer Science and IT student with a passion for creating technology solutions that make a
                real difference. My approach combines theoretical knowledge with practical application, always
                focusing on building systems that are both efficient and user-friendly.
              </p>
              <p className="text-gray-400 mt-4">
                Currently pursuing my degree while working on various projects that span web development, software
                engineering, and emerging technologies. I enjoy tackling complex challenges and collaborating with
                others to build innovative solutions.
              </p>
            </div>
          </div>
          <div className="group relative transition-all">
            <div className="absolute inset-0 z-0 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:bg-gray-800/70 
              group-hover:backdrop-blur-lg group-hover:border group-hover:border-gray-700/60 group-hover:shadow-2xl 
            group-hover:shadow-black/20 transition-all duration-300 pointer-events-none"></div>
            <div className="relative z-10 p-6">
              <div className="flex items-center space-x-4 mb-4">
                
                <h3 className="text-2xl font-bold">Technical Philosophy</h3>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span>Clean, maintainable code that others can understand</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span>User-centered design that prioritizes experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span>Continuous learning and staying current with technology</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span>Collaborative development and knowledge sharing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span>Saving the internet one virus at a time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span>Defending the internet from the bad guys</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="w-full px-4">
          <div className="max-w-4xl mx-auto group relative transition-all">
            <div className="absolute inset-0 z-0 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:bg-gray-800/70 group-hover:backdrop-blur-lg group-hover:border 
            group-hover:border-gray-700/60 group-hover:shadow-2xl group-hover:shadow-black/20 transition-all duration-300 pointer-events-none"></div>
            <div className="relative z-10 p-6 flex flex-col">
              <h2 className="text-2xl font-extrabold mb-6 text-white">Education</h2>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Rutgers_Scarlet_Knights_logo.svg/496px-Rutgers_Scarlet_Knights_logo.svg.png" alt="Rutgers Logo" 
                className="w-24 h-24 object-contain rounded-lg" />
                <div className="flex-1">
                  <div className="text-white text-xl font-bold">Rutgers University - New Brunswick</div>
                  <div className="text-gray-400 text-lg font-medium mt-1">B.S. in Computer Science, Minor in Critical Intelligence Studies</div>
                  <div className="mt-4">
                    <div className="bg-emerald-700 rounded-full h-8 flex items-center">
                      <span className="text-white font-semibold text-base px-4">3.7 GPA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto my-12">
          <hr className="h-1 w-full border-0 bg-emerald-700 rounded-full" />
        </div>

        <div className="group relative transition-all mt-0">
          <div className="absolute inset-0 z-0 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:bg-gray-800/70 
            group-hover:backdrop-blur-lg group-hover:border group-hover:border-gray-700/60 group-hover:shadow-2xl 
            group-hover:shadow-black/20 transition-all duration-300 pointer-events-none"></div>
          <div className="relative z-0 p-2">
            <h2 className="text-2xl font-bold mb-4">GitHub Contributions</h2>
            <div className="flex justify-center">
              <GitHubCalendar
                username="ameer-rah"
                colorScheme="dark"
                blockSize={13}
                blockMargin={4}
                fontSize={16}
              />
            </div>
          </div>
        </div>
      </div>

      {/* What Drives Me Section */}


      
      <div className="w-full py-6 px-4">
        <div className="max-w-4xl mx-auto group relative transition-all">
          <div className="absolute inset-0 z-0 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:bg-gray-800/70 
            group-hover:backdrop-blur-lg group-hover:border group-hover:border-gray-700/60 group-hover:shadow-2xl 
          group-hover:shadow-black/20 transition-all duration-300 pointer-events-none"></div>
          <div className="relative z-0 p-4 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 w-full">
              <h2 className="text-2xl font-extrabold mb-4 text-white">What Drives Me</h2>
              <div className="flex items-center mb-4">
                <div className="w-1 h-8 bg-emerald-700 rounded-full mr-3"></div>
                <blockquote className="italic text-base text-gray-400">
                  "I had a purpose before everyone had an opinion" <span className="not-italic font-medium">- Jalen Hurts</span>
                </blockquote>
              </div>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                I've always been drawn to tech that solves real problems, whether it's securing a vulnerable system, building out backend tools, 
                or studying how to protect critical infrastructure. I bring a hands-on mindset to everything I do, from troubleshooting issues in 
                real time to diving deep into code and frameworks that power our digital world. My long-term goal is to work at the intersection of 
                cybersecurity, and ethical innovation. I'm actively building that future through academic projects, certifications like CompTIA Security+ 
                and Google Cybersecurity, and internship experience in IT and system support. I believe learning never stops and I'm committed to growing 
                into a professional who not only understands how systems work, but how to make them work better for everyone.
              </p>
            </div>
            <div className="flex-1 flex justify-center items-center w-full mt-4 md:mt-0">
              <img src="/profile.jpeg" alt="Placeholder childhood" className="w-96 h-90 object-cover rounded-xl border-2 border-gray-700 shadow-lg 
              bg-gray-900"/>
            </div>
          </div>
        </div>
      </div>
      {/* Technical Expertise Section */}
      <div className="max-w-4xl mx-auto group relative transition-all mb-16">
        <div className="absolute inset-0 z-0 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:bg-gray-800/70 group-hover:backdrop-blur-lg group-hover:border group-hover:border-gray-700/60 group-hover:shadow-2xl group-hover:shadow-black/20 transition-all duration-300 pointer-events-none"></div>
        <section className="relative z-10 p-8 rounded-2xl">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Core Skills */}
            <div className="flex-1">
              <h2 className="text-3xl font-extrabold mb-4 text-white">Technical Expertise</h2>
              <div className="mb-2">
                <div className="text-lg font-semibold text-gray-200 mb-1">Certifications</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-emerald-700 hover:text-black transition cursor-pointer">Coursera Google Cybersecurity</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-emerald-700 hover:text-black transition cursor-pointer">Coursera Google Data Analytics</span>
                  <span className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-emerald-700 hover:text-black transition cursor-pointer">CompTIA Security+</span>
                </div>
              </div>
              <div className="mb-2">
                <div className="text-lg font-semibold text-gray-200 mb-1">Software Development</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-emerald-700 hover:text-black transition cursor-pointer">Java</span>
                  <span className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-emerald-700 hover:text-black transition cursor-pointer">Python</span>
                  <span className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-emerald-700 hover:text-black transition cursor-pointer">JavaScript</span>
                  <span className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-emerald-700 hover:text-black transition cursor-pointer">React</span>
                  <span className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-emerald-700 hover:text-black transition cursor-pointer">Swift</span>
                  <span className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-emerald-700 hover:text-black transition cursor-pointer">HTML</span>
                  <span className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-emerald-700 hover:text-black transition cursor-pointer">CSS</span>
                  <span className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-emerald-700 hover:text-black transition cursor-pointer">TypeScript</span>
                  <span className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-emerald-700 hover:text-black transition cursor-pointer">C</span>

                </div>
              </div>
              {/* End of Core Skills left column */}
            </div>
            {/* Languages */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-4">Languages</h3>
              <div className="space-y-6">
                {/* Java */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-semibold">Java</span>
                    <span className="text-white font-semibold">85%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-gray-700 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-pink-200 via-pink-400 to-red-600" style={{ width: '85%' }}></div>
                  </div>
                </div>
                {/* Python */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-semibold">Python</span>
                    <span className="text-white font-semibold">70%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-gray-700 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-pink-200 via-pink-400 to-red-600" style={{ width: '70%' }}></div>
                  </div>
                </div>
                {/* JavaScript */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-semibold">JavaScript</span>
                    <span className="text-white font-semibold">65%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-gray-700 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-pink-200 via-pink-400 to-red-600" style={{ width: '65%' }}></div>
                  </div>
                </div>
                {/* React */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-semibold">React</span>
                    <span className="text-white font-semibold">60%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-gray-700 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-pink-200 via-pink-400 to-red-600" style={{ width: '60%' }}></div>
                  </div>
                </div>
                {/* C */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-semibold">C</span>
                    <span className="text-white font-semibold">35%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-gray-700 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-pink-200 via-pink-400 to-red-600" style={{ width: '35%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}