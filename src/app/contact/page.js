'use client'

import { useState } from 'react'
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate submission delay
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsLoading(false)
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "contact@AIwerse.com",
      link: "mailto:contact@AIwerse.com"
    },
    {
      icon: "💬",
      title: "Social Media",
      value: "Follow our channels",
      link: "#"
    },
    {
      icon: "🌐",
      title: "Website",
      value: "www.AIwerse.com",
      link: "https://www.AIwerse.com"
    },
  ]

   const socialLinks = [
      { name: 'Pinterest', icon: FaPinterest, href: 'https://pinterest.com', color: 'hover:text-red-500' },
      { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com', color: 'hover:text-blue-600' },
      
      
      { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com', color: 'hover:text-pink-500' },
      
      { name: 'Facebook', icon: FaFacebook, href: 'https://facebook.com', color: 'hover:text-blue-500' },
     
      { name: 'Email', icon: FaEnvelope, href: 'mailto:contact@AIwerse.com', color: 'hover:text-red-400' },
    ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions about AI tools, need content suggestions, or want to collaborate? We'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>

            {/* Contact Details */}
            <div className="space-y-8 mb-12">
              {contactInfo.map((info, i) => (
                <a
                  key={i}
                  href={info.link}
                  className="block group"
                >
                  <div className="text-3xl mb-3">{info.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-gray-600 group-hover:text-blue-600 transition-colors">
                    {info.value}
                  </p>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
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

            {/* Response Time */}
            <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-blue-600">📍 Average Response Time:</span>
                <br />
                We typically respond to all inquiries within 24-48 hours during business days.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
                >
                  ✅ Thank you for your message! We'll get back to you soon.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="What is this about?"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 text-black py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </motion.button>

                {/* Form Info */}
                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Your information will only be used to respond to your inquiry.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Can't find what you're looking for? Check our FAQ below.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: "How can I suggest a topic for AIwerse?",
                a: "We love hearing from our readers! Use this contact form and let us know what AI tools or topics you'd like us to cover."
              },
              {
                q: "Can I write for AIwerse?",
                a: "Absolutely! If you're interested in contributing, reach out to us with your portfolio and topic ideas."
              },
              {
                q: "Do you accept partnerships or sponsorships?",
                a: "Yes, we explore strategic partnerships. Contact us to discuss collaboration opportunities."
              },
              {
                q: "How often do you publish new content?",
                a: "We publish new guides, tool reviews, and news updates multiple times per week. Subscribe to stay updated!"
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white rounded-lg p-6 border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 mb-3">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
