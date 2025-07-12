"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const SpotifyIcon = (props: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg viewBox="0 0 168 168" width={props.size || 26} height={props.size || 26} {...props}>
    <circle cx="84" cy="84" r="84" fill="#1ED760"/>
    <path d="M120.1 115.5c-1.6 2.6-5.1 3.4-7.7 1.8-21-12.9-47.5-15.8-78.7-8.6-3 0.7-6-1.2-6.7-4.2-0.7-3 1.2-6 4.2-6.7 33.6-7.7 62.6-4.5 85.2 9.6 2.6 1.6 3.4 5.1 1.8 7.7zm10.9-21.9c-2 3.2-6.2 4.2-9.4 2.2-24-14.7-60.6-19-88.9-10.3-3.5 1-7.2-1-8.2-4.5-1-3.5 1-7.2 4.5-8.2 31.8-9.4 71.1-5.7 98.2 11.2 3.2 2 4.2 6.2 2.2 9.4zm0.9-23.2c-28.2-16.7-74.8-18.2-101.7-9.9-4 1.2-8.2-1-9.4-5-1.2-4 1-8.2 5-9.4 30.2-9.2 81.2-7.5 113.6 11.2 4 2.4 5.3 7.6 2.9 11.6-2.4 4-7.6 5.3-11.6 2.9z" fill="#fff"/>
  </svg>
);

const GitHubIcon = (props: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg viewBox="0 0 24 24" width={props.size || 26} height={props.size || 26} {...props}>
    <circle cx="12" cy="12" r="12" fill="#181717"/>
    <path fill="#fff" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0112 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0022 12.26C22 6.58 17.52 2 12 2z"/>
  </svg>
);

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg viewBox="0 0 24 24" width={props.size || 26} height={props.size || 26} {...props}>
    <circle cx="12" cy="12" r="12" fill="#0077B5"/>
    <path fill="#fff" d="M17.1 17.1h-2.2v-3.1c0-.7 0-1.6-1-1.6s-1.1.8-1.1 1.6v3.1h-2.2V10h2.1v1h.1c.3-.6 1-1.2 2-1.2 2.1 0 2.5 1.4 2.5 3.2v4.1zM7.3 9c-.7 0-1.2-.6-1.2-1.2 0-.7.5-1.2 1.2-1.2.7 0 1.2.6 1.2 1.2 0 .7-.5 1.2-1.2 1.2zm1.1 8.1H6.2V10h2.2v7.1z"/>
  </svg>
);

const YouTubeIcon = (props: React.SVGProps<SVGSVGElement> & { size?: number }) => (
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

function NavLinks() {
  const pathname = usePathname();
  const navLinks = [
    { href: '/', text: 'About' },
    { href: '/projects', text: 'Projects' },
    { href: '/experience', text: 'Experience' },
    { href: '/socials', text: 'Socials' },
  ];

  return (
    <>
      {navLinks.map(link => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.text}
            href={link.href}
            className={`font-semibold text-lg pb-1 border-b-2 transition-colors ${
              isActive
                ? 'text-emerald-400 border-emerald-400'
                : 'text-white border-transparent'
            } hover:text-emerald-400 hover:border-emerald-400`}
          >
            {link.text}
          </Link>
        );
      })}
      <a
        href="/ameer_resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white font-semibold text-lg pb-1 border-b-2 border-transparent hover:border-emerald-400 hover:text-emerald-400 transition-colors"
      >
        Resume
      </a>
    </>
  );
}

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <header className="relative z-30 bg-[#222] border-b border-gray-900">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4 md:p-6">
          <div className="flex items-center gap-5">
            <img src="/header_pic.jpeg" alt="Ameer Rahman" className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover shadow-lg"/>
            <div className="flex flex-col justify-center">
              <span className="text-xl md:text-2xl font-extrabold text-white leading-tight">Ameer Rahman</span>
              <span className="text-gray-300 text-base md:text-lg font-medium">Computer Science & IT Student</span>
              <div className="flex gap-2 mt-2">
                <span className="px-3 py-1 rounded-full bg-emerald-900 text-emerald-300 text-xs font-semibold">Cybersecurity</span>
                <span className="px-3 py-1 rounded-full bg-blue-900 text-blue-300 text-xs font-semibold">CS</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden sm:flex flex-wrap gap-2 md:gap-4">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-gray-300 hover:text-emerald-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  <link.icon size={24} />
                </a>
              ))}
            </div>
            <button
              className="sm:hidden flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              aria-label="Open navigation menu"
              onClick={() => setNavOpen(!navOpen)}
            >
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={navOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
        <div className="sm:hidden flex flex-wrap justify-center gap-3 pb-2">
          {socialLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-gray-300 hover:text-emerald-400 transition-colors" target="_blank" rel="noopener noreferrer">
              <link.icon size={24} />
            </a>
          ))}
        </div>
      </header>
      <nav className="relative z-30 bg-[#111111]">
        <div className="max-w-4xl mx-auto">
          <div className="hidden sm:flex justify-center items-center gap-8 py-4">
            <NavLinks />
          </div>
          {navOpen && (
            <div className="sm:hidden flex flex-col items-center gap-4 py-4 animate-fade-in bg-[#111111] border-t border-gray-800">
              <NavLinks />
            </div>
          )}
        </div>
      </nav>
    </>
  );
} 