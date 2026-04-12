'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const IMAGES = [
  { src: '/Workflow articles.png',  alt: 'Workflow Articles SEO' },
  { src: '/Workflow Email.png',     alt: 'Workflow Email' },
  { src: '/Workflow SEO-GEO.png',   alt: 'Workflow SEO GEO' },
]

// Positions : [front, middle, back]
const POS = [
  { rotate:  5, x:  20, y: -10, scale: 1,    z: 30 },
  { rotate:  1, x:   4, y:   8, scale: 0.97, z: 20 },
  { rotate: -3, x: -14, y:  24, scale: 0.94, z: 10 },
]

export default function WorkflowStack() {
  // queue[0] = front card index, queue[1] = middle, queue[2] = back
  const [queue, setQueue] = useState([0, 1, 2])

  useEffect(() => {
    const t = setInterval(() => {
      setQueue(q => {
        const next = (q[q.length - 1] + 1) % IMAGES.length
        return [...q.slice(1), next]
      })
    }, 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative w-[500px] h-[340px] select-none">
      <AnimatePresence initial={false}>
        {queue.map((imgIdx, stackPos) => (
          <motion.div
            key={imgIdx}
            initial={{
              opacity: 0,
              rotate: POS[2].rotate - 5,
              x: POS[2].x - 40,
              y: POS[2].y + 40,
              scale: POS[2].scale - 0.06,
            }}
            animate={{
              opacity: 1,
              rotate: POS[stackPos].rotate,
              x: POS[stackPos].x,
              y: POS[stackPos].y,
              scale: POS[stackPos].scale,
            }}
            exit={{
              opacity: 0,
              scale: 0.82,
              y: -70,
              rotate: 18,
              transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
            }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ zIndex: POS[stackPos].z, position: 'absolute', inset: 0 }}
            className="rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.28)] border-2 border-white/70"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMAGES[imgIdx].src}
              alt={IMAGES[imgIdx].alt}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
