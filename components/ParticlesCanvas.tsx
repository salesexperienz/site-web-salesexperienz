'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  speedX: number
  speedY: number
  isOrange: boolean
}

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      createParticles()
    }

    const createParticles = () => {
      particles = []
      const count = 55
      for (let i = 0; i < count; i++) {
        const isOrange = Math.random() < 0.125
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 1.5 + Math.random() * 1.5,
          opacity: 0.15 + Math.random() * 0.25,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          isOrange,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.speedX
        p.y += p.speedY
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.isOrange
          ? `rgba(232, 98, 26, ${p.opacity * 0.3})`
          : `rgba(255, 255, 255, ${p.opacity})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    const handleResize = () => resize()
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
