"use client"

import { motion } from "framer-motion"
import gsap from "gsap"
import { useEffect, useRef } from "react"

export default function AboutBox() {
  const boxRef = useRef(null)

  useEffect(() => {
    // Animated gradient background
    gsap.fromTo(
      boxRef.current,
      { backgroundPosition: "0% center" },
      {
        backgroundPosition: "200% center",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }
    )
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <motion.div
        ref={boxRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white rounded-2xl p-8 md:p-12 shadow-2xl"
      >
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
        >
          Empowering AI Literacy Across the Globe
        </motion.h2>

        {/* Main Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-gray-300 mb-6 leading-relaxed"
        >
          AIwerse is your trusted platform for artificial intelligence insights, education, and trends. Serving tech professionals, entrepreneurs, and AI enthusiasts across the US, UK, Canada, and Australia, we deliver expertly-curated content that demystifies complex AI tools and technologies. Whether you're a developer exploring new frameworks, a business owner evaluating AI solutions, or a student mastering machine learning concepts, AIwerse provides actionable intelligence to accelerate your AI journey.
        </motion.p>

        {/* Secondary Description - SEO Focused */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg text-gray-300 mb-8 leading-relaxed"
        >
          From detailed AI tool reviews and platform comparisons to step-by-step implementation guides and real-world business case studies, we help you understand, evaluate, and deploy AI effectively in your professional workflows. Stay ahead of AI trends with our latest news coverage, emerging technology updates, and practical strategies tailored for the modern digital economy.
        </motion.p>

        {/* Feature Highlights */}
      
      </motion.div>
    </section>
  )
}