"use client"

import { motion } from "framer-motion"


export default function AboutPage() {
  const values = [
    {
      icon: "🎯",
      title: "Our Mission",
      description: "Empower millions of professionals with accessible, expert AI knowledge to transform their careers and businesses.",
    },
    {
      icon: "🚀",
      title: "Our Vision",
      description: "Make AI education the foundation for digital transformation across every industry and region globally.",
    },
    {
      icon: "💡",
      title: "Our Approach",
      description: "Deliver practical, actionable insights through in-depth tool reviews, step-by-step guides, and real-world case studies.",
    },
    {
      icon: "🌍",
      title: "Our Community",
      description: "Build a trusted network of tech professionals, entrepreneurs, and learners passionate about AI innovation.",
    },
  ]

  const team = [
    {
      name: "AI Tools Research",
      role: "In-depth platform analysis and reviews",
      icon: "⚙️",
    },
    {
      name: "Educational Guides",
      role: "Step-by-step tutorials from industry experts",
      icon: "📚",
    },
    {
      name: "Business Intelligence",
      role: "Real-world case studies and use cases",
      icon: "💼",
    },
    {
      name: "News & Trends",
      role: "Latest updates and breakthroughs in AI",
      icon: "📰",
    },
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About AIwerse
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your trusted source for artificial intelligence insights, education, and trends
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="prose prose-lg max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Democratizing AI Knowledge Globally
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            AIwerse was founded with a simple mission: to make artificial intelligence accessible, understandable, and actionable for professionals, entrepreneurs, and learners worldwide. In a rapidly evolving AI landscape, we recognized the need for a centralized platform that combines expert analysis, practical guides, and real-world insights.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Today, we serve thousands of tech professionals, business owners, and students across the US, UK, Canada, and Australia—helping them navigate the complexities of AI tools, implement cutting-edge solutions, and stay ahead of industry trends.
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          <h2 className="col-span-full text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Core Values
          </h2>
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-700 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* What We Offer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-blue-500 transition-colors"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600">{item.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Geographic Focus */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-12 mb-20"
        >
          <h2 className="text-3xl font-bold mb-6">Our Global Reach</h2>
          <p className="text-lg text-blue-100 mb-6 leading-relaxed">
            While our roots are in supporting tech professionals across the US, UK, Canada, and Australia, our content and insights are designed for the global AI community. We're committed to making cutting-edge AI knowledge accessible to everyone, regardless of their location or experience level.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["🇺🇸 USA", "🇬🇧 UK", "🇨🇦 Canada", "🇦🇺 Australia"].map((region, i) => (
              <div key={i} className="bg-white/20 rounded-lg p-4 text-center font-semibold">
                {region}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gray-50 rounded-xl p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Master AI?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Explore our comprehensive guides, tool reviews, and business insights today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/ai-tools"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Explore AI Tools
            </a>
            <a
              href="/ai/guides"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Browse Guides
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
