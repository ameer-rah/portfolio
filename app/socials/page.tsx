"use client";

import React from 'react';
import Link from 'next/link';
import { Instagram } from 'lucide-react';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16.6 5.82a4.47 4.47 0 0 1-3.3-1.4V11a5 5 0 1 1-5-5h2.32a3 3 0 0 0 0 6h-2.32a5 5 0 0 1-5-5V9a1 1 0 0 1 1-1h2.32a5 5 0 0 1 5 5V5.82a4.48 4.48 0 0 1 5.68-2.65A4.38 4.38 0 0 1 21 5.82Z" />
  </svg>
);

export default function SocialsPage() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 text-center">
                Beyond my academic and professional work, I share glimpses of my day-to-day life on social media. Connect with me to see what I'm currently working on or just to chat!
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="group relative transition-all bg-gray-900/50 p-6 rounded-2xl border border-gray-700/60 hover:bg-gray-800/70 hover:border-gray-600">
                     <div className="flex items-center gap-3 mb-4">
                        <Instagram className="w-6 h-6 text-white" />
                        <h2 className="text-2xl font-bold text-white">Instagram</h2>
                    </div>
                    
                    <div className="flex flex-col items-center text-center p-4">
                        <img src="/pfp1.jpeg" alt="Ameer Rahman" className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-pink-500" />
                        <h3 className="text-xl font-bold">Ameer Rahman</h3>
                        <p className="text-gray-400">@uhhhmeer</p>
                        <div className="flex gap-8 mt-4 text-center">
                            <div>
                                <p className="text-lg font-bold">5+</p>
                                <p className="text-sm text-gray-400">Posts</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">700+</p>
                                <p className="text-sm text-gray-400">Followers</p>
                            </div>
                        </div>
                    </div>
                    
                    <a href="https://www.instagram.com/uhhhhmeer/" target="_blank" rel="noopener noreferrer" className="block w-full mt-4 text-center px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold">
                        Follow on Instagram
                    </a>
                </div>

                <div className="group relative transition-all bg-gray-900/50 p-6 rounded-2xl border border-gray-700/60 hover:bg-gray-800/70 hover:border-gray-600">
                    <div className="flex items-center gap-3 mb-4">
                        <TikTokIcon className="w-6 h-6 text-white" />
                        <h2 className="text-2xl font-bold text-white">TikTok</h2>
                    </div>

                    <div className="flex flex-col items-center text-center p-4">
                        <img src="/pfp2.jpeg" alt="Ameer Rahman" className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-cyan-400" />
                        <h3 className="text-xl font-bold">Ameer Rahman</h3>
                        <p className="text-gray-400">@uhhhhmeer</p>
                        <div className="flex gap-8 mt-4">
                            <div>
                                <p className="text-lg font-bold">700+</p>
                                <p className="text-sm text-gray-400">Followers</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">70k+</p>
                                <p className="text-sm text-gray-400">Likes</p>
                            </div>
                        </div>
                    </div>
                    <a href="https://www.tiktok.com/@uhhhhmeer" target="_blank" rel="noopener noreferrer" className="block w-full mt-4 text-center px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold">
                        Follow on TikTok
                    </a>
                </div>
            </div>

            <p className="mt-12 text-center text-gray-400">
                Connect with me on social media for updates on my projects, research, and daily activities!
            </p>
        </div>
    );
} 