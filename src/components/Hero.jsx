'use client'

import Link from 'next/link'
import MagneticButton from './ui/MagneticButton'

export default function Hero() {
  return (
    <section className="w-screen relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* Smoky background effect */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/50 via-blue-300/20 to-white/50" />
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-2000" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-32 lg:py-40">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-4 mb-6 shadow-lg">
            <span className="text-blue-600 text-xl">✨</span>
            <span className="text-blue-700 font-semibold text-base sm:text-lg">
              AI Tools & Insights
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl sm:text-7xl py-4 md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">
              Welcome to
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-900 to-gray-300 bg-clip-text text-transparent">
              AIwerse
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl sm:text-lg md:text-xl py-4 text-gray-700 max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4">
            Your ultimate destination for AI tools, guides, comparisons, business insights, and latest news. Discover, learn, and stay ahead in the world of artificial intelligence with AIwerse.
          </p>

          {/* Buttons */}
      
        </div>
      </div>
    </section>
  )
}