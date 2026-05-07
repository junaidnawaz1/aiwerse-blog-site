'use client'

import React, { useRef, useState } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

const MagneticButton = ({
  children,
  strength = 0.4,
  radius = 80,
  variant = "primary",
  size = "lg",
  onClick,
  className,
}) => {
  const buttonRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const springConfig = { stiffness: 200, damping: 18, mass: 0.6 }

  const rawX = useSpring(0, springConfig)
  const rawY = useSpring(0, springConfig)

  const textX = useTransform(rawX, (v) => v * 0.4)
  const textY = useTransform(rawY, (v) => v * 0.4)

  const handleMouseMove = (e) => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) return

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distX = e.clientX - centerX
    const distY = e.clientY - centerY
    const dist = Math.sqrt(distX ** 2 + distY ** 2)

    if (dist < radius) {
      rawX.set(distX * strength)
      rawY.set(distY * strength)
      setIsHovered(true)
    } else {
      rawX.set(0)
      rawY.set(0)
      setIsHovered(false)
    }
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
    setIsHovered(false)
  }

  const variants = {
    primary: "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25",
    outline: "border-2 border-white/80 text-white hover:bg-white/10 backdrop-blur-sm",
    ghost: "text-white ",
    dark: "bg-gray-900 text-white shadow-lg",
  }

  const sizes = {
    sm: "h-8 px-4 text-xs rounded-full",
    md: "h-10 px-6 text-sm rounded-full",
    lg: "h-12 px-8 text-base rounded-full",
  }

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-flex", padding: radius * 0.25 }}
    >
      <motion.button
        type="button"
        onClick={onClick}
        style={{ x: rawX, y: rawY }}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "relative inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 overflow-hidden cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
      >
        <motion.span
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none absolute inset-0 rounded-full bg-white/20"
        />

        <motion.span
          style={{ x: textX, y: textY }}
          className="relative z-10 flex items-center gap-2"
        >
          {children}
        </motion.span>
      </motion.button>
    </div>
  )
}

export default MagneticButton