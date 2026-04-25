'use client'
import { useEffect, useRef } from 'react'

function hexToRgba(hex: string, alpha: number): string {
  const num = parseInt(hex.slice(1), 16)
  const r = (num >> 16) & 0xff
  const g = (num >> 8) & 0xff
  const b = num & 0xff
  return `rgba(${r},${g},${b},${alpha})`
}

function shadeColor(hex: string, amount: number): string {
  const num = parseInt(hex.slice(1), 16)
  const r = Math.max(0, Math.min(255, (num >> 16) + amount))
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount))
  const b = Math.max(0, Math.min(255, (num & 0xff) + amount))
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')
}

const NODES = [
  { label: 'Prospection',    color: '#E8621A' },
  { label: 'Contenu',        color: '#4ABFB0' },
  { label: 'Visibilité',     color: '#4ABFB0' },
  { label: 'Pipeline',       color: '#0e1b3e' },
  { label: 'Relances',       color: '#E8621A' },
  { label: 'CRM',            color: '#0e1b3e' },
  { label: 'Reporting',      color: '#4ABFB0' },
  { label: 'LinkedIn',       color: '#E8621A' },
  { label: 'Qualification',  color: '#0e1b3e' },
  { label: 'Email',          color: '#4ABFB0' },
  { label: 'Automatisation', color: '#E8621A' },
  { label: 'SEO',            color: '#4ABFB0' },
  { label: 'Suivi client',   color: '#0e1b3e' },
  { label: 'Facturation',    color: '#E8621A' },
  { label: 'Onboarding',     color: '#0e1b3e' },
  { label: 'Veille',         color: '#4ABFB0' },
  { label: 'Lead scoring',   color: '#E8621A' },
  { label: 'Nurturing',      color: '#0e1b3e' },
]

const SPEED = 0.07
const NODE_RADIUS = 38

interface NodeState {
  x: number; y: number
  vx: number; vy: number
  pulse: number
  label: string; color: string
}

export default function SystemGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<NodeState[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0

    const resize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W * window.devicePixelRatio
      canvas.height = H * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      initNodes()
    }

    const initNodes = () => {
      nodesRef.current = NODES.map((n) => ({
        ...n,
        x: NODE_RADIUS + Math.random() * (W - NODE_RADIUS * 2),
        y: NODE_RADIUS + Math.random() * (H - NODE_RADIUS * 2),
        vx: (Math.random() - 0.5) * SPEED * 2,
        vy: (Math.random() - 0.5) * SPEED * 2,
        pulse: Math.random() * Math.PI * 2,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const nodes = nodesRef.current

      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        n.pulse += 0.025
        if (n.x < NODE_RADIUS || n.x > W - NODE_RADIUS) { n.vx *= -1; n.x = Math.max(NODE_RADIUS, Math.min(W - NODE_RADIUS, n.x)) }
        if (n.y < NODE_RADIUS || n.y > H - NODE_RADIUS) { n.vy *= -1; n.y = Math.max(NODE_RADIUS, Math.min(H - NODE_RADIUS, n.y)) }
      })

      // Draw all connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = Math.sqrt(W * W + H * H)
          const alpha = Math.max(0, (1 - dist / maxDist) * 0.18)

          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.strokeStyle = `rgba(14, 27, 62, ${alpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      // Draw nodes as 3D spheres
      nodes.forEach((n) => {
        const pulseFactor = 1 + Math.sin(n.pulse) * 0.03
        const r = NODE_RADIUS * pulseFactor

        ctx.save()

        // Drop shadow
        ctx.shadowColor = 'rgba(14,27,62,0.25)'
        ctx.shadowBlur = 18
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 6

        // Base transparente — verre neutre sans teinte
        const baseGrd = ctx.createRadialGradient(
          n.x - r * 0.3, n.y - r * 0.3, r * 0.1,
          n.x + r * 0.1, n.y + r * 0.1, r
        )
        baseGrd.addColorStop(0,   'rgba(255,255,255,0.12)')
        baseGrd.addColorStop(0.7, 'rgba(220,225,235,0.10)')
        baseGrd.addColorStop(1,   'rgba(180,190,210,0.30)')

        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = baseGrd
        ctx.fill()

        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0

        // Bordure fine translucide
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.strokeStyle = hexToRgba(n.color, 0.5)
        ctx.lineWidth = 1.2
        ctx.stroke()

        // Reflet spéculaire — halo blanc en haut à gauche
        const specGrd = ctx.createRadialGradient(
          n.x - r * 0.32, n.y - r * 0.38, 0,
          n.x - r * 0.1,  n.y - r * 0.1,  r * 0.75
        )
        specGrd.addColorStop(0,   'rgba(255,255,255,0.72)')
        specGrd.addColorStop(0.45,'rgba(255,255,255,0.15)')
        specGrd.addColorStop(1,   'rgba(255,255,255,0)')
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = specGrd
        ctx.fill()

        // Reflet secondaire en bas à droite — effet verre
        const spec2Grd = ctx.createRadialGradient(
          n.x + r * 0.35, n.y + r * 0.4, 0,
          n.x + r * 0.35, n.y + r * 0.4, r * 0.45
        )
        spec2Grd.addColorStop(0,  'rgba(255,255,255,0.22)')
        spec2Grd.addColorStop(1,  'rgba(255,255,255,0)')
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = spec2Grd
        ctx.fill()

        // Label — couleur pleine, lisible sur fond clair
        ctx.fillStyle = shadeColor(n.color, -20)
        ctx.font = `700 10px "Inter", system-ui, sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(n.label, n.x, n.y + 1)

        ctx.restore()
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    // Click handler — repulse clicked node
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      nodesRef.current.forEach((n) => {
        const dx = n.x - mx
        const dy = n.y - my
        if (Math.sqrt(dx * dx + dy * dy) < NODE_RADIUS + 8) {
          const angle = Math.atan2(dy, dx)
          const boost = 1.2 + Math.random() * 1
          n.vx = Math.cos(angle) * boost
          n.vy = Math.sin(angle) * boost
        }
      })
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('click', handleClick)
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <section className="bg-white pb-[60px] lg:pb-[80px]">
      <div className="max-w-container mx-auto px-6 lg:px-20">
        <canvas
          ref={canvasRef}
          className="w-full rounded-2xl cursor-pointer"
          style={{ height: '420px', background: '#f7f8fb' }}
        />
        <p className="font-body italic text-[15px] text-se-navy/60 text-center mt-5">
          Un système, c&apos;est l&apos;ensemble de ces briques qui s&apos;articulent — pas des outils isolés.
        </p>
      </div>
    </section>
  )
}
