import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-[#181A1B] pt-8 pb-4 px-4 border-b border-[#232527]">
      <div className="max-w-6xl mx-auto flex flex-row items-center justify-between">
        {/* Profile Section */}
        <div className="flex items-center space-x-6">
          <div className="rounded-xl overflow-hidden w-24 h-24 bg-gray-700">
            <Image
              src="/profile.jpg"
              alt="Aidan Andrews"
              width={96}
              height={96}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white leading-tight">Aidan Andrews</h1>
            <div className="text-gray-300 text-base mb-1">Entrepreneur, Researcher, Engineer</div>
            <div className="flex space-x-3 mt-1">
              <span className="text-xs bg-[#232527] text-blue-400 px-2 py-0.5 rounded-full">AI & Physics</span>
              <span className="text-xs bg-[#232527] text-blue-400 px-2 py-0.5 rounded-full">CS</span>
            </div>
          </div>
        </div>
        {/* Icons and Button */}
        <div className="flex items-center space-x-4">
          <Link href="#" aria-label="X"><svg className="w-6 h-6 text-gray-400 hover:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" /></svg></Link>
          <Link href="#" aria-label="GitHub"><svg className="w-6 h-6 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.49 2.87 8.3 6.84 9.64.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0112 6.84c.85.004 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.58.69.48A10.01 10.01 0 0022 12.26C22 6.58 17.52 2 12 2z" /></svg></Link>
          <Link href="#" aria-label="LinkedIn"><svg className="w-6 h-6 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" /></svg></Link>
          <Link href="#" aria-label="YouTube"><svg className="w-6 h-6 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 00-2.112-2.12C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.386.566a2.994 2.994 0 00-2.112 2.12C0 8.07 0 12 0 12s0 3.93.502 5.814a2.994 2.994 0 002.112 2.12C4.5 20.5 12 20.5 12 20.5s7.5 0 9.386-.566a2.994 2.994 0 002.112-2.12C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></Link>
          <Link href="#" className="bg-blue-900 text-blue-200 px-4 py-1.5 rounded-full font-semibold text-sm ml-2 hover:bg-blue-800 transition">AAXIOM →</Link>
        </div>
      </div>
      {/* Navigation Bar */}
      <nav className="w-full flex justify-center mt-8">
        <ul className="flex space-x-8 text-white text-lg font-medium">
          <li><Link href="#" className="border-b-2 border-white pb-1">About</Link></li>
          <li><Link href="#" className="hover:text-blue-400">Projects</Link></li>
          <li><Link href="#" className="hover:text-blue-400">Blog</Link></li>
          <li className="relative group">
            <button className="hover:text-blue-400 flex items-center">Publications <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></button>
            {/* Dropdown (hidden for now) */}
          </li>
        </ul>
      </nav>
    </header>
  );
} 