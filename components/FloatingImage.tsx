'use client'
import { motion } from 'framer-motion'

interface FloatingImageProps {
  src: string
  alt: string
  className?: string
}

export default function FloatingImage({ src, alt, className }: FloatingImageProps) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={className ?? 'w-full block'}
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
    />
  )
}
