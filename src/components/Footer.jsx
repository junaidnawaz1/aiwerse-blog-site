'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  FaTwitter, 
  FaLinkedin, 
  FaGithub, 
  FaEnvelope,
  FaPinterest,
  FaYoutube,
  FaInstagram,
  FaRobot,
  FaBook,
  FaChartLine,
  FaNewspaper,
  FaBuilding,
  FaDiscord,
  FaFacebook
} from 'react-icons/fa'

export default function Footer() {
  const quickLinks = [
    { name: 'AI Tools', href: '/ai-tools', icon: FaRobot },
    { name: 'AI Guides', href: '/ai/guides', icon: FaBook },
    { name: 'Comparisons', href: '/ai/comparisions', icon: FaChartLine },
    { name: 'AI News', href: '/ai/news', icon: FaNewspaper },
    { name: 'Business Use Cases', href: '/ai/business-use-cases', icon: FaBuilding },
  ]

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'Support', href: '/support' },
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ]

  const socialLinks = [
    { name: 'Pinterest', icon: FaPinterest, href: 'https://pinterest.com', color: 'hover:text-red-500' },
    { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com', color: 'hover:text-blue-600' },
    
    
    { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com', color: 'hover:text-pink-500' },
    
    { name: 'Facebook', icon: FaFacebook, href: 'https://facebook.com', color: 'hover:text-blue-500' },
   
    { name: 'Email', icon: FaEnvelope, href: 'mailto:contact@newsee.com', color: 'hover:text-red-400' },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                
                <Image
                  src="/logo3.png"
                  alt="AIwerse"
                  width={80}
                  height={80}
                  className="transition-all duration-300"
                />
              </motion.div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate destination for AI tools, guides, comparisons, business insights, and latest news.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <link.icon size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Section - Icons in Line */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              Follow Us
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Follow us on social media for daily AI updates, tips, and exclusive content.
            </p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 transform`}
                  aria-label={social.name}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar with Legal Links */}
        <div className="mt-12 pt-8 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              <span style={{ fontFamily: '"Anton", sans-serif' }} className="uppercase font-bold tracking-wider mr-1 text-white">
                AIwerse
              </span>
              &copy; {new Date().getFullYear()} All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Back to Top Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm flex items-center gap-1"
            >
              ↑ Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}