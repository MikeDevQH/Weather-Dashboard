"use client"

import { motion } from "framer-motion"

export default function Logo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.circle
        cx="20"
        cy="20"
        r="18"
        fill="url(#logoGrad)"
        opacity="0.15"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <motion.circle
        cx="20"
        cy="20"
        r="18"
        stroke="url(#logoGrad)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      {/* Sun */}
      <motion.circle
        cx="14"
        cy="14"
        r="6"
        fill="#fbbf24"
        filter="url(#glow)"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
      />

      {/* Cloud */}
      <motion.path
        d="M24 16C24 16 26 16 27.5 17.5C29 19 29 21 29 21C29 21 31 21 32 22.5C33.5 24 33 26 33 26C33 26 33 28 31.5 29.5C30 31 28 31 28 31H20C18 31 16 30 16 28C16 26 17.5 24.5 17.5 24.5C17.5 24.5 18 22 20 22C22 22 24 16 24 16Z"
        fill="white"
        opacity="0.95"
        initial={{ x: 10, opacity: 0 }}
        animate={{ x: 0, opacity: 0.95 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />

      {/* Rain drops */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        <motion.line
          x1="22"
          y1="33"
          x2="21"
          y2="36"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{ y1: [0, 2, 0], y2: [0, 2, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.line
          x1="26"
          y1="33"
          x2="25"
          y2="37"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{ y1: [0, 2, 0], y2: [0, 2, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.line
          x1="30"
          y1="33"
          x2="29"
          y2="36"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{ y1: [0, 2, 0], y2: [0, 2, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />
      </motion.g>
    </svg>
  )
}
