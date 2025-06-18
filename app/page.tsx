'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from './components/Header';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#181A1B] text-white">
      <Header />
      <section className="max-w-2xl mx-auto flex flex-col items-center mt-24 px-4">
        <h2 className="text-4xl font-extrabold mb-8 text-center">TL;DR</h2>
        <div className="text-lg w-full">
          <div className="mb-6">
            <span className="font-bold">Currently I am...</span><br />
            studying <a href="#" className="text-blue-400 hover:underline">physics at UIUC</a>, researching <a href="#" className="text-blue-400 hover:underline">AI/ML at UC Berkeley</a>, a 2x AI Engineer at <a href="#" className="text-blue-400 hover:underline">AIFARMS/NCSA</a> and <a href="#" className="text-blue-400 hover:underline">Brighttech AI</a>, building <a href="#" className="text-blue-400 hover:underline">AgAnswers.ai</a>, and <a href="#" className="text-blue-400 hover:underline">reading</a>
          </div>
          <div>
            <span className="font-bold">Not so currently, I am...</span><br />
            <a href="#" className="text-blue-400 hover:underline">playing hockey for UIUC d1, the founder of aaxiom.org</a>, and playing competitive chess (although I do currently play a lot of blitz)
          </div>
        </div>
      </section>
    </main>
  );
} 