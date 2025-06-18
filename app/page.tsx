'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Mail, 
  FileText, 
  Eye, 
  Target, 
  Building, 
  GraduationCap, 
  Wrench,
  Menu,
  X
} from 'lucide-react'

const skills = [
  'AutoCAD', 'Revit', 'SketchUp', 'Rhino', 'V-Ray', 'Photoshop',
  'InDesign', 'Illustrator', '3D Modeling', 'Rendering', 'BIM', 'Sustainability'
]

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 50])
  const y2 = useTransform(scrollY, [0, 300], [0, -50])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-green-700 via-royal-purple-600 to-coral-500">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-gray-800"
            >
              Aidan Andrews
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ scale: 1.1 }}
                  className={`text-gray-700 hover:text-teal-green-600 font-medium transition-colors relative ${
                    item === 'About' ? 'text-teal-green-600' : ''
                  }`}
                >
                  {item}
                  {item === 'About' && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-green-600"
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{ height: isMenuOpen ? 'auto' : 0 }}
            className="md:hidden overflow-hidden bg-white border-t"
          >
            <div className="py-4 space-y-4">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-4 text-gray-700 hover:text-indigo-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.nav>

      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 md:p-16 text-center mb-12"
          >
            <motion.div
              style={{ y: y1 }}
              className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl"
            />
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-teal-green-400 to-royal-purple-500 flex items-center justify-center text-6xl font-bold text-white shadow-2xl"
            >
              <motion.span
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                AA
              </motion.span>
            </motion.div>

            <motion.h1 
              {...fadeInUp}
              className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
            >
              Aidan Andrews
            </motion.h1>
            
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 mb-6"
            >
              Architectural Designer & Creative Professional
            </motion.p>
            
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed"
            >
              Passionate about creating innovative architectural solutions that blend functionality 
              with aesthetic excellence. I bring a unique perspective to design challenges, combining 
              technical expertise with creative vision to deliver exceptional results for every project.
            </motion.p>
          </motion.section>

          {/* Content Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          >
            {/* About Me Card */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-teal-green-500 to-royal-purple-600 rounded-xl text-white">
                  <Target size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">About Me</h2>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  I am an architectural designer with a passion for creating spaces that inspire 
                  and function beautifully. My approach combines traditional design principles 
                  with modern innovation, always keeping the end user's experience at the forefront 
                  of every decision.
                </p>
                <p>
                  With a background in architectural design from Iowa State University, I have 
                  developed a comprehensive understanding of both the technical and creative 
                  aspects of architecture. My work spans residential, commercial, and conceptual projects.
                </p>
              </div>
            </motion.div>

            {/* Design Philosophy Card */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-royal-purple-500 to-coral-600 rounded-xl text-white">
                  <Building size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Design Philosophy</h2>
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                I believe that great architecture should tell a story while serving its purpose 
                flawlessly. My design philosophy centers around core principles:
              </p>
              
              <ul className="space-y-2">
                {[
                  'Sustainable and environmentally conscious design',
                  'Human-centered spaces that enhance daily life',
                  'Innovation balanced with timeless design principles',
                  'Collaboration and open communication with clients',
                  'Attention to detail in every aspect of the design process'
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 text-gray-600"
                  >
                    <div className="w-2 h-2 bg-gradient-to-br from-teal-green-500 to-royal-purple-600 rounded-full mt-2 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Technical Skills Card */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-coral-500 to-teal-green-600 rounded-xl text-white">
                  <Wrench size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Technical Skills</h2>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Proficient in a wide range of design and technical tools:
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gradient-to-r from-teal-green-500 to-royal-purple-600 text-white px-3 py-2 rounded-full text-sm font-medium text-center cursor-pointer hover:shadow-lg transition-all duration-300"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education Card */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-teal-green-500 to-coral-600 rounded-xl text-white">
                  <GraduationCap size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Education & Experience</h2>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                  <h3 className="font-bold text-gray-800 text-lg">Iowa State University</h3>
                  <p className="text-teal-green-600 font-medium">Bachelor of Architecture</p>
                  <p className="text-gray-600 text-sm">Focus on sustainable design and urban planning</p>
                </div>
                
                <p className="text-gray-600 leading-relaxed">
                  My educational journey has provided me with a solid foundation in architectural 
                  theory, structural engineering principles, and sustainable design practices. 
                  I've worked on diverse projects ranging from residential developments to public spaces.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ y: y2 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-center shadow-2xl border border-white/20"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
              whileInView={{ scale: [0.9, 1.1, 1] }}
              transition={{ duration: 0.5 }}
            >
              Let's Work Together
            </motion.h2>
            
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              I'm always excited to take on new challenges and collaborate on innovative projects. 
              Whether you're looking for residential design, commercial architecture, or creative 
              consultation, I'd love to hear about your vision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {[
                { icon: Mail, text: 'Get In Touch', href: 'mailto:hello@aidanandrews.info', primary: true },
                { icon: Eye, text: 'View My Work', href: '/projects', primary: false },
                { icon: FileText, text: 'Download Resume', href: '/assets/PDF/resume.pdf', primary: false }
              ].map((button, index) => (
                <motion.a
                  key={button.text}
                  href={button.href}
                  target={button.text.includes('Resume') ? '_blank' : undefined}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                    button.primary
                      ? 'bg-gradient-to-r from-teal-green-500 to-royal-purple-600 text-white shadow-lg hover:shadow-xl'
                      : 'border-2 border-teal-green-500 text-teal-green-600 hover:bg-teal-green-50'
                  }`}
                >
                  <button.icon size={20} />
                  {button.text}
                </motion.a>
              ))}
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  )
}