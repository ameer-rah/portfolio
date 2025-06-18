'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Linkedin, Mail, Youtube } from 'lucide-react'
import Link from 'next/link'

interface NavItem {
  name: string
  href: string
  current?: boolean
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about', current: true },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
]

const socialLinks = [
  { 
    name: 'GitHub', 
    href: 'https://github.com/yourusername', 
    icon: Github,
    color: 'hover:text-gray-800'
  },
  { 
    name: 'LinkedIn', 
    href: 'https://linkedin.com/in/yourusername', 
    icon: Linkedin,
    color: 'hover:text-teal-green-600'
  },
  { 
    name: 'Email', 
    href: 'mailto:hello@aidanandrews.info', 
    icon: Mail,
    color: 'hover:text-coral-500'
  },
  { 
    name: 'YouTube', 
    href: 'https://youtube.com/@yourusername', 
    icon: Youtube,
    color: 'hover:text-coral-600'
  },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20'
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="text-2xl font-bold text-gray-800 hover:text-teal-green-600 transition-colors"
              >
                Ameer Rahman
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Navigation Links */}
              <div className="flex items-center space-x-6">
                {navItems.map((item) => (
                  <motion.div key={item.name} className="relative">
                    <Link
                      href={item.href}
                      className={`text-gray-700 hover:text-teal-green-600 font-medium transition-colors relative py-2 ${
                        item.current ? 'text-teal-green-600' : ''
                      }`}
                    >
                      {item.name}
                      {item.current && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-green-600 rounded-full"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-3 pl-6 border-l border-gray-200">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 rounded-full bg-gray-100 text-gray-600 transition-all duration-300 ${social.color} hover:bg-gray-200 hover:shadow-md`}
                      title={social.name}
                    >
                      <IconComponent size={18} />
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-green-500"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-md border-t border-white/20"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
                {/* Navigation Links */}
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`block px-4 py-2 rounded-lg text-gray-700 hover:text-teal-green-600 hover:bg-teal-green-50 font-medium transition-all ${
                        item.current ? 'text-teal-green-600 bg-teal-green-50' : ''
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4 border-t border-gray-200"
                >
                  <p className="text-sm text-gray-500 mb-3 px-4">Connect with me</p>
                  <div className="flex justify-center space-x-4">
                    {socialLinks.map((social) => {
                      const IconComponent = social.icon
                      return (
                        <motion.a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-3 rounded-full bg-gray-100 text-gray-600 transition-all duration-300 ${social.color} hover:bg-gray-200`}
                          onClick={closeMenu}
                        >
                          <IconComponent size={20} />
                        </motion.a>
                      )
                    })}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Header