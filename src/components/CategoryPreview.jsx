"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { motion } from "framer-motion"

export default function CategoryPreview() {
  const containerRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    // Staggered entrance animation
    gsap.fromTo(
      itemsRef.current,
      { opacity: 0, y: 40, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "back.out(1.2)",
      }
    )

    // Hover animations for each item
    itemsRef.current.forEach((item, index) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          scale: 1.08,
          y: -8,
          rotationZ: 2,
          duration: 0.4,
          ease: "power2.out",
        })
      })

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          scale: 1,
          y: 0,
          rotationZ: 0,
          duration: 0.4,
          ease: "power2.out",
        })
      })
    })
  }, [])

  const categories = [
    { icon: "⚙️", name: "AI Tools", desc: "Latest tools" },
    { icon: "📚", name: "Guides", desc: "Step-by-step" },
    { icon: "⚖️", name: "Comparisons", desc: "Platform analysis" },
    { icon: "💼", name: "Business", desc: "Real use cases" },
    { icon: "📰", name: "AI News", desc: "Trending updates" },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Explore Our Content
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to master AI, from tools to trends
          </p>
        </motion.div>

        {/* Category Cards Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {categories.map((item, i) => (
            <div
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              className="group bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-shadow cursor-pointer border border-gray-100"
            >
              {/* Icon with 2D rotation */}
              <div className="text-4xl mb-3 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Category Name */}
              <p className="font-bold text-gray-900 text-lg mb-1">
                {item.name}
              </p>

              {/* Description */}
              <p className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.desc}
              </p>

              {/* Animated Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-xl transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}