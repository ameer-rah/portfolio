import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ameer Rahman',
  description: 'Portfolio of Ameer Rahman, Computer Science & IT Student specializing in innovative technology solutions.',
  keywords: ['computer science', 'IT', 'portfolio', 'ameer rahman', 'technology', 'software development'],
  icons: {
    icon: '/profile.jpeg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
