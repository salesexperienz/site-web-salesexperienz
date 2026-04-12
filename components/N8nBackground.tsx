'use client'

interface N { id: string; x: number; y: number }

const nodes: N[] = [
  { id: 'a',  x: 85,   y: 80  },
  { id: 'b',  x: 255,  y: 48  },
  { id: 'c',  x: 435,  y: 130 },
  { id: 'd',  x: 613,  y: 38  },
  { id: 'e',  x: 603,  y: 168 },
  { id: 'f',  x: 793,  y: 90  },
  { id: 'g',  x: 973,  y: 118 },
  { id: 'h',  x: 1113, y: 218 },
  { id: 'i',  x: 85,   y: 452 },
  { id: 'j',  x: 255,  y: 370 },
  { id: 'k',  x: 445,  y: 434 },
  { id: 'l',  x: 665,  y: 380 },
  { id: 'm',  x: 885,  y: 437 },
  { id: 'n',  x: 1105, y: 377 },
]

const edges: [string, string][] = [
  ['a', 'b'],
  ['b', 'c'],
  ['c', 'd'],
  ['c', 'e'],
  ['d', 'f'],
  ['e', 'f'],
  ['f', 'g'],
  ['g', 'h'],
  ['i', 'j'],
  ['j', 'k'],
  ['k', 'l'],
  ['k', 'm'],
  ['l', 'm'],
  ['m', 'n'],
  ['h', 'n'],
]

function getNode(id: string) { return nodes.find(n => n.id === id)! }

function bezier(a: N, b: N) {
  const cx = (a.x + b.x) / 2
  return `M ${a.x} ${a.y} C ${cx} ${a.y}, ${cx} ${b.y}, ${b.x} ${b.y}`
}

export default function N8nBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        viewBox="0 0 1200 560"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-[0.12]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connection lines */}
        {edges.map(([a, b], i) => (
          <path
            key={`line-${i}`}
            d={bezier(getNode(a), getNode(b))}
            stroke="#4ABFB0"
            strokeWidth="1.5"
            fill="none"
          />
        ))}

        {/* Animated dots flowing along connections */}
        {edges.map(([a, b], i) => (
          <circle key={`dot-${i}`} r="3" fill="#4ABFB0">
            <animateMotion
              dur={`${7 + (i % 6) * 1.2}s`}
              begin={`${(i * 1.1) % 6}s`}
              repeatCount="indefinite"
              path={bezier(getNode(a), getNode(b))}
            />
          </circle>
        ))}

        {/* Junction dots */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r="5" fill="#4ABFB0" opacity="0.5" />
            <circle cx={node.x} cy={node.y} r="2.5" fill="#4ABFB0" />
          </g>
        ))}
      </svg>
    </div>
  )
}
