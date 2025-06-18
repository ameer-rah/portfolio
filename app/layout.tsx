import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ameer Rahman - Software Engineer & Designer',
  description: 'Portfolio website of Ameer Rahman, a software engineer and designer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${inter.className} text-gray-900`}>{children}</body>
    </html>
  );
} 