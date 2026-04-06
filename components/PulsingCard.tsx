'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PulsingCardProps {
  children: ReactNode
  className?: string
}

const shadowNormal = '0 0 0 1px rgba(74,191,176,0.15), 0 32px 64px rgba(0,0,0,0.35)'
const shadowGlow   = '0 0 0 1px rgba(74,191,176,0.20), 0 32px 64px rgba(0,0,0,0.35), 0 0 40px rgba(232,98,26,0.18)'

export default function PulsingCard({ children, className }: PulsingCardProps) {
  return (
    <motion.div
      className={className}
      animate={{ boxShadow: [shadowNormal, shadowGlow, shadowNormal] }}
      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      style={{
        border: '1.5px solid rgba(232,98,26,0.35)',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      {children}
    </motion.div>
  )
}
