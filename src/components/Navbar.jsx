'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi'
import MagneticButton from './ui/MagneticButton'  

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isTop, setIsTop] = useState(true)
  const pathname = usePathname()

  const navLinks = [
    { name: 'AI tools', href: '/ai-tools' },
    { name: 'AI Guides', href: '/ai/guides' },
    { name: 'AI Comparisions', href: '/ai/comparisions' },
    { name: 'Buisness Usecase', href: '/ai/business-use-cases' },
    { name: 'AI News', href: '/ai/news' },
    { name: 'About', href: '/about' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)
      setIsTop(scrollPosition === 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navbarVariants = {
    top: {
      paddingTop: '0.5rem',    // Reduced from 1rem
      paddingBottom: '0.5rem',  // Reduced from 1rem
      backgroundColor: '#2779FF',  // Changed from 'black' to 'transparent'
      backdropFilter: 'blur(0px)',
      boxShadow: 'none',
      borderRadius: '0px',
      width: '100%',
      left: '0%',
      right: '0%',
    },
    scrolled: {
      paddingTop: '0.4rem',    // Even thinner when scrolled
      paddingBottom: '0.4rem',  // Even thinner when scrolled
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.2)',  // Reduced shadow
      borderRadius: '2rem',
      width: '90%',
      left: '5%',
      right: '5%',
    }
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  const linkVariants = {
    initial: { x: -20, opacity: 0 },
    animate: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.05, duration: 0.3 }
    })
  }

  return (
    <>
      <motion.nav
        initial="top"
        animate={scrolled ? "scrolled" : "top"}
        variants={navbarVariants}
        className="fixed top-0 z-50 transition-all duration-500"
        style={{
          marginTop: scrolled ? '0.75rem' : '0px',  // Reduced margin
        }}
      >
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${scrolled ? 'max-w-6xl' : 'max-w-7xl'}`}>
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <Link 
                href="/" 
                className="block group"
              >
                <span 
                  style={{ fontFamily: '"Syne", sans-serif' }} 
                  className={`text-xl md:text-2xl font-black tracking-wider uppercase bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent transition-all duration-300 group-hover:to-blue-300 ${scrolled ? 'md:text-xl' : ''}`}
                >
                  AIWerse
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={`
                      relative px-3 py-1.5 text-white font-medium transition-all duration-300
                      hover:text-blue-200 group text-sm
                      ${pathname === link.href ? 'text-blue-200' : ''}
                      ${scrolled ? 'py-1 text-xs' : ''}
                    `}
                  >
                    {link.name}
                    <span className={`
                      absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 
                      bg-gradient-to-r from-blue-300 to-blue-400 transition-all duration-300
                      group-hover:w-full
                      ${pathname === link.href ? 'w-full' : ''}
                    `} />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Contact Button - Desktop */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden md:block"
            >
              <MagneticButton 
                variant="outline" 
                size={scrolled ? "sm" : "md"}
                onClick={() => window.location.href = '/contact'}
              >
                Contact Us
                <FiArrowRight className="w-4 h-4" />
              </MagneticButton>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-1.5 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-md transition-colors relative z-50"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiX size={22} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiMenu size={22} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden"
              style={{
                marginTop: scrolled ? '0.75rem' : '0px',
                borderRadius: scrolled ? '1.5rem' : '0px',
                marginLeft: scrolled ? '0.5rem' : '0px',
                marginRight: scrolled ? '0.5rem' : '0px',
              }}
            >
              <div className="bg-gradient-to-br from-black/95 to-gray-900/95 backdrop-blur-xl border-t border-white/10">
                <div className="px-4 pt-4 pb-6 space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      custom={index}
                      variants={linkVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`
                          block px-4 py-2.5 text-sm font-medium text-white 
                          hover:bg-white/10 rounded-xl transition-all duration-300
                          ${pathname === link.href ? 'bg-white/20' : ''}
                        `}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Contact Button for Mobile */}
                  <motion.div
                    custom={navLinks.length}
                    variants={linkVariants}
                    initial="initial"
                    animate="animate"
                    className="pt-3 mt-3 border-t border-white/10"
                  >
                    <MagneticButton 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setIsOpen(false)
                        window.location.href = '/contact'
                      }}
                      className="w-full justify-center"
                    >
                      Contact Us
                      <FiArrowRight className="w-3.5 h-3.5" />
                    </MagneticButton>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding under navbar - Reduced height */}
      <div className={`transition-all duration-500 ${scrolled ? 'h-10' : 'h-12'}`} />
    </>
  )
}